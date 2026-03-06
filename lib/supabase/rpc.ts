import { supabaseAdmin } from "@/lib/supabase/admin";

type RpcResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};

type RpcFn = (fn: string, args?: Record<string, unknown>) => Promise<RpcResponse<unknown>>;

export async function supabaseAdminRpc(fn: string, args?: Record<string, unknown>) {
  const client = supabaseAdmin();
  const rpc = (client as unknown as { rpc: RpcFn }).rpc;
  return rpc(fn, args);
}

