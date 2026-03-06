import { NextResponse } from "next/server";

/**
 * GET /api/health
 * เช็คสภาพระบบ: env ที่ต้องมี, ไม่ return ค่า secret ออกไป
 * ใช้ดูว่า service ไหนยังไม่ตั้งหรือพัง (เฉพาะตอน debug)
 */
export async function GET() {
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
