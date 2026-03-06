import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { buildCorsHeaders, getAllowedOriginForRequest } from "@/lib/security/cors";
import {
  containsSuspiciousInput,
  isValidTopicInput,
  sanitizeToolInput,
  sanitizeTopicInput,
} from "@/lib/security/input";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { getClientIp, hasValidJsonContentType, isBlockedBot } from "@/lib/security/request";
import { deductOneCredit } from "@/lib/credits";

type GenerateRequestBody = {
  topic?: string;
  tool?: string;
  website?: string;
  clientTs?: number;
};

type GeminiModelCache = {
  expiresAt: number;
  modelName: string;
};

type CachedResult = {
  expiresAt: number;
  results: string[];
  source: "gemini" | "openai" | "fallback";
};

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.API_GENERATE_RATE_LIMIT || "25");
const MAX_SKEW_MS = 15 * 60 * 1000;

const globalForApiStore = globalThis as unknown as {
  aiResultCache?: Map<string, CachedResult>;
  geminiModelCache?: GeminiModelCache;
};

const aiResultCache = globalForApiStore.aiResultCache ?? new Map<string, CachedResult>();
globalForApiStore.aiResultCache = aiResultCache;

function jsonWithCors(
  payload: Record<string, unknown>,
  status: number,
  origin: string | null,
  extraHeaders: Record<string, string> = {},
) {
  const response = NextResponse.json(payload, { status });
  const corsHeaders = buildCorsHeaders(origin);

  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  for (const [key, value] of Object.entries(extraHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

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

function isValidClientTimestamp(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return false;
  }
  const now = Date.now();
  const delta = Math.abs(now - value);
  return delta <= MAX_SKEW_MS;
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
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini list models failed (${response.status}): ${text.slice(0, 180)}`);
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
    throw new Error("No Gemini generateContent model available for this key.");
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
    throw new Error(`Gemini generate failed (${response.status}) with ${modelName}: ${text.slice(0, 180)}`);
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

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = getAllowedOriginForRequest(origin);

  if (origin && !allowedOrigin) {
    return jsonWithCors({ error: "Origin is not allowed." }, 403, origin);
  }

  const response = new NextResponse(null, { status: 204 });
  const corsHeaders = buildCorsHeaders(origin);
  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = getAllowedOriginForRequest(origin);

  if (process.env.NODE_ENV === "production" && !origin) {
    return jsonWithCors({ error: "Missing origin header." }, 403, origin);
  }
  if (origin && !allowedOrigin) {
    return jsonWithCors({ error: "Origin is not allowed." }, 403, origin);
  }

  if (!hasValidJsonContentType(request.headers.get("content-type"))) {
    return jsonWithCors({ error: "Invalid content type." }, 415, origin);
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (!userAgent || isBlockedBot(userAgent)) {
    return jsonWithCors({ error: "Suspicious automated traffic blocked." }, 403, origin);
  }

  try {
    const body = (await request.json()) as GenerateRequestBody;
    const rawTopic = String(body.topic || "");
    const rawTool = String(body.tool || "AI Generator");
    const honeypot = String(body.website || "").trim();

    if (honeypot) {
      return jsonWithCors({ error: "Spam request blocked." }, 400, origin);
    }
    if (!isValidClientTimestamp(body.clientTs)) {
      return jsonWithCors({ error: "Invalid request timestamp." }, 400, origin);
    }

    const topic = sanitizeTopicInput(rawTopic);
    const tool = sanitizeToolInput(rawTool);

    if (!isValidTopicInput(topic)) {
      return jsonWithCors({ error: "Topic must be 3-280 characters." }, 400, origin);
    }
    if (containsSuspiciousInput(topic) || containsSuspiciousInput(tool)) {
      return jsonWithCors({ error: "Suspicious input blocked." }, 400, origin);
    }

    const clientIp = getClientIp(request);
    const rate = checkRateLimit({
      key: `api:generate:${clientIp}`,
      limit: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
    });

    if (!rate.allowed) {
      const retrySeconds = Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000));
      return jsonWithCors(
        { error: "Rate limit exceeded. Please wait and try again." },
        429,
        origin,
        { "Retry-After": String(retrySeconds) },
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return jsonWithCors({ error: "Unauthorized. Please sign in." }, 401, origin);
    }

    const creditDeduction = await deductOneCredit(userId);
    if (!creditDeduction.ok) {
      return jsonWithCors(
        { error: "Out of credits." },
        403,
        origin,
        { "X-Credits-Remaining": String(creditDeduction.total_credits ?? 0) },
      );
    }

    const creditsHeader = { "X-Credits-Remaining": String(creditDeduction.total_credits ?? 0) };

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const cacheKey = `${tool.toLowerCase()}::${topic.toLowerCase()}`;
    const cached = aiResultCache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      if (cached.source === "fallback" && (geminiKey || openAiKey)) {
        aiResultCache.delete(cacheKey);
      } else {
        return jsonWithCors(
          {
            results: cached.results,
            source: cached.source,
            cacheHit: true,
            creditsRemaining: creditDeduction.total_credits ?? 0,
          },
          200,
          origin,
          creditsHeader,
        );
      }
    }

    let results: string[] = [];
    let source: "gemini" | "openai" | "fallback" = "fallback";

    if (!geminiKey && !openAiKey) {
      results = fallbackResults(topic);
      aiResultCache.set(cacheKey, {
        results,
        source: "fallback",
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return jsonWithCors(
        { results, source, cacheHit: false, creditsRemaining: creditDeduction.total_credits ?? 0 },
        200,
        origin,
        creditsHeader,
      );
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
            process.env.NODE_ENV === "production"
              ? undefined
              : geminiError instanceof Error
                ? geminiError.message.slice(0, 220)
                : "Unknown Gemini error";
          return jsonWithCors(
            {
              error:
                "Gemini API call failed. Please verify GEMINI_API_KEY/GOOGLE_API_KEY, quota, and API restrictions.",
              ...(detail ? { detail } : {}),
            },
            502,
            origin,
          );
        }
      }
    } else if (openAiKey) {
      output = await generateWithOpenAI(input, openAiKey);
      source = "openai";
    }

    results = output ? parseToFiveResults(output, topic) : fallbackResults(topic);
    if (!output) {
      source = "fallback";
    }

    aiResultCache.set(cacheKey, {
      results,
      source,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return jsonWithCors(
      {
        results: [results[0], results[1], results[2], results[3], results[4]],
        source,
        cacheHit: false,
        creditsRemaining: creditDeduction.total_credits ?? 0,
      },
      200,
      origin,
      creditsHeader,
    );
  } catch (error) {
    const detail =
      process.env.NODE_ENV === "production"
        ? undefined
        : error instanceof Error
          ? error.message.slice(0, 220)
          : "Unknown server error";

    return jsonWithCors(
      { error: "Unable to generate results.", ...(detail ? { detail } : {}) },
      500,
      origin,
    );
  }
}
