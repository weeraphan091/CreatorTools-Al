export type PaidTier = "starter" | "agency";
export type Tier = "free" | PaidTier;

export const MONTHLY_CREDITS_BY_TIER: Record<PaidTier, number> = {
  starter: 500,
  agency: 2000,
};

export const DAILY_FREE_CREDITS = 3;

export type PriceMapping = {
  starterMonthly: string;
  agencyMonthly: string;
  topup100: string;
};

export function getStripePriceMapping(): PriceMapping {
  const starterMonthly = process.env.STRIPE_PRICE_STARTER_MONTHLY || "";
  const agencyMonthly = process.env.STRIPE_PRICE_AGENCY_MONTHLY || "";
  const topup100 = process.env.STRIPE_PRICE_TOPUP_100 || "";

  if (!starterMonthly || !agencyMonthly || !topup100) {
    throw new Error(
      "Missing Stripe price env vars. Required: STRIPE_PRICE_STARTER_MONTHLY, STRIPE_PRICE_AGENCY_MONTHLY, STRIPE_PRICE_TOPUP_100.",
    );
  }

  return { starterMonthly, agencyMonthly, topup100 };
}

export function tierFromPriceId(priceId: string): Tier | null {
  const { starterMonthly, agencyMonthly } = getStripePriceMapping();
  if (priceId === starterMonthly) return "starter";
  if (priceId === agencyMonthly) return "agency";
  return null;
}

