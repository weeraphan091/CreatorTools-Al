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

