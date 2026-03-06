import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { siteConfig } from "@/lib/site";
import { getOrCreateStripeCustomerId } from "@/lib/billing/customer";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress || null;
  const customerId = await getOrCreateStripeCustomerId(userId, email);

  const session = await stripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${siteConfig.url}/pricing`,
  });

  return NextResponse.redirect(session.url, 302);
}

