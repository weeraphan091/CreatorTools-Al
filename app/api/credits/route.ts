import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsSnapshot } from "@/lib/credits";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

export async function GET() {
  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (authErr) {
    return NextResponse.json(
      { error: `Auth failed: ${authErr instanceof Error ? authErr.message : "unknown"}` },
      { status: 500 },
    );
  }

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
  } catch (firstErr) {
    const firstMsg = firstErr instanceof Error ? firstErr.message : "unknown";
    try {
      await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });
      const snapshot = await getCreditsSnapshot(userId);
      return NextResponse.json(snapshot, { status: 200, headers: noCacheHeaders });
    } catch (retryErr) {
      const retryMsg = retryErr instanceof Error ? retryErr.message : "unknown";
      return NextResponse.json(
        { error: `Credits fetch failed. First: ${firstMsg}. Retry: ${retryMsg}` },
        { status: 500, headers: noCacheHeaders },
      );
    }
  }
}

