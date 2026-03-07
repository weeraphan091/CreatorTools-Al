import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { grantLifetimeCredits, getCreditsSnapshot } from "@/lib/credits";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return NextResponse.json({ error: "ADMIN_SECRET not configured." }, { status: 500 });
  }

  const h = await headers();
  const provided = h.get("x-admin-secret") || "";
  if (provided !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const userId = String(body.user_id || "").trim();
  const amount = Number(body.amount || 0);
  const reason = String(body.reason || "admin_manual_grant").trim();

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id." }, { status: 400 });
  }
  if (!amount || amount < 1 || amount > 10000) {
    return NextResponse.json({ error: "amount must be 1-10000." }, { status: 400 });
  }

  try {
    await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });

    const result = await grantLifetimeCredits({
      userId,
      amount,
      reason,
      externalId: `admin-${Date.now()}`,
      requestId: `admin-grant-${userId}-${Date.now()}`,
    });

    const snapshot = await getCreditsSnapshot(userId);

    return NextResponse.json({
      ok: true,
      granted: amount,
      credits: snapshot,
      grant_result: result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Grant failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return NextResponse.json({ error: "ADMIN_SECRET not configured." }, { status: 500 });
  }

  const h = await headers();
  const provided = h.get("x-admin-secret") || "";
  if (provided !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(request.url);
  const userId = (url.searchParams.get("user_id") || "").trim();

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id query param." }, { status: 400 });
  }

  try {
    const snapshot = await getCreditsSnapshot(userId);
    return NextResponse.json({ ok: true, user_id: userId, credits: snapshot });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lookup failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
