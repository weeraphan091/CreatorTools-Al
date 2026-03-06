"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ResultListProps = {
  results: string[];
  toolTitle?: string;
};

type CopyVariant = "plain" | "social_post" | "with_cta" | "with_hashtags";

type SavedResult = {
  toolTitle: string;
  text: string;
  createdAt: number;
};

const STORAGE_KEY = "vh_saved_results_v1";

function safeReadSavedResults(): SavedResult[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is SavedResult => {
        if (!item || typeof item !== "object") return false;
        const record = item as Record<string, unknown>;
        return (
          typeof record.toolTitle === "string" &&
          typeof record.text === "string" &&
          typeof record.createdAt === "number"
        );
      })
      .slice(0, 200);
  } catch {
    return [];
  }
}

function safeWriteSavedResults(items: SavedResult[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 200)));
  } catch {
    // ignore
  }
}

function buildCopyText(text: string, variant: CopyVariant) {
  const trimmed = text.trim();
  if (variant === "plain") return trimmed;
  if (variant === "social_post") return `${trimmed}\n\n— Generated with ViralHookLab.com`;
  if (variant === "with_cta") return `${trimmed}\n\nTry it free at ViralHookLab.com`;
  return `${trimmed}\n\n#contentmarketing #creator #growth`;
}

export default function ResultList({ results, toolTitle = "unknown-tool" }: ResultListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedIndex, setSavedIndex] = useState<number | null>(null);
  const [copyVariant, setCopyVariant] = useState<CopyVariant>("plain");

  const copyLabel = useMemo(() => {
    if (copyVariant === "social_post") return "Copy as post";
    if (copyVariant === "with_cta") return "Copy + CTA";
    if (copyVariant === "with_hashtags") return "Copy + hashtags";
    return "Copy";
  }, [copyVariant]);

  if (!results.length) {
    return null;
  }

  const handleCopy = async (item: string, index: number) => {
    try {
      const output = buildCopyText(item, copyVariant);
      await navigator.clipboard.writeText(output);
      setCopiedIndex(index);
      trackEvent("copy_result", {
        tool_name: toolTitle,
        result_index: index + 1,
        variant: copyVariant,
      });
      setTimeout(() => setCopiedIndex(null), 1000);
    } catch {
      setCopiedIndex(null);
    }
  };

  const handleSave = (item: string, index: number) => {
    const record: SavedResult = { toolTitle, text: item.trim(), createdAt: Date.now() };
    const existing = safeReadSavedResults();
    const next = [record, ...existing].filter((entry, i, arr) => {
      const firstIndex = arr.findIndex((x) => x.toolTitle === entry.toolTitle && x.text === entry.text);
      return firstIndex === i;
    });
    safeWriteSavedResults(next);
    setSavedIndex(index);
    trackEvent("save_result", { tool_name: toolTitle, result_index: index + 1 });
    setTimeout(() => setSavedIndex(null), 1000);
  };

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">Generated Results</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500" htmlFor="copy-variant">
            Copy format
          </label>
          <select
            id="copy-variant"
            value={copyVariant}
            onChange={(event) => setCopyVariant(event.target.value as CopyVariant)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
          >
            <option value="plain">Plain</option>
            <option value="social_post">Social post</option>
            <option value="with_cta">With CTA</option>
            <option value="with_hashtags">With hashtags</option>
          </select>
        </div>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {results.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p>
              <span className="mr-2 font-semibold text-brand-700">{index + 1}.</span>
              {item}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCopy(item, index)}
                className="inline-flex rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                {copiedIndex === index ? "Copied" : copyLabel}
              </button>
              <button
                type="button"
                onClick={() => handleSave(item, index)}
                className="inline-flex rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                {savedIndex === index ? "Saved" : "Save"}
              </button>
              <a
                href="/top-results"
                className="inline-flex rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => trackEvent("open_saved_results", { tool_name: toolTitle })}
              >
                View saved →
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
