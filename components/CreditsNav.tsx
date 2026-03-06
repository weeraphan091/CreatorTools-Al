"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Snapshot = {
  tier: string;
  total_credits: number;
};

export default function CreditsNav() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const fetchCredits = useCallback(async (retryAfterEnsure = false) => {
    if (!retryAfterEnsure) {
      await fetch("/api/profile/ensure", { method: "POST", credentials: "same-origin" }).catch(() => {});
    }
    const res = await fetch("/api/credits", { method: "GET", credentials: "same-origin" });
    const raw: unknown = await res.json().catch(() => null);
    if (res.ok && raw && typeof raw === "object") {
      const data = raw as Record<string, unknown>;
      const total = data.total_credits;
      if (typeof total === "number") {
        setSnapshot({ tier: String(data.tier || "free"), total_credits: total });
        setIsUnavailable(false);
        return;
      }
    }
    if (!retryAfterEnsure && res.status === 500) {
      await fetch("/api/profile/ensure", { method: "POST", credentials: "same-origin" }).catch(() => {});
      await fetchCredits(true);
    } else {
      setIsUnavailable(true);
    }
  }, []);

  useEffect(() => {
    fetchCredits();

    const update = (event: Event) => {
      const rawDetail = (event as CustomEvent).detail as unknown;
      if (!rawDetail || typeof rawDetail !== "object") {
        fetchCredits();
        return;
      }
      const detail = rawDetail as Record<string, unknown>;
      const remaining = detail.remaining;
      if (typeof remaining === "number") {
        setSnapshot((prev) => ({
          tier: String(detail.tier || prev?.tier || "free"),
          total_credits: remaining,
        }));
      } else {
        fetchCredits();
      }
    };

    window.addEventListener("viralhooklab:credits_updated", update);
    return () => window.removeEventListener("viralhooklab:credits_updated", update);
  }, [fetchCredits]);

  const creditsText = snapshot ? `Credits: ${snapshot.total_credits}` : "Credits: —";
  const displayText = isUnavailable ? "Credits: unavailable" : creditsText;
  const isPaid = snapshot ? snapshot.tier !== "free" : false;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/pricing"
        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        title="View pricing and credits"
      >
        {displayText}
      </Link>
      {isPaid ? (
        <a
          href="/api/stripe/customer-portal"
          className="text-xs font-semibold text-slate-700 hover:text-brand-700"
        >
          Customer Portal
        </a>
      ) : null}
    </div>
  );
}

