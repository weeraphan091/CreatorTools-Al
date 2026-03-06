import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Call-to-Action (CTA) Hub",
  description:
    "Generate high-converting CTAs for landing pages, emails, and ads. Use ViralHookLab.com to test CTA wording faster.",
  alternates: { canonical: "/cta" },
  openGraph: {
    title: "CTA Hub | ViralHookLab.com",
    description: "CTA templates and generators for higher clicks and conversions.",
    url: "/cta",
  },
};

const featuredToolSlugs = ["call-to-action-generator", "ad-headline-generator", "blog-title-generator"] as const;

export default function CtaHubPage() {
  const featuredTools = tools.filter((tool) =>
    featuredToolSlugs.includes(tool.slug as (typeof featuredToolSlugs)[number]),
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "CTA", href: "/cta" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">CTA Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          CTAs convert best when they are specific and outcome-based. Use the generator to produce variants that match
          funnel stage and page intent.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/call-to-action-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate CTAs
          </Link>
          <Link
            href="/ad-copy"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Pair with ad copy →
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">CTA upgrades (quick wins)</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Replace “Submit” with a specific outcome.</li>
          <li>Use “Get/Start/See/Generate” verbs.</li>
          <li>Match CTA intensity to funnel stage.</li>
          <li>Repeat the CTA near decision points (after proof).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">Recommended generators</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

