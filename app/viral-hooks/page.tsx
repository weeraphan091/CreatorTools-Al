import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Viral Hook Generator Hub",
  description:
    "Explore viral hook templates, examples, and AI tools to generate better hooks for TikTok, Reels, Shorts, ads, and emails.",
  alternates: { canonical: "/viral-hooks" },
  openGraph: {
    title: "Viral Hook Generator Hub | ViralHookLab.com",
    description: "Viral hook examples, templates, and AI tools built for creators and marketers.",
    url: "/viral-hooks",
  },
};

const featuredToolSlugs = [
  "ai-hook-generator",
  "tiktok-caption-generator",
  "youtube-title-generator",
  "ad-headline-generator",
  "call-to-action-generator",
] as const;

export default function ViralHooksHubPage() {
  const featuredTools = tools.filter((tool) => featuredToolSlugs.includes(tool.slug as (typeof featuredToolSlugs)[number]));

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Viral Hooks", href: "/viral-hooks" },
        ]}
      />

      <section className="card p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{siteConfig.name}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Viral Hooks Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Hooks are the first line that makes people stop scrolling. Use this hub to generate hook variations, test the
          best performers, and build a swipe file you can reuse across platforms.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/ai-hook-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate hooks now
          </Link>
          <Link
            href="/top-results"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View saved results
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Hook templates that consistently perform</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Contrarian: “Stop doing X if you want Y.”</li>
            <li>Proof: “I tested X for 7 days — here’s what changed.”</li>
            <li>Specific outcome: “Get Y in Z minutes without A.”</li>
            <li>Curiosity gap: “Nobody talks about this… but it matters.”</li>
            <li>Checklist: “Before you post, do these 3 things.”</li>
          </ul>
        </div>
        <aside className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Fast testing playbook</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">1) Generate 10 variations.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">2) Pick top 3 by clarity + novelty.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">3) Test for 24–72 hours.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">4) Save winners to your swipe file.</li>
          </ol>
        </aside>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">Tools to generate viral hooks</h2>
        <p className="mt-2 text-sm text-slate-600">Pick a generator based on your platform and goal.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

