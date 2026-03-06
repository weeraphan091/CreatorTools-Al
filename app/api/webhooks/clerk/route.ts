import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

type ClerkWebhookEvent = {
  type: string;
  data: unknown;
};

type ClerkUserCreatedData = {
  id?: string;
  email_addresses?: Array<{
    email_address?: string;
  }>;
};

export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing CLERK_WEBHOOK_SECRET." }, { status: 500 });
  }

  const payload = await request.text();
  const h = await headers();
  const svixId = h.get("svix-id");
  const svixTimestamp = h.get("svix-timestamp");
  const svixSignature = h.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing Svix headers." }, { status: 400 });
  }

  let event: ClerkWebhookEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "user.created") {
    const data = event.data as ClerkUserCreatedData;
    const userId = String(data?.id || "");
    const email = String(data?.email_addresses?.[0]?.email_address || "");
    if (!userId) {
      return NextResponse.json({ error: "Missing user id." }, { status: 400 });
    }

    const { error } = await supabaseAdminRpc("ensure_profile", {
      p_user_id: userId,
      p_email: email || null,
    });

    if (error) {
      return NextResponse.json({ error: `Supabase ensure_profile failed: ${error.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

