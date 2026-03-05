"use client";

import { useState } from "react";
import ResultList from "@/components/ResultList";
import { trackEvent } from "@/lib/analytics";

type GeneratorFormProps = {
  toolTitle: string;
};

export default function GeneratorForm({ toolTitle }: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [envStatusText, setEnvStatusText] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setError(null);
    setDetail(null);
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
        const errorData = (await response.json()) as {
          error?: string;
          detail?: string;
          envStatus?: { geminiConfigured?: boolean; openaiConfigured?: boolean; deploymentSha?: string | null };
        };
        if (errorData.envStatus) {
          const status = `Deployment ${errorData.envStatus.deploymentSha || "unknown"} | geminiConfigured=${Boolean(errorData.envStatus.geminiConfigured)} | openaiConfigured=${Boolean(errorData.envStatus.openaiConfigured)}`;
          setEnvStatusText(status);
        }
        setDetail(errorData.detail || null);
        throw new Error(errorData.error || "Generation failed.");
      }

      const data = (await response.json()) as {
        results?: string[];
        source?: string;
        cacheHit?: boolean;
        envStatus?: { geminiConfigured?: boolean; openaiConfigured?: boolean; deploymentSha?: string | null };
      };
      const generatedResults = Array.isArray(data.results) ? data.results.slice(0, 5) : [];
      setResults(generatedResults);
      setSource(data.source || null);
      if (data.envStatus) {
        const status = `Deployment ${data.envStatus.deploymentSha || "unknown"} | geminiConfigured=${Boolean(data.envStatus.geminiConfigured)} | openaiConfigured=${Boolean(data.envStatus.openaiConfigured)} | cacheHit=${Boolean(data.cacheHit)}`;
        setEnvStatusText(status);
      } else {
        setEnvStatusText(null);
      }
      trackEvent("generate_click", {
        tool_name: toolTitle,
      });
      if (generatedResults.length > 0) {
        trackEvent("generation_success", {
          tool_name: toolTitle,
          result_count: generatedResults.length,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      setResults([]);
      setSource(null);
      trackEvent("generation_error", {
        tool_name: toolTitle,
      });
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
        {error && detail ? <p className="mt-1 text-xs text-red-500">{detail}</p> : null}
        {!error && source ? (
          <p className="mt-3 text-xs text-slate-500">Source: {source.toUpperCase()}</p>
        ) : null}
        {envStatusText ? <p className="mt-1 text-xs text-slate-500">{envStatusText}</p> : null}
      </div>

      <ResultList results={results} toolTitle={toolTitle} />
    </section>
  );
}
