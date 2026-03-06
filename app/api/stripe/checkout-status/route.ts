import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsSnapshot } from "@/lib/credits";
import { stripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const sessionId = (url.searchParams.get("session_id") || "").trim();
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    const ownerId = String(session.client_reference_id || session.metadata?.clerk_user_id || "");
    if (!ownerId || ownerId !== userId) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const paymentStatus = session.payment_status || "unpaid";
    const completed = session.status === "complete";
    const isPaid = completed && (paymentStatus === "paid" || paymentStatus === "no_payment_required");
    const credits = await getCreditsSnapshot(userId);

    return NextResponse.json(
      {
        ok: true,
        session_status: session.status,
        payment_status: paymentStatus,
        confirmed: isPaid,
        credits,
      },
      { status: 200, headers: { "Cache-Control": "private, no-store, max-age=0" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch checkout status.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
