import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import IntentLinkSection from "@/components/IntentLinkSection";
import { getIntentMatchedLinks } from "@/lib/intentLinks";
import { siteConfig } from "@/lib/site";
import { getIndexableUseCasePages, getUseCaseBySlug, getUseCasesByTool } from "@/lib/useCases";

type UseCaseDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getIndexableUseCasePages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: UseCaseDetailPageProps): Promise<Metadata> {
  const page = getUseCaseBySlug(params.slug);

  if (!page) {
    return {
      title: "Use Case Not Found",
      description: "This use-case page could not be found.",
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [page.searchTerm, `${page.toolTitle} for ${page.audienceName}`],
    robots: {
      index: page.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/use-cases/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/use-cases/${page.slug}`,
    },
  };
}

export default function UseCaseDetailPage({ params }: UseCaseDetailPageProps) {
  const page = getUseCaseBySlug(params.slug);

  if (!page) {
    notFound();
  }

  if (!page.indexable) {
    notFound();
  }

  const relatedForTool = getUseCasesByTool(page.toolSlug, 8).filter((item) => item.slug !== page.slug);
  const intentLinks = getIntentMatchedLinks({
    query: `${page.title} ${page.searchTerm} ${page.description}`,
    excludeHrefs: [`/use-cases/${page.slug}`],
    limit: 8,
  });

  return (
    <article className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Use Cases", href: "/use-cases" },
          { label: page.title, href: `/use-cases/${page.slug}` },
        ]}
      />
      <header className="card p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.searchTerm}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600">{page.intro}</p>
        <Link
          href={`/tools/${page.toolSlug}`}
          className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Use {page.toolTitle}
        </Link>
      </header>

      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Optimization Playbook</h2>
        <ul className="mt-4 space-y-2">
          {page.tips.map((tip) => (
            <li key={tip} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Prompt Template for This Use Case</h2>
        <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-700">
          {page.promptTemplate}
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`${page.title} Banner`} adSlotId={siteConfig.ads.useCaseDetail} />
        <AffiliateBlock title={`${page.audienceName} Growth Stack`} />
      </div>

      <FAQSection title={`${page.toolTitle} for ${page.audienceName} FAQ`} items={page.faqs} />

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Related Use Cases</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {relatedForTool.map((related) => (
            <Link
              key={related.slug}
              href={`/use-cases/${related.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              {related.audienceName}
            </Link>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Quality Signals</h2>
        <p className="mt-2 text-sm text-slate-600">
          Quality score: <span className="font-semibold text-slate-900">{page.qualityScore}</span> ·
          {page.indexable ? (
            <span className="font-semibold text-emerald-700"> indexable</span>
          ) : (
            <span className="font-semibold text-amber-700"> noindex (quality filter)</span>
          )}
        </p>
      </section>

      <IntentLinkSection title="More Resources for This Intent" links={intentLinks} />
    </article>
  );
}
