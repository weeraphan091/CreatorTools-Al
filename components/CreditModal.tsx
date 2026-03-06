"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreditModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("viralhooklab:out_of_credits", handler);
    return () => window.removeEventListener("viralhooklab:out_of_credits", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2 id="credit-modal-title" className="text-xl font-semibold text-slate-900">You are out of credits!</h2>
        <p className="mt-2 text-sm text-slate-600">
          Upgrade your plan or buy a top-up to continue.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            View pricing
          </Link>
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

