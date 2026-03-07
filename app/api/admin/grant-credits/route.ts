import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getCreditsSnapshot } from "@/lib/credits";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

async function directGrantCredits(userId: string, amount: number) {
  const supabase = supabaseAdmin();

  const { data: profile, error: fetchErr } = await supabase
    .from("profiles")
    .select("lifetime_credits")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchErr) throw new Error(`Profile fetch failed: ${fetchErr.message}`);
  if (!profile) throw new Error(`Profile not found for ${userId}`);

  const newLifetime = (profile.lifetime_credits || 0) + amount;

  const { error: updateErr } = await supabase
    .from("profiles")
    .update({ lifetime_credits: newLifetime })
    .eq("user_id", userId);

  if (updateErr) throw new Error(`Profile update failed: ${updateErr.message}`);

  return { ok: true, lifetime_credits: newLifetime };
}

async function checkAuth() {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return { ok: false as const, response: NextResponse.json({ error: "ADMIN_SECRET not configured." }, { status: 500 }) };
  }
  const h = await headers();
  const provided = h.get("x-admin-secret") || "";
  if (provided !== adminSecret) {
    return { ok: false as const, response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { ok: true as const };
}

export async function POST(request: Request) {
  const authCheck = await checkAuth();
  if (!authCheck.ok) return authCheck.response;

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

    const grantResult = await directGrantCredits(userId, amount);
    const snapshot = await getCreditsSnapshot(userId);

    return NextResponse.json({
      ok: true,
      granted: amount,
      reason,
      credits: snapshot,
      grant_result: grantResult,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Grant failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authCheck = await checkAuth();
  if (!authCheck.ok) return authCheck.response;

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
