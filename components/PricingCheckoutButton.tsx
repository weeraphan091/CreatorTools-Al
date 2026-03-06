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
        credentials: "same-origin",
      });

      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Unable to start checkout.");
        return;
      }
      if (!data.url || typeof data.url !== "string") {
        setError("Invalid response. Please try again or contact support.");
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
    <span className="inline-block w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
      {error && (
        <div
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800"
          role="alert"
        >
          <p>{error}</p>
          {(error.includes("support") || error.includes("contact")) && (
            <a
              href="mailto:support@viralhooklab.com"
              className="mt-2 inline-block font-semibold underline hover:no-underline"
            >
              support@viralhooklab.com
            </a>
          )}
        </div>
      )}
    </span>
  );
}

