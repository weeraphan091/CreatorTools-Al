"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Snapshot = {
  tier: string;
  total_credits: number;
};

export default function CreditsNav() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  const fetchCredits = async () => {
    const res = await fetch("/api/credits", { method: "GET" });
    if (!res.ok) return;
    const raw: unknown = await res.json().catch(() => null);
    if (!raw || typeof raw !== "object") return;
    const data = raw as Record<string, unknown>;
    const total = data.total_credits;
    if (typeof total === "number") {
      setSnapshot({ tier: String(data.tier || "free"), total_credits: total });
    }
  };

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
  }, []);

  const creditsText = snapshot ? `Credits: ${snapshot.total_credits}` : "Credits: —";
  const isPaid = snapshot ? snapshot.tier !== "free" : false;

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/pricing"
        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
        title="View pricing and credits"
      >
        {creditsText}
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

