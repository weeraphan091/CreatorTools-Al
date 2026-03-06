"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import AdSlot from "@/components/AdSlot";
import ResultList from "@/components/ResultList";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

type GeneratorFormProps = {
  toolTitle: string;
  starterPrompts?: string[];
};

export default function GeneratorForm({ toolTitle, starterPrompts = [] }: GeneratorFormProps) {
  const showDebugPanel = process.env.NEXT_PUBLIC_ENABLE_DEBUG_PANEL === "true";
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();
  const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(pathname || "/tools")}`;
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const quickPrompts = useMemo(() => {
    if (starterPrompts.length > 0) {
      return starterPrompts.slice(0, 4);
    }
    return [
      `${toolTitle} for beginners`,
      `${toolTitle} with high conversion`,
      `${toolTitle} for social media`,
      `${toolTitle} examples`,
    ];
  }, [starterPrompts, toolTitle]);

  useEffect(() => {
    const queryTopic = searchParams.get("q");
    if (!queryTopic) {
      return;
    }
    const sanitized = queryTopic.replace(/\s+/g, " ").trim().slice(0, 280);
    if (sanitized) {
      setTopic(sanitized);
    }
  }, [searchParams]);

  const buildShareUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }
    const base = `${window.location.origin}${window.location.pathname}`;
    const query = topic.replace(/\s+/g, " ").trim();
    if (!query) {
      return base;
    }
    const params = new URLSearchParams({ q: query.slice(0, 140) });
    return `${base}?${params.toString()}`;
  };

  const shareText = `I used ${toolTitle} on ViralHookLab.com and got this idea: "${results[0] || "Great results"}"`;

  const handleCopyShareLink = async () => {
    const shareUrl = buildShareUrl();
    if (!shareUrl) {
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Share link copied.");
      trackEvent("share_click", { tool_name: toolTitle, channel: "copy_link" });
      setTimeout(() => setShareMessage(null), 1200);
    } catch {
      setShareMessage("Unable to copy link.");
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = buildShareUrl();
    if (!navigator.share || !shareUrl) {
      return;
    }
    try {
      await navigator.share({
        title: `${toolTitle} - ViralHookLab.com`,
        text: shareText,
        url: shareUrl,
      });
      trackEvent("share_click", { tool_name: toolTitle, channel: "native_share" });
    } catch {
      // Ignore if user dismisses share sheet.
    }
  };

  const handleGenerate = async () => {
    const normalizedTopic = topic.replace(/\s+/g, " ").trim();

    if (!normalizedTopic) {
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
        credentials: "same-origin",
        body: JSON.stringify({
          topic: normalizedTopic,
          tool: toolTitle,
          website: "",
          clientTs: Date.now(),
        }),
      });

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
        results?: string[];
        source?: string;
      };
      if (!response.ok) {
        setDetail(body.detail || null);
        if (response.status === 401) {
          setError("Please sign in to generate results. You get 3 free credits per day.");
          return;
        }
        if (response.status === 403 && typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("viralhooklab:out_of_credits"));
        }
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const waitHint = retryAfter ? ` Wait ${retryAfter} seconds.` : "";
          setError(`Too many requests. Please wait a moment and try again.${waitHint}`);
          return;
        }
        throw new Error(body.error || "Generation failed.");
      }

      const data = body;
      const generatedResults = Array.isArray(data.results) ? data.results.slice(0, 5) : [];
      setResults(generatedResults);
      setSource(data.source || null);

      const remainingHeader = response.headers.get("x-credits-remaining");
      const remaining = remainingHeader ? Number(remainingHeader) : NaN;
      if (Number.isFinite(remaining) && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("viralhooklab:credits_updated", { detail: { remaining } }));
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
      const message =
        err instanceof TypeError && err.message === "Failed to fetch"
          ? "Network error. Please check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
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
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick start prompts</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setTopic(prompt);
                trackEvent("starter_prompt_click", { tool_name: toolTitle });
              }}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {prompt}
            </button>
          ))}
        </div>

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

        <div className="mt-4">
          <AdSlot
            variant="inline"
            label={`${toolTitle} Generate CTA`}
            slotId={siteConfig.ads.toolGenerateCta}
          />
        </div>

        {isLoaded && !isSignedIn && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-medium">Sign in to generate results</p>
            <p className="mt-1 text-amber-800">Free accounts get 3 credits per day. Sign in or create an account to continue.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={signInUrl}
                className="inline-flex rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
              >
                Sign in
              </Link>
              <Link
                href={`/sign-up?redirect_url=${encodeURIComponent(pathname || "/tools")}`}
                className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || (isLoaded && !isSignedIn)}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : isLoaded && !isSignedIn ? (
            "Sign in to generate"
          ) : (
            "Generate 5 Results"
          )}
        </button>

        {error ? (
          <div className="mt-3">
            <p className="text-sm text-red-600">{error}</p>
            {error.includes("Sign in") && (
              <Link
                href={signInUrl}
                className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Sign in to generate →
              </Link>
            )}
          </div>
        ) : null}
        {showDebugPanel && error && detail ? <p className="mt-1 text-xs text-red-500">{detail}</p> : null}
        {showDebugPanel && !error && source ? (
          <p className="mt-3 text-xs text-slate-500">Source: {source.toUpperCase()}</p>
        ) : null}
      </div>

      <ResultList results={results} toolTitle={toolTitle} />

      {results.length > 0 ? (
        <div className="card p-5">
          <h3 className="text-base font-semibold text-slate-900">Share and get more traffic</h3>
          <p className="mt-1 text-sm text-slate-600">
            Share this tool with your audience to drive more usage and backlinks.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Copy share link
            </button>
            <button
              type="button"
              onClick={handleNativeShare}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Share
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(buildShareUrl())}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("share_click", { tool_name: toolTitle, channel: "x" })}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Share on X
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${buildShareUrl()}`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("share_click", { tool_name: toolTitle, channel: "whatsapp" })}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              WhatsApp
            </a>
          </div>
          {shareMessage ? <p className="mt-2 text-xs text-emerald-700">{shareMessage}</p> : null}
          <p className="mt-3 text-xs text-slate-500">
            Growth tip: post your best result in creator groups and link back to this tool page.
          </p>
          <Link href="/tools" className="mt-3 inline-flex text-xs font-semibold text-brand-700 hover:text-brand-600">
            Explore more free tools →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
