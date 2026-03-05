import type { Metadata } from "next";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import NewsletterForm from "@/components/NewsletterForm";
import FAQSection from "@/components/FAQSection";
import { joinNewsletterAction } from "@/app/actions";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Content Generators for Creators",
  description:
    "Use CreatorTools AI to generate viral titles, hooks, captions, bios, and marketing copy with 10 powerful AI tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CreatorTools AI - Free AI Generators for Creators",
    description:
      "Generate high-converting content for YouTube, TikTok, Instagram, blogs, and ads.",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">CreatorTools AI</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create Better Marketing Content in Minutes with AI
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Fast, SEO-friendly AI writing tools for content creators, marketers, founders, and agencies.
          Generate titles, hooks, bios, ad copy, and call-to-actions with one click.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tools" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Explore 10 AI Tools
          </Link>
          <Link href="/templates" className="rounded-lg border border-brand-600 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Explore SEO Templates
          </Link>
          <Link href="/blog" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
            Read Blog
          </Link>
        </div>
      </section>

      <AdBanner slot="Homepage Hero Banner" />

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Popular AI Tools</h2>
          <Link href="/tools" className="text-sm font-medium text-brand-700 hover:text-brand-600">
            View all tools
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Weekly Creator Marketing Tips</h2>
          <p className="mt-2 text-sm text-slate-600">Join our newsletter for practical growth playbooks and prompt templates.</p>
          <NewsletterForm action={joinNewsletterAction} />
        </div>
        <AffiliateBlock title="Creator Stack: Editing, SEO, and Growth Tools" />
      </section>

      <FAQSection
        items={[
          {
            question: "Is CreatorTools AI free to use?",
            answer:
              "Yes. You can generate content ideas for free. You can later add premium plans if you want higher usage limits or advanced features.",
          },
          {
            question: "How does this site make money?",
            answer:
              "Revenue can come from display ads, affiliate offers, and premium upgrades. This project already includes ad and affiliate placeholders ready for activation.",
          },
          {
            question: "Which tools get the most SEO traffic?",
            answer:
              "Typically high-intent generators like YouTube title generator, TikTok caption generator, and AI hook generator drive strong organic traffic when supported by template pages and blog posts.",
          },
        ]}
      />
    </div>
  );
}
