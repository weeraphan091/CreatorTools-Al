import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Ad Copy Hub",
  description:
    "Generate high-CTR ad headlines, hooks, and CTAs for Meta and Google campaigns. ViralHookLab.com helps you test angles faster.",
  alternates: { canonical: "/ad-copy" },
  openGraph: {
    title: "Ad Copy Hub | ViralHookLab.com",
    description: "Ad headline angles, hook templates, and CTA generators built for conversion.",
    url: "/ad-copy",
  },
};

const featuredToolSlugs = ["ad-headline-generator", "ai-hook-generator", "call-to-action-generator"] as const;

export default function AdCopyHubPage() {
  const featuredTools = tools.filter((tool) =>
    featuredToolSlugs.includes(tool.slug as (typeof featuredToolSlugs)[number]),
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Ad Copy", href: "/ad-copy" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Ad Copy Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Ad copy is a testing game. Generate multiple angles, keep the offer constant, and test hooks + headlines with
          equal spend to find winners.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/ad-headline-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate ad headlines
          </Link>
          <Link
            href="/tools/call-to-action-generator"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Generate CTAs
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Angle buckets to test</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Benefit-first: outcome + timeframe.</li>
          <li>Proof-first: case study, numbers, testimonial.</li>
          <li>Curiosity-first: “Why X doesn’t work…”</li>
          <li>Urgency-first: limited offer (only if credible).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">Generators for conversion teams</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

