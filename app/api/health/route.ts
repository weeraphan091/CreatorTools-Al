import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";
  const token = process.env.HEALTHCHECK_TOKEN?.trim();
  if (isProd && token) {
    const h = await headers();
    const provided = h.get("x-health-token") || "";
    if (provided !== token) {
      return NextResponse.json({ ok: false, message: "Unauthorized health check." }, { status: 401 });
    }
  }

  const checks: Record<string, { ok: boolean; message: string }> = {};

  checks["site_url"] = {
    ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    message: process.env.NEXT_PUBLIC_SITE_URL ? "Set" : "Missing NEXT_PUBLIC_SITE_URL",
  };

  checks["allowed_origins"] = {
    ok: Boolean(process.env.ALLOWED_ORIGINS?.trim()),
    message: process.env.ALLOWED_ORIGINS?.trim() ? "Set" : "Missing ALLOWED_ORIGINS (optional if SITE_URL set)",
  };

  checks["clerk_publishable"] = {
    ok: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()),
    message: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ? "Set" : "Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  };

  checks["clerk_secret"] = {
    ok: Boolean(process.env.CLERK_SECRET_KEY?.trim()),
    message: process.env.CLERK_SECRET_KEY?.trim() ? "Set" : "Missing CLERK_SECRET_KEY",
  };

  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || "";
  const secret = process.env.CLERK_SECRET_KEY?.trim() || "";
  const publishableMode = publishable.startsWith("pk_live_")
    ? "live"
    : publishable.startsWith("pk_test_")
      ? "test"
      : "unknown";
  const secretMode = secret.startsWith("sk_live_")
    ? "live"
    : secret.startsWith("sk_test_")
      ? "test"
      : "unknown";
  const modeMatched = publishableMode !== "unknown" && secretMode !== "unknown" && publishableMode === secretMode;
  checks["clerk_key_mode_match"] = {
    ok: modeMatched,
    message: modeMatched
      ? `Matched (${publishableMode})`
      : `Mismatch: publishable=${publishableMode}, secret=${secretMode}. Use same mode.`,
  };

  checks["clerk_webhook_secret"] = {
    ok: Boolean(process.env.CLERK_WEBHOOK_SECRET?.trim()),
    message: process.env.CLERK_WEBHOOK_SECRET?.trim() ? "Set" : "Missing CLERK_WEBHOOK_SECRET",
  };

  checks["supabase_url"] = {
    ok: Boolean(process.env.SUPABASE_URL?.trim()),
    message: process.env.SUPABASE_URL?.trim() ? "Set" : "Missing SUPABASE_URL",
  };

  checks["supabase_service_role"] = {
    ok: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    message: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ? "Set" : "Missing SUPABASE_SERVICE_ROLE_KEY",
  };

  const supabaseUrl = process.env.SUPABASE_URL?.trim() || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/get_credits`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ p_user_id: "__health_check__" }),
      });
      if (res.ok) {
        checks["supabase_connection"] = { ok: true, message: "Connected and RPC get_credits exists" };
      } else {
        const text = await res.text().catch(() => "");
        checks["supabase_connection"] = {
          ok: false,
          message: `Supabase RPC failed (${res.status}): ${text.slice(0, 200)}`,
        };
      }
    } catch (err) {
      checks["supabase_connection"] = {
        ok: false,
        message: `Supabase unreachable: ${err instanceof Error ? err.message : "unknown"}`,
      };
    }
  } else {
    checks["supabase_connection"] = { ok: false, message: "Skipped (missing URL or key)" };
  }

  checks["stripe_secret"] = {
    ok: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
    message: process.env.STRIPE_SECRET_KEY?.trim() ? "Set" : "Missing STRIPE_SECRET_KEY",
  };

  checks["stripe_webhook_secret"] = {
    ok: Boolean(process.env.STRIPE_WEBHOOK_SECRET?.trim()),
    message: process.env.STRIPE_WEBHOOK_SECRET?.trim() ? "Set" : "Missing STRIPE_WEBHOOK_SECRET",
  };

  checks["stripe_price_starter"] = {
    ok: Boolean(process.env.STRIPE_PRICE_STARTER_MONTHLY?.trim()),
    message: process.env.STRIPE_PRICE_STARTER_MONTHLY?.trim() ? "Set" : "Missing STRIPE_PRICE_STARTER_MONTHLY",
  };

  checks["stripe_price_agency"] = {
    ok: Boolean(process.env.STRIPE_PRICE_AGENCY_MONTHLY?.trim()),
    message: process.env.STRIPE_PRICE_AGENCY_MONTHLY?.trim() ? "Set" : "Missing STRIPE_PRICE_AGENCY_MONTHLY",
  };

  checks["stripe_price_topup"] = {
    ok: Boolean(process.env.STRIPE_PRICE_TOPUP_100?.trim()),
    message: process.env.STRIPE_PRICE_TOPUP_100?.trim() ? "Set" : "Missing STRIPE_PRICE_TOPUP_100",
  };

  checks["gemini_or_openai"] = {
    ok: Boolean(
      process.env.GEMINI_API_KEY?.trim() ||
        process.env.GOOGLE_API_KEY?.trim() ||
        process.env.OPENAI_API_KEY?.trim(),
    ),
    message:
      process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim()
        ? "At least one AI key set"
        : "Missing GEMINI_API_KEY / GOOGLE_API_KEY / OPENAI_API_KEY",
  };

  const allOk = Object.values(checks).every((c) => c.ok);
  const failed = Object.entries(checks).filter(([, c]) => !c.ok);

  return NextResponse.json(
    {
      ok: allOk,
      message: allOk ? "All checks passed" : `${failed.length} check(s) failed`,
      checks,
      failedKeys: failed.map(([key]) => key),
    },
    { status: allOk ? 200 : 503 },
  );
}
