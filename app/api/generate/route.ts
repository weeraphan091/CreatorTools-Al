import { NextResponse } from "next/server";
import OpenAI from "openai";

type GenerateRequestBody = {
  topic?: string;
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const topic = String(body.topic || "").trim();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ results: fallbackResults(topic) });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are an expert social media marketer. Generate 5 high converting results based on this topic: ${topic}`;

    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.9,
    });

    const output = completion.output_text || "";
    const results = parseToFiveResults(output, topic);

    return NextResponse.json({
      results: [results[0], results[1], results[2], results[3], results[4]],
    });
  } catch {
    return NextResponse.json({ error: "Unable to generate results." }, { status: 500 });
  }
}
