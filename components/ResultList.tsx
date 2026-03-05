"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type ResultListProps = {
  results: string[];
  toolTitle?: string;
};

export default function ResultList({ results, toolTitle = "unknown-tool" }: ResultListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!results.length) {
    return null;
  }

  const handleCopy = async (item: string, index: number) => {
    try {
      await navigator.clipboard.writeText(item);
      setCopiedIndex(index);
      trackEvent("copy_generated_result", {
        tool_name: toolTitle,
        result_index: index + 1,
      });
      setTimeout(() => setCopiedIndex(null), 1000);
    } catch {
      setCopiedIndex(null);
    }
  };

  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold text-slate-900">Generated Results</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {results.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p>
              <span className="mr-2 font-semibold text-brand-700">{index + 1}.</span>
              {item}
            </p>
            <button
              type="button"
              onClick={() => handleCopy(item, index)}
              className="mt-2 inline-flex rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              {copiedIndex === index ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
