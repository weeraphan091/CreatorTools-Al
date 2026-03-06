import Stripe from "stripe";

let cached: Stripe | null = null;

export function stripe() {
  if (cached) return cached;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  cached = new Stripe(secretKey, {
    typescript: true,
  });

  return cached;
}

