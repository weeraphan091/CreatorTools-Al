"use client";

import Link from "next/link";
import { useMemo } from "react";

type SavedResult = {
  toolTitle: string;
  text: string;
  createdAt: number;
};

const STORAGE_KEY = "vh_saved_results_v1";

function readSaved(): SavedResult[] {
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

export default function TopResultsClient() {
  const saved = useMemo(() => readSaved(), []);

  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Saved Results</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This page shows results you saved on this device. Use it as your personal swipe file for hooks, titles,
          captions, and CTAs.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate more results
          </Link>
          <Link
            href="/viral-hooks"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Browse hook hub
          </Link>
        </div>
      </section>

      {saved.length ? (
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Your saved swipe file</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {saved.map((item, index) => (
              <li key={`${item.createdAt}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.toolTitle}</p>
                <p className="mt-2">{item.text}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(item.text)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">No saved results yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            Generate results on any tool page, then click “Save” to build your swipe file.
          </p>
        </section>
      )}
    </div>
  );
}

