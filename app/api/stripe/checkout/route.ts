import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { siteConfig } from "@/lib/site";
import { getStripePriceMapping } from "@/lib/billing/plans";
import { getOrCreateStripeCustomerId } from "@/lib/billing/customer";
import { stripe } from "@/lib/stripe";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

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

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Payment is not set up yet. Please contact support@viralhooklab.com to complete your subscription.",
      },
      { status: 503 },
    );
  }

  let mapping;
  try {
    mapping = getStripePriceMapping();
  } catch {
    return NextResponse.json(
      {
        error:
          "Payment plans are not configured. Please contact support@viralhooklab.com to complete your subscription.",
      },
      { status: 503 },
    );
  }

  const priceId =
    plan === "starter" ? mapping.starterMonthly : plan === "agency" ? mapping.agencyMonthly : mapping.topup100;
  const isTopup = plan === "topup100";

  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress || null;
    await supabaseAdminRpc("ensure_profile", {
      p_user_id: userId,
      p_email: email,
    });
    const customerId = await getOrCreateStripeCustomerId(userId, email);

    if (!isTopup) {
      const activeSubs = await stripe().subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      if (activeSubs.data.length > 0) {
        return NextResponse.json(
          {
            error:
              "You already have an active subscription. Please use Customer Portal to update your billing plan.",
          },
          { status: 409 },
        );
      }
    }

    const session = await stripe().checkout.sessions.create({
      customer: customerId,
      client_reference_id: userId,
      mode: isTopup ? "payment" : "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${siteConfig.url}/pricing?success=1&checkout_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/pricing?canceled=1`,
      metadata: {
        clerk_user_id: userId,
        purchase_type: isTopup ? "topup" : "subscription",
      },
    });

    const url = session?.url ?? null;
    if (!url) {
      return NextResponse.json(
        { error: "Checkout session created but no URL returned. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

