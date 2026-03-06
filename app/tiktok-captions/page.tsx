import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "TikTok Captions Hub",
  description:
    "Generate TikTok captions that drive comments, saves, and shares. Explore ViralHookLab.com templates and AI caption tools.",
  alternates: { canonical: "/tiktok-captions" },
  openGraph: {
    title: "TikTok Captions Hub | ViralHookLab.com",
    description: "Caption templates, comment-driving CTAs, and AI tools for TikTok.",
    url: "/tiktok-captions",
  },
};

const featuredToolSlugs = ["tiktok-caption-generator", "ai-hook-generator", "call-to-action-generator"] as const;

export default function TikTokCaptionsHubPage() {
  const featuredTools = tools.filter((tool) =>
    featuredToolSlugs.includes(tool.slug as (typeof featuredToolSlugs)[number]),
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "TikTok Captions", href: "/tiktok-captions" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">TikTok Captions Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Strong captions make people comment, save, and rewatch. Generate multiple variants, then rotate winners to
          avoid audience fatigue.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/tiktok-caption-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate TikTok captions
          </Link>
          <Link
            href="/top-results"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            View saved swipe file
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Caption patterns that boost comments</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Polarizing question: “Do you agree? Yes or no?”</li>
          <li>Pick one: “A or B?”</li>
          <li>Quick challenge: “Try this today and tell me what happens.”</li>
          <li>Keyword bait: “Comment ‘template’ and I’ll send it.”</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">Generators to pair together</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

