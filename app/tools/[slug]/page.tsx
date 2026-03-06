import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import FaqJsonLd from "@/components/FaqJsonLd";
import IntentLinkSection from "@/components/IntentLinkSection";
import ToolJsonLd from "@/components/ToolJsonLd";
import { getIntentMatchedLinks } from "@/lib/intentLinks";
import { siteConfig } from "@/lib/site";
import { getRelatedTools, getToolBySlug, tools } from "@/lib/tools";
import { getUseCasesByTool } from "@/lib/useCases";

const GeneratorForm = dynamic(() => import("@/components/GeneratorForm"), {
  ssr: false,
  loading: () => (
    <div className="card p-5 text-sm text-slate-600">Loading generator interface...</div>
  ),
});

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "This AI tool could not be found.",
    };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `/tools/${tool.slug}`,
    },
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const toolUseCases = getUseCasesByTool(tool.slug, 12);
  const intentLinks = getIntentMatchedLinks({
    query: `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`,
    excludeHrefs: [`/tools/${tool.slug}`],
    limit: 8,
  });

  return (
    <div className="space-y-6">
      <ToolJsonLd tool={tool} />
      <FaqJsonLd title={`${tool.title} FAQs`} slugPath={`/tools/${tool.slug}`} items={tool.faqs} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: tool.title, href: `/tools/${tool.slug}` },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">{tool.title}</h1>
        <p className="mt-3 text-slate-600">{tool.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <GeneratorForm
        toolTitle={tool.title}
        starterPrompts={tool.useCases.map((useCase) => `${tool.title} for ${useCase.toLowerCase()}`)}
      />

      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">How to get better results</h2>
        <ol className="mt-3 space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            1. Start with a specific niche and audience instead of broad topics.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            2. Include one clear outcome (clicks, sales, watch time, signups).
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            3. Generate multiple rounds and combine your top-performing ideas.
          </li>
        </ol>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Who this is for</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {tool.whoFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Common mistakes</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {tool.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Best Use Cases</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {tool.useCases.map((useCase) => (
            <li key={useCase} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Examples you can copy</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use these as starting points, then generate variations with your exact topic for better performance.
            </p>
          </div>
          <Link
            href={`/tools/${tool.slug}#topic`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            Generate more →
          </Link>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {tool.examples.map((example) => (
            <li key={example} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {example}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`${tool.title} Banner`} adSlotId={siteConfig.ads.toolDetail} />
        <AffiliateBlock title={`${tool.title} - Partner Offer`} />
      </div>

      <FAQSection title={`${tool.title} FAQs`} items={tool.faqs} />

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Related AI Tools</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {getRelatedTools(tool.slug).map((related) => (
            <Link
              key={related.slug}
              href={`/tools/${related.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {related.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Long-Tail Use Cases</h2>
        <p className="mt-2 text-sm text-slate-600">
          These pages target specific search intents and industries for this tool.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {toolUseCases.map((page) => (
            <Link
              key={page.slug}
              href={`/use-cases/${page.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {page.audienceName}
            </Link>
          ))}
        </div>
      </section>

      <IntentLinkSection title="Intent-Matched Resources" links={intentLinks} />
    </div>
  );
}
