import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { siteConfig } from "@/lib/site";
import { getStripePriceMapping } from "@/lib/billing/plans";
import { getOrCreateStripeCustomerId } from "@/lib/billing/customer";
import { stripe } from "@/lib/stripe";

type CheckoutBody = {
  plan?: "starter" | "agency" | "topup100";
};

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as CheckoutBody;
  const plan = body.plan || null;
  if (!plan) {
    return NextResponse.json({ error: "Missing plan." }, { status: 400 });
  }

  const mapping = getStripePriceMapping();
  const priceId =
    plan === "starter" ? mapping.starterMonthly : plan === "agency" ? mapping.agencyMonthly : mapping.topup100;
  const isTopup = plan === "topup100";

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const customerId = await getOrCreateStripeCustomerId(userId, email);

  const session = await stripe().checkout.sessions.create({
    customer: customerId,
    client_reference_id: userId,
    mode: isTopup ? "payment" : "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${siteConfig.url}/pricing?success=1`,
    cancel_url: `${siteConfig.url}/pricing?canceled=1`,
    metadata: {
      clerk_user_id: userId,
      purchase_type: isTopup ? "topup" : "subscription",
    },
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}

