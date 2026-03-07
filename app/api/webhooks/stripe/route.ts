import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";
import { grantLifetimeCredits } from "@/lib/credits";
import { logError } from "@/lib/observability/logger";
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

async function markWebhookProcessed(params: {
  eventId: string;
  provider: "stripe";
  eventType: string;
}) {
  const supabase = supabaseAdmin();
  const table = (supabase as unknown as {
    from: (tableName: string) => { insert: (value: Record<string, unknown>) => Promise<{ error: { message: string } | null }> };
  }).from("processed_webhooks");
  const { error } = await table.insert({
    event_id: params.eventId,
    provider: params.provider,
    event_type: params.eventType,
  });
  if (!error) {
    return { inserted: true as const };
  }
  if (error.message.toLowerCase().includes("duplicate key")) {
    return { inserted: false as const };
  }
  throw new Error(`Webhook dedupe insert failed: ${error.message}`);
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
      let full: Stripe.Checkout.Session;
      try {
        full = await stripe().checkout.sessions.retrieve(session.id, {
          expand: ["line_items.data.price", "customer", "subscription"],
        });
      } catch (e) {
        logError("stripe.webhook.checkout_retrieve_failed", { error: String(e), sessionId: session.id });
        return NextResponse.json({ ok: true });
      }

      const userId = String(full.client_reference_id || full.metadata?.clerk_user_id || "");
      if (!userId) {
        return NextResponse.json({ ok: true });
      }

      try {
        await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });
      } catch (e) {
        logError("stripe.webhook.ensure_profile_failed", { userId, error: String(e) });
      }

      const customerId = typeof full.customer === "string" ? full.customer : full.customer?.id || null;
      const subscriptionId =
        typeof full.subscription === "string"
          ? full.subscription
          : full.subscription?.id || null;

      const firstLine = full.line_items?.data?.[0];
      const priceId = String(firstLine?.price?.id || "");

      try {
        await upsertBillingCustomer({
          userId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          priceId: priceId || null,
        });
      } catch (e) {
        logError("stripe.webhook.upsert_billing_failed", { userId, error: String(e) });
      }

      if (full.mode === "payment" && mapping.topup100All.includes(priceId)) {
        try {
          await grantLifetimeCredits({
            userId,
            amount: 100,
            reason: "stripe_topup_100",
            externalId: full.payment_intent ? String(full.payment_intent) : session.id,
            requestId: `stripe-checkout-${session.id}`,
          });
        } catch (e) {
          logError("stripe.webhook.grant_credits_failed", { userId, error: String(e) });
        }
      }

      if (full.mode === "subscription") {
        const tier = priceId ? tierFromPriceId(priceId) : null;
        if (tier === "starter" || tier === "agency") {
          try {
            await setTierAndMonthlyCredits(userId, tier);
          } catch (e) {
            logError("stripe.webhook.set_tier_failed", { userId, tier, error: String(e) });
          }
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

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || "";
      const userId = customerId ? await userIdFromStripeCustomerId(customerId) : null;
      if (userId) {
        const status = subscription.status;
        if (status === "active" || status === "trialing") {
          const priceId = String(subscription.items.data[0]?.price?.id || "");
          const tier = priceId ? tierFromPriceId(priceId) : null;
          if (tier === "starter" || tier === "agency") {
            await setTierAndMonthlyCredits(userId, tier);
            await upsertBillingCustomer({
              userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscription.id,
              priceId,
            });
          }
        }
        if (["canceled", "incomplete_expired", "unpaid"].includes(status)) {
          await setTierAndMonthlyCredits(userId, "free");
        }
      }
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id || "";
      const userId = customerId ? await userIdFromStripeCustomerId(customerId) : null;
      if (userId) {
        await setTierAndMonthlyCredits(userId, "free");
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

    await markWebhookProcessed({
      eventId: event.id,
      provider: "stripe",
      eventType: event.type,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    logError("stripe.webhook.failed", { message, eventType: event.type, eventId: event.id });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

