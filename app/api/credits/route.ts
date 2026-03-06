import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsSnapshot } from "@/lib/credits";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const noCacheHeaders = {
    "Cache-Control": "private, no-store, max-age=0",
    Pragma: "no-cache",
  };

  try {
    const snapshot = await getCreditsSnapshot(userId);
    return NextResponse.json(snapshot, { status: 200, headers: noCacheHeaders });
  } catch {
    try {
      await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });
      const snapshot = await getCreditsSnapshot(userId);
      return NextResponse.json(snapshot, { status: 200, headers: noCacheHeaders });
    } catch {
      return NextResponse.json(
        { error: "Unable to fetch credits right now. Please try again." },
        { status: 500, headers: noCacheHeaders },
      );
    }
  }
}

