import { supabaseAdmin } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

export async function getOrCreateStripeCustomerId(userId: string, email?: string | null) {
  const supabase = supabaseAdmin();

  const existing = await supabase
    .from("billing_customers")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing.data?.stripe_customer_id) {
    return existing.data.stripe_customer_id;
  }

  const created = await stripe().customers.create({
    email: email || undefined,
    metadata: {
      clerk_user_id: userId,
    },
  });

  const upsert = await supabase
    .from("billing_customers")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: created.id,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  if (upsert.error) {
    throw new Error(`Supabase billing_customers upsert failed: ${upsert.error.message}`);
  }

  return created.id;
}

