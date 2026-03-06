import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PricingPlanCta from "@/components/PricingPlanCta";
import { CLERK_ENABLED } from "@/lib/clerk";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Upgrade for more credits or buy a top-up to keep generating with ViralHookLab.com.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | ViralHookLab.com",
    description: "Upgrade for more credits or buy a top-up to keep generating with ViralHookLab.com.",
    url: "/pricing",
  },
};

function TierCard(props: {
  name: string;
  price: string;
  tagline: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
  cta: ReactNode;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl border bg-white p-7 shadow-sm",
        props.highlight ? "border-brand-300 ring-2 ring-brand-200" : "border-slate-200",
      ].join(" ")}
    >
      {props.badge ? (
        <div className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          {props.badge}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{props.name}</h2>
          <p className="mt-1 text-sm text-slate-600">{props.tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900">{props.price}</p>
          <p className="mt-1 text-xs text-slate-500">USD</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-slate-700">
        {props.features.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              &#10003;
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">{props.cta}</div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <section className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Pricing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Upgrade to keep generating
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Credits are deducted per generation. Free users get 3 daily credits. Upgrade for monthly credits or add one-time credits.
        </p>
        {CLERK_ENABLED && (
          <p className="mt-2 text-sm text-slate-500">
            Sign in first, then choose a plan below to subscribe or buy credits.
          </p>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <TierCard
          name="Free"
          price="$0"
          tagline="Try the tools with daily credits."
          features={[
            "3 daily credits (resets every day)",
            "Access to all 50 tools",
            "Fast generation + clean UI",
          ]}
          cta={
            <Link
              href="/sign-up"
              className="inline-flex w-full justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Create free account
            </Link>
          }
        />

        <TierCard
          name="Starter"
          price="$9/mo"
          tagline="For creators and marketers who ship weekly."
          highlight
          badge="Most Popular"
          features={[
            "500 credits per month",
            "Priority credit pool (monthly credits used after daily free)",
            "Customer Portal to manage billing",
          ]}
          cta={
            CLERK_ENABLED ? (
              <PricingPlanCta
                plan="starter"
                label="Subscribe - $9/mo"
                signInLabel="Sign in to subscribe"
                className="inline-flex w-full justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                signInClassName="inline-flex w-full justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              />
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex w-full justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Sign in to subscribe
              </Link>
            )
          }
        />

        <TierCard
          name="Agency"
          price="$29/mo"
          tagline="For teams running content and campaigns at scale."
          features={[
            "2000 credits per month",
            "Ideal for agencies and multi-brand ops",
            "Customer Portal to manage billing",
          ]}
          cta={
            CLERK_ENABLED ? (
              <PricingPlanCta
                plan="agency"
                label="Subscribe - $29/mo"
                signInLabel="Sign in to subscribe"
                className="inline-flex w-full justify-center rounded-lg border border-brand-600 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-60"
                signInClassName="inline-flex w-full justify-center rounded-lg border border-brand-600 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              />
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex w-full justify-center rounded-lg border border-brand-600 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                Sign in to subscribe
              </Link>
            )
          }
        />
      </section>

      <section className="card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Pay-as-you-go top-up</h2>
            <p className="mt-2 text-sm text-slate-600">
              Need a quick boost? Buy one-time credits that never expire.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-right">
            <p className="text-sm font-semibold text-slate-900">$2.99</p>
            <p className="text-xs text-slate-600">for 100 one-time credits</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {CLERK_ENABLED ? (
            <PricingPlanCta
              plan="topup100"
              label="Buy 100 credits - $2.99"
              signInLabel="Sign in to buy credits"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              signInClassName="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            />
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Sign in to buy top-up
            </Link>
          )}
          <Link
            href="/tools"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Explore tools
          </Link>
        </div>
      </section>
    </div>
  );
}
