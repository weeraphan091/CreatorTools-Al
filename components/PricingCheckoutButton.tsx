"use client";

import { useState } from "react";

type Plan = "starter" | "agency" | "topup100";

type Props = {
  plan: Plan;
  label: string;
  className?: string;
};

export default function PricingCheckoutButton({ plan, label, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "Unable to start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <span className="inline-block">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className}
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && (
        <p className="mt-2 text-sm text-amber-700" role="alert">
          {error}
        </p>
      )}
    </span>
  );
}

