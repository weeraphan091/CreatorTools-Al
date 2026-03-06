import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

/**
 * POST /api/profile/ensure
 * Creates or updates the current user's profile in Supabase (for users who signed up before Clerk webhook was configured).
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;

  const { error } = await supabaseAdminRpc("ensure_profile", {
    p_user_id: userId,
    p_email: email,
  });

  if (error) {
    return NextResponse.json(
      { error: `Failed to ensure profile: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
