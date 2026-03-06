import { supabaseAdmin } from "@/lib/supabase/admin";

export async function supabaseAdminRpc(fn: string, args?: Record<string, unknown>) {
  const client = supabaseAdmin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).rpc(fn, args ?? {});
}

