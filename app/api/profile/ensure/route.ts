import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

async function ensureProfile() {
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

  let email: string | null = null;
  try {
    const user = await currentUser();
    email = user?.emailAddresses?.[0]?.emailAddress ?? null;
  } catch {
    // proceed with null email
  }

  try {
    const { error } = await supabaseAdminRpc("ensure_profile", {
      p_user_id: userId,
      p_email: email,
    });

    if (error) {
      return NextResponse.json(
        { error: `Supabase ensure_profile RPC error: ${error.message}` },
        { status: 500 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Supabase connection error: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function POST() {
  return ensureProfile();
}

export async function GET() {
  return ensureProfile();
}
