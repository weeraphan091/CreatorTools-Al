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

    // Ensure the user's profile exists in Supabase before creating the billing
    // customer. billing_customers has a FK on profiles.user_id, so if no profile
    // row exists (e.g. the Clerk webhook didn't fire on signup) the upsert would
    // fail with a foreign-key violation and the checkout would silently error.
    await supabaseAdminRpc("ensure_profile", {
      p_user_id: userId,
      p_email: email,
    }).catch(() => {
      // Non-fatal: proceed even if ensure_profile fails (e.g. Supabase not yet
      // configured). The billing_customers upsert will surface the real error.
    });

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

    const url = session?.url ?? null;
    if (!url) {
      return NextResponse.json(
        { error: "Checkout session created but no URL returned. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "Checkout failed. Please try again or contact support@viralhooklab.com.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

