import { supabaseAdminRpc } from "@/lib/supabase/rpc";

export type CreditsSnapshot = {
  tier: string;
  total_credits: number;
  daily_free_credits: number;
  monthly_credits: number;
  lifetime_credits: number;
  last_reset_date?: string;
};

export async function getCreditsSnapshot(userId: string): Promise<CreditsSnapshot> {
  const { data, error } = await supabaseAdminRpc("get_credits", { p_user_id: userId });
  if (error) {
    throw new Error(`Supabase get_credits failed: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    return {
      tier: "free",
      total_credits: 0,
      daily_free_credits: 0,
      monthly_credits: 0,
      lifetime_credits: 0,
    };
  }

  return row as CreditsSnapshot;
}

export type DeductCreditsResult = CreditsSnapshot & { ok: boolean };

export async function deductOneCredit(userId: string): Promise<DeductCreditsResult> {
  const { data, error } = await supabaseAdminRpc("deduct_credits", { p_user_id: userId, p_amount: 1 });
  if (error) {
    throw new Error(`Supabase deduct_credits failed: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    return {
      ok: false,
      tier: "free",
      total_credits: 0,
      daily_free_credits: 0,
      monthly_credits: 0,
      lifetime_credits: 0,
    };
  }

  return row as DeductCreditsResult;
}

export type DeductCreditsIdempotentResult = CreditsSnapshot & {
  ok: boolean;
  charged: boolean;
};

export async function deductOneCreditIdempotent(
  userId: string,
  requestId: string,
): Promise<DeductCreditsIdempotentResult> {
  const { data, error } = await supabaseAdminRpc("deduct_credits_idempotent", {
    p_user_id: userId,
    p_amount: 1,
    p_request_id: requestId,
    p_reason: "generate",
  });
  if (error) {
    throw new Error(`Supabase deduct_credits_idempotent failed: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    return {
      ok: false,
      charged: false,
      tier: "free",
      total_credits: 0,
      daily_free_credits: 0,
      monthly_credits: 0,
      lifetime_credits: 0,
    };
  }

  return row as DeductCreditsIdempotentResult;
}

export async function grantLifetimeCredits(params: {
  userId: string;
  amount: number;
  reason: string;
  externalId?: string | null;
  requestId?: string | null;
}): Promise<CreditsSnapshot & { ok: boolean }> {
  const { data, error } = await supabaseAdminRpc("grant_credits", {
    p_user_id: params.userId,
    p_amount: params.amount,
    p_reason: params.reason,
    p_external_id: params.externalId || null,
    p_request_id: params.requestId || null,
  });
  if (error) {
    throw new Error(`Supabase grant_credits failed: ${error.message}`);
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    return {
      ok: false,
      tier: "free",
      total_credits: 0,
      daily_free_credits: 0,
      monthly_credits: 0,
      lifetime_credits: 0,
    };
  }

  return row as CreditsSnapshot & { ok: boolean };
}

