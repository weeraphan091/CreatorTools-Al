"use client";

import { useState } from "react";
import ResultList from "@/components/ResultList";

type GeneratorFormProps = {
  toolTitle: string;
};

export default function GeneratorForm({ toolTitle }: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          tool: toolTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed.");
      }

      const data = (await response.json()) as { results?: string[] };
      setResults(Array.isArray(data.results) ? data.results.slice(0, 5) : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="card p-5">
        <label htmlFor="topic" className="mb-2 block text-sm font-medium text-slate-700">
          Topic or keyword
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          rows={4}
          placeholder="Example: productivity tips for students"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 placeholder:text-slate-400 focus:ring"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            "Generate 5 Results"
          )}
        </button>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>

      <ResultList results={results} />
    </section>
  );
}
