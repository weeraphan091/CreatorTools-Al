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
  starterMonthlyAll: string[];
  agencyMonthlyAll: string[];
  topup100All: string[];
};

function parsePriceList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getStripePriceMapping(): PriceMapping {
  const starterMonthlyList = parsePriceList(process.env.STRIPE_PRICE_STARTER_MONTHLY || "");
  const agencyMonthlyList = parsePriceList(process.env.STRIPE_PRICE_AGENCY_MONTHLY || "");
  const topup100List = parsePriceList(process.env.STRIPE_PRICE_TOPUP_100 || "");

  const starterMonthly = starterMonthlyList[0] || "";
  const agencyMonthly = agencyMonthlyList[0] || "";
  const topup100 = topup100List[0] || "";

  if (!starterMonthly || !agencyMonthly || !topup100) {
    throw new Error(
      "Missing Stripe price env vars. Required: STRIPE_PRICE_STARTER_MONTHLY, STRIPE_PRICE_AGENCY_MONTHLY, STRIPE_PRICE_TOPUP_100.",
    );
  }

  return {
    starterMonthly,
    agencyMonthly,
    topup100,
    starterMonthlyAll: starterMonthlyList,
    agencyMonthlyAll: agencyMonthlyList,
    topup100All: topup100List,
  };
}

export function tierFromPriceId(priceId: string): Tier | null {
  const { starterMonthlyAll, agencyMonthlyAll } = getStripePriceMapping();
  if (starterMonthlyAll.includes(priceId)) return "starter";
  if (agencyMonthlyAll.includes(priceId)) return "agency";
  return null;
}

