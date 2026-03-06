"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type CheckoutState = "idle" | "processing" | "confirmed" | "failed";

export default function PricingFeedbackBanner() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const sessionId = searchParams.get("checkout_session_id");
    const success = searchParams.get("success");
    if (!sessionId || success !== "1") return;

    let cancelled = false;
    setCheckoutState("processing");

    const pollStatus = async () => {
      for (let i = 0; i < 6; i += 1) {
        try {
          const res = await fetch(`/api/stripe/checkout-status?session_id=${encodeURIComponent(sessionId)}`, {
            method: "GET",
            credentials: "same-origin",
          });
          const body = (await res.json().catch(() => ({}))) as {
            confirmed?: boolean;
            payment_status?: string;
            credits?: { total_credits?: number };
          };

          if (!res.ok) {
            continue;
          }

          if (body.confirmed) {
            if (!cancelled) {
              setCheckoutState("confirmed");
              const remaining = body.credits?.total_credits;
              if (typeof remaining === "number" && typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("viralhooklab:credits_updated", { detail: { remaining } }));
              }
            }
            return;
          }

          if (body.payment_status === "unpaid") {
            if (!cancelled) setCheckoutState("failed");
            return;
          }
        } catch {
          // ignore transient polling error
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      if (!cancelled) setCheckoutState("processing");
    };

    void pollStatus();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (!mounted) return null;

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const error = searchParams.get("error");

  if (success === "1") {
    if (checkoutState === "confirmed") {
      return (
        <div
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="alert"
        >
          <p className="font-medium">Payment confirmed.</p>
          <p className="mt-1 text-emerald-700">Your plan and credits are active now.</p>
        </div>
      );
    }

    if (checkoutState === "failed") {
      return (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          <p className="font-medium">Payment could not be verified.</p>
          <p className="mt-1 text-red-700">Please retry checkout or contact support@viralhooklab.com.</p>
        </div>
      );
    }

    return (
      <div
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        role="alert"
      >
        <p className="font-medium">Payment processing.</p>
        <p className="mt-1 text-emerald-700">We are confirming your checkout and syncing credits. This usually takes a few seconds.</p>
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
