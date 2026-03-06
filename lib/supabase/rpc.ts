import { supabaseAdmin } from "@/lib/supabase/admin";

type RpcResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};

type RpcFn = (fn: string, args?: Record<string, unknown>) => Promise<RpcResponse<unknown>>;

export async function supabaseAdminRpc(fn: string, args?: Record<string, unknown>) {
  let client;
  try {
    client = supabaseAdmin();
  } catch (initErr) {
    return {
      data: null,
      error: {
        message: `Supabase client init failed: ${initErr instanceof Error ? initErr.message : "unknown"}`,
      },
    };
  }

  try {
    const rpc = (client as unknown as { rpc: RpcFn }).rpc;
    return await rpc.call(client, fn, args);
  } catch (callErr) {
    return {
      data: null,
      error: {
        message: `Supabase RPC ${fn} threw: ${callErr instanceof Error ? callErr.message : "unknown"}`,
      },
    };
  }
}

