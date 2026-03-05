import { NextResponse } from "next/server";
import OpenAI from "openai";

type GenerateRequestBody = {
  topic?: string;
  tool?: string;
};

type EnvStatus = {
  geminiConfigured: boolean;
  openaiConfigured: boolean;
  deploymentSha: string | null;
};

type GeminiModelCache = {
  expiresAt: number;
  modelName: string;
};

function sanitizeLine(line: string) {
  return line
    .replace(/^[-*\d.)\s]+/, "")
    .replace(/^"|"$/g, "")
    .trim();
}

function fallbackResults(topic: string) {
  return [
    `${topic}: The simple strategy top creators use`,
    `How to grow faster with ${topic}`,
    `${topic} mistakes to avoid this week`,
    `A better ${topic} framework for conversions`,
    `${topic} ideas you can post today`,
  ];
}

type CachedResult = {
  expiresAt: number;
  results: string[];
  source: "gemini" | "openai" | "fallback";
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 25;
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

const globalForApiStore = globalThis as unknown as {
  aiResultCache?: Map<string, CachedResult>;
  aiRateLimit?: Map<string, RateLimitEntry>;
  geminiModelCache?: GeminiModelCache;
};

const aiResultCache = globalForApiStore.aiResultCache ?? new Map<string, CachedResult>();
const aiRateLimit = globalForApiStore.aiRateLimit ?? new Map<string, RateLimitEntry>();

globalForApiStore.aiResultCache = aiResultCache;
globalForApiStore.aiRateLimit = aiRateLimit;

function parseToFiveResults(rawText: string, topic: string) {
  const lines = rawText
    .split("\n")
    .map((line) => sanitizeLine(line))
    .filter(Boolean);

  const unique = Array.from(new Set(lines));

  if (unique.length >= 5) {
    return unique.slice(0, 5);
  }

  return [...unique, ...fallbackResults(topic)].slice(0, 5);
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "anonymous";
  }
  return request.headers.get("x-real-ip") || "anonymous";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = aiRateLimit.get(ip);

  if (!current || current.resetAt < now) {
    aiRateLimit.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  aiRateLimit.set(ip, {
    ...current,
    count: current.count + 1,
  });
  return false;
}

async function getGeminiModelName(apiKey: string) {
  const now = Date.now();
  const cached = globalForApiStore.geminiModelCache;

  if (cached && cached.expiresAt > now) {
    return cached.modelName;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini list models failed (${response.status}): ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    models?: Array<{
      name?: string;
      supportedGenerationMethods?: string[];
    }>;
  };

  const available = (data.models || []).filter((model) =>
    model.supportedGenerationMethods?.includes("generateContent"),
  );

  const preferred = [
    "models/gemini-2.5-flash",
    "models/gemini-2.5-flash-lite",
    "models/gemini-2.0-flash",
    "models/gemini-1.5-flash-latest",
    "models/gemini-1.5-flash-8b-latest",
    "models/gemini-1.5-pro-latest",
  ];

  const selected =
    preferred.find((name) => available.some((model) => model.name === name)) ||
    available[0]?.name;

  if (!selected) {
    throw new Error("No Gemini generateContent model available for this API key.");
  }

  globalForApiStore.geminiModelCache = {
    modelName: selected,
    expiresAt: now + 60 * 60 * 1000,
  };

  return selected;
}

async function generateWithGemini(prompt: string, apiKey: string) {
  const modelName = await getGeminiModelName(apiKey);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini generate failed (${response.status}) with ${modelName}: ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  const output = (data.candidates || [])
    .flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .join("\n")
    .trim();

  if (!output) {
    throw new Error(`Gemini returned empty output from ${modelName}.`);
  }

  return output;
}

async function generateWithOpenAI(prompt: string, apiKey: string) {
  const openai = new OpenAI({ apiKey });
  const completion = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
    temperature: 0.9,
  });
  return completion.output_text || "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const topic = String(body.topic || "").trim();
    const tool = String(body.tool || "AI Generator").trim();
    const clientIp = getClientIp(request);

    if (!topic) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a few minutes and try again." },
        { status: 429 },
      );
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const envStatus: EnvStatus = {
      geminiConfigured: Boolean(geminiKey),
      openaiConfigured: Boolean(openAiKey),
      deploymentSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null,
    };

    const cacheKey = `${tool.toLowerCase()}::${topic.toLowerCase()}`;
    const cached = aiResultCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      // If keys are now configured, skip stale fallback cache and regenerate real AI output.
      if (cached.source === "fallback" && (geminiKey || openAiKey)) {
        aiResultCache.delete(cacheKey);
      } else {
        return NextResponse.json({
          results: cached.results,
          source: cached.source,
          cacheHit: true,
          envStatus,
        });
      }
    }

    let results: string[] = [];
    let source: "gemini" | "openai" | "fallback" = "fallback";

    if (!geminiKey && !openAiKey) {
      results = fallbackResults(topic);
      source = "fallback";
      aiResultCache.set(cacheKey, {
        results,
        source,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return NextResponse.json({ results, source, cacheHit: false, envStatus });
    }

    const prompt = `You are an expert social media marketer. Generate 5 high converting results based on this topic: ${topic}`;
    const input = `${prompt}\nTool context: ${tool}\nReturn exactly 5 concise lines.`;

    let output = "";

    if (geminiKey) {
      try {
        output = await generateWithGemini(input, geminiKey);
        source = "gemini";
      } catch (geminiError) {
        if (openAiKey) {
          output = await generateWithOpenAI(input, openAiKey);
          source = "openai";
        } else {
          const detail =
            geminiError instanceof Error
              ? geminiError.message.slice(0, 220)
              : "Unknown Gemini SDK error";
          return NextResponse.json(
            {
              error:
                "Gemini API call failed. Please verify GEMINI_API_KEY/GOOGLE_API_KEY, quota, and API restrictions.",
              detail,
              envStatus,
            },
            { status: 502 },
          );
        }
      }
    } else if (openAiKey) {
      output = await generateWithOpenAI(input, openAiKey);
      source = "openai";
    }

    if (!output) {
      results = fallbackResults(topic);
      source = "fallback";
    } else {
      results = parseToFiveResults(output, topic);
    }

    aiResultCache.set(cacheKey, {
      results,
      source,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json({
      results: [results[0], results[1], results[2], results[3], results[4]],
      source,
      cacheHit: false,
      envStatus,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message.slice(0, 220) : "Unknown server error";
    return NextResponse.json({ error: "Unable to generate results.", detail }, { status: 500 });
  }
}
