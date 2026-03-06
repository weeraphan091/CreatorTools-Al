import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { siteConfig } from "@/lib/site";
import { getOrCreateStripeCustomerId } from "@/lib/billing/customer";
import { stripe } from "@/lib/stripe";
import { supabaseAdminRpc } from "@/lib/supabase/rpc";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(`${siteConfig.url}/sign-in?redirect_url=${encodeURIComponent("/pricing")}`, 302);
  }

  try {
    await supabaseAdminRpc("ensure_profile", { p_user_id: userId, p_email: null });
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress || null;
    const customerId = await getOrCreateStripeCustomerId(userId, email);
    const session = await stripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteConfig.url}/pricing`,
    });
    if (!session?.url) {
      return NextResponse.redirect(`${siteConfig.url}/pricing?error=portal`, 302);
    }
    return NextResponse.redirect(session.url, 302);
  } catch {
    return NextResponse.redirect(`${siteConfig.url}/pricing?error=portal`, 302);
  }
}

