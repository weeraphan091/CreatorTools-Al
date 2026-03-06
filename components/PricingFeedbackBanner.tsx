"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PricingFeedbackBanner() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const error = searchParams.get("error");

  if (success === "1") {
    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        role="alert"
      >
        <p className="font-medium">Payment successful.</p>
        <p className="mt-1 text-emerald-700">Your credits will be available shortly. Refresh the page or open a tool to see your balance.</p>
      </div>
    );
  }

  if (canceled === "1") {
    return (
      <div
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
        role="status"
      >
        Checkout was canceled. You can try again whenever you’re ready.
      </div>
    );
  }

  if (error === "portal") {
    return (
      <div
        className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        role="alert"
      >
        <p className="font-medium">Could not open billing portal.</p>
        <p className="mt-1">
          If this keeps happening, contact{" "}
          <a href="mailto:support@viralhooklab.com" className="font-semibold underline hover:no-underline">
            support@viralhooklab.com
          </a>
          .
        </p>
      </div>
    );
  }

  return null;
}
