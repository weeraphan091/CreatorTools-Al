import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "YouTube Titles Hub",
  description:
    "Generate high-CTR YouTube titles, hook lines, and thumbnail-aligned angles with ViralHookLab.com AI tools and templates.",
  alternates: { canonical: "/youtube-titles" },
  openGraph: {
    title: "YouTube Titles Hub | ViralHookLab.com",
    description: "High-CTR YouTube title angles, templates, and AI generators.",
    url: "/youtube-titles",
  },
};

const featuredToolSlugs = ["youtube-title-generator", "ai-hook-generator", "call-to-action-generator"] as const;

export default function YoutubeTitlesHubPage() {
  const featuredTools = tools.filter((tool) =>
    featuredToolSlugs.includes(tool.slug as (typeof featuredToolSlugs)[number]),
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "YouTube Titles", href: "/youtube-titles" },
        ]}
      />

      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">YouTube Titles Hub</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Use these tools to generate title angles that match search intent and create curiosity. The goal: improve CTR
          while keeping the promise clear.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/youtube-title-generator"
            className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Generate YouTube titles
          </Link>
          <Link
            href="/tools/ai-hook-generator"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Generate hooks
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Title formula checklist</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>One clear outcome (what the viewer gets).</li>
          <li>One tension trigger (mistake, shortcut, proof, or curiosity).</li>
          <li>Specificity (numbers, timeframe, audience, tool).</li>
          <li>Match the thumbnail so it feels consistent.</li>
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

