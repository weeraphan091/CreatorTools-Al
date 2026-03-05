import { NextResponse } from "next/server";
import OpenAI from "openai";

type GenerateRequestBody = {
  topic?: string;
  tool?: string;
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

    const cacheKey = `${tool.toLowerCase()}::${topic.toLowerCase()}`;
    const cached = aiResultCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json({ results: cached.results });
    }

    let results: string[] = [];
    if (!process.env.OPENAI_API_KEY) {
      results = fallbackResults(topic);
      aiResultCache.set(cacheKey, {
        results,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return NextResponse.json({ results });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are an expert social media marketer. Generate 5 high converting results based on this topic: ${topic}`;
    const input = `${prompt}\nTool context: ${tool}\nReturn exactly 5 concise lines.`;

    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input,
      temperature: 0.9,
    });

    const output = completion.output_text || "";
    results = parseToFiveResults(output, topic);
    aiResultCache.set(cacheKey, {
      results,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return NextResponse.json({
      results: [results[0], results[1], results[2], results[3], results[4]],
    });
  } catch {
    return NextResponse.json({ error: "Unable to generate results." }, { status: 500 });
  }
}
