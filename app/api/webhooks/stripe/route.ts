import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { getStripePriceMapping, MONTHLY_CREDITS_BY_TIER, tierFromPriceId } from "@/lib/billing/plans";

async function setTierAndMonthlyCredits(userId: string, tier: "free" | "starter" | "agency") {
  const supabase = supabaseAdmin();
  const monthlyCredits = tier === "free" ? 0 : MONTHLY_CREDITS_BY_TIER[tier];

  const { error } = await supabase
    .from("profiles")
    .update({ tier, monthly_credits: monthlyCredits })
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Supabase profile update failed: ${error.message}`);
  }
}

async function addLifetimeCredits(userId: string, amount: number) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("lifetime_credits")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase profile select failed: ${error.message}`);
  }

  const current = Number(data?.lifetime_credits || 0);
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ lifetime_credits: current + amount })
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(`Supabase lifetime credits update failed: ${updateError.message}`);
  }
}

async function upsertBillingCustomer(params: {
  userId: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  priceId?: string | null;
}) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("billing_customers").upsert(
    {
      user_id: params.userId,
      stripe_customer_id: params.stripeCustomerId || null,
      stripe_subscription_id: params.stripeSubscriptionId || null,
      current_price_id: params.priceId || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) {
    throw new Error(`Supabase billing_customers upsert failed: ${error.message}`);
  }
}

async function userIdFromStripeCustomerId(stripeCustomerId: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("billing_customers")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .maybeSingle();
  if (error) {
    throw new Error(`Supabase billing_customers lookup failed: ${error.message}`);
  }
  return data?.user_id ? String(data.user_id) : null;
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 500 });
  }

  const body = await request.text();
  const h = await headers();
  const signature = h.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event;
  try {
    event = stripe().webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  try {
    const mapping = getStripePriceMapping();

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const full = await stripe().checkout.sessions.retrieve(session.id, {
        expand: ["line_items.data.price", "customer", "subscription"],
      });

      const userId = String(full.client_reference_id || full.metadata?.clerk_user_id || "");
      if (!userId) {
        return NextResponse.json({ ok: true });
      }

      const customerId = typeof full.customer === "string" ? full.customer : full.customer?.id || null;
      const subscriptionId =
        typeof full.subscription === "string"
          ? full.subscription
          : full.subscription?.id || null;

      const firstLine = full.line_items?.data?.[0];
      const priceId = String(firstLine?.price?.id || "");

      await upsertBillingCustomer({
        userId,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        priceId: priceId || null,
      });

      if (full.mode === "payment" && priceId === mapping.topup100) {
        await addLifetimeCredits(userId, 100);
      }

      if (full.mode === "subscription") {
        const tier = priceId ? tierFromPriceId(priceId) : null;
        if (tier === "starter" || tier === "agency") {
          await setTierAndMonthlyCredits(userId, tier);
        }
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id || "";
      if (customerId) {
        const userId = await userIdFromStripeCustomerId(customerId);
        if (userId) {
          const subscriptionId = (() => {
            const inv = invoice as unknown as { subscription?: string | { id: string } };
            const sub = inv.subscription;
            return typeof sub === "string" ? sub : sub?.id || "";
          })();
          const subscription = subscriptionId
            ? await stripe().subscriptions.retrieve(subscriptionId, { expand: ["items.data.price"] })
            : null;
          const priceId = String(subscription?.items?.data?.[0]?.price?.id || "");
          const tier = priceId ? tierFromPriceId(priceId) : null;
          if (tier === "starter" || tier === "agency") {
            await setTierAndMonthlyCredits(userId, tier);
            await upsertBillingCustomer({
              userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId:
                subscriptionId || null,
              priceId: priceId || null,
            });
          }
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || "";
      const userId = customerId ? await userIdFromStripeCustomerId(customerId) : null;
      if (userId) {
        await setTierAndMonthlyCredits(userId, "free");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

