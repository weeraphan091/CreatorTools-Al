import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsSnapshot } from "@/lib/credits";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

const defaultSnapshot = {
  tier: "free",
  total_credits: 0,
  daily_free_credits: 0,
  monthly_credits: 0,
  lifetime_credits: 0,
};

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snapshot = await getCreditsSnapshot(userId);
    return NextResponse.json(snapshot, { status: 200 });
  } catch {
    try {
      await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });
      const snapshot = await getCreditsSnapshot(userId);
      return NextResponse.json(snapshot, { status: 200 });
    } catch {
      return NextResponse.json(defaultSnapshot, { status: 200 });
    }
  }
}

