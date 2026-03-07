import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site";
import { getIndexableUseCasePages, getUseCaseStats } from "@/lib/useCases";
import { tools } from "@/lib/tools";

const PER_PAGE = 50;

type UseCasesPageProps = {
  searchParams?: { page?: string };
};

export async function generateMetadata({ searchParams }: UseCasesPageProps): Promise<Metadata> {
  const indexable = getIndexableUseCasePages();
  const totalPages = Math.max(1, Math.ceil(indexable.length / PER_PAGE));
  const pageNum = Math.max(1, parseInt(String(searchParams?.page), 10) || 1);
  const currentPage = Math.min(pageNum, totalPages);

  const title =
    currentPage === 1 ? "AI Tool Use Cases" : `AI Tool Use Cases | Page ${currentPage}`;
  const canonical =
    currentPage === 1 ? "/use-cases" : `/use-cases?page=${currentPage}`;
  const prev =
    currentPage > 1 ? `/use-cases${currentPage === 2 ? "" : `?page=${currentPage - 1}`}` : undefined;
  const next =
    currentPage < totalPages ? `/use-cases?page=${currentPage + 1}` : undefined;

  return {
    title,
    description:
      "Explore long-tail AI generator use cases by niche and industry. Find pages for creators, ecommerce, SaaS, agencies, and more.",
    alternates: {
      canonical,
      ...(prev && { prev }),
      ...(next && { next }),
    },
    openGraph: {
      title: currentPage === 1 ? "AI Tool Use Cases | ViralHookLab.com" : `AI Tool Use Cases | Page ${currentPage} | ViralHookLab.com`,
      description:
        "Find use-case pages for YouTube titles, TikTok captions, hooks, bios, ad copy, and conversion-focused CTAs.",
      url: canonical,
    },
  };
}

export default function UseCasesPage({ searchParams }: UseCasesPageProps) {
  const indexable = getIndexableUseCasePages();
  const useCaseStats = getUseCaseStats();
  const totalPages = Math.max(1, Math.ceil(indexable.length / PER_PAGE));
  const pageNum = Math.max(1, parseInt(String(searchParams?.page), 10) || 1);
  const currentPage = Math.min(pageNum, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const paginatedPages = indexable.slice(start, start + PER_PAGE);
  const previewPages = paginatedPages.slice(0, 12);

  const countsByTool = indexable.reduce<Record<string, number>>((acc, page) => {
    acc[page.toolSlug] = (acc[page.toolSlug] ?? 0) + 1;
    return acc;
  }, {});

  const paginationStart = Math.max(1, currentPage - 2);
  const paginationEnd = Math.min(totalPages, currentPage + 2);
  const pageNumbers: number[] = [];
  for (let i = paginationStart; i <= paginationEnd; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Use Cases", href: "/use-cases" },
        ]}
      />
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">Programmatic SEO Use Cases</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Browse long-tail pages built around high-intent combinations of tools and audiences. These pages are
          designed to match specific search queries and direct users to the right generator.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Total pages: <span className="font-semibold text-slate-700">{useCaseStats.total}</span> · Indexed:
          <span className="font-semibold text-emerald-700"> {useCaseStats.indexable}</span> · Noindex quality filter:
          <span className="font-semibold text-amber-700"> {useCaseStats.noindex}</span>
        </p>
      </section>

      <AdBanner slot="Use Cases Listing Banner" adSlotId={siteConfig.ads.useCasesIndex} />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">How to use these pages</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use-case pages are intent-specific landing pages. They help you match the right generator to the right
            audience, then turn that into content you can publish or test in campaigns.
          </p>
          <ol className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              1. Pick a page that matches your audience and goal.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              2. Click through to the tool and generate variants.
            </li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              3. Test the top 3 performers, then iterate weekly.
            </li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Browse tools
            </Link>
            <Link
              href="/templates"
              className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Browse templates
            </Link>
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Browse by tool</h2>
          <p className="mt-2 text-sm text-slate-600">Jump into a generator, then explore matching audiences.</p>
          <div className="mt-4 space-y-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
              >
                <span>{tool.title}</span>
                <span className="text-xs font-semibold text-slate-500">
                  {countsByTool[tool.slug] ?? 0}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-slate-900">All indexable use-case pages</h2>
        <p className="mt-2 text-sm text-slate-600">
          This list is intentionally crawl-friendly to help search engines discover long-tail landing pages quickly.
          {totalPages > 1 && (
            <> Showing page {currentPage} of {totalPages}.</>
          )}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedPages.map((page) => (
            <Link
              key={page.slug}
              href={`/use-cases/${page.slug}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 hover:border-brand-500 hover:text-brand-700"
            >
              <span className="block">{page.title}</span>
              <span className="mt-1 block text-xs font-normal text-slate-500">{page.searchTerm}</span>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-6"
            aria-label="Pagination"
          >
            {currentPage > 1 ? (
              <Link
                href={currentPage === 2 ? "/use-cases" : `/use-cases?page=${currentPage - 1}`}
                className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Previous
              </Link>
            ) : (
              <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400">
                Previous
              </span>
            )}
            <div className="flex items-center gap-1">
              {paginationStart > 1 && (
                <>
                  <Link
                    href="/use-cases"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    1
                  </Link>
                  {paginationStart > 2 && <span className="px-1 text-slate-400">…</span>}
                </>
              )}
              {pageNumbers.map((n) =>
                n === currentPage ? (
                  <span
                    key={n}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand-600 bg-brand-50 text-sm font-semibold text-brand-700"
                    aria-current="page"
                  >
                    {n}
                  </span>
                ) : (
                  <Link
                    key={n}
                    href={n === 1 ? "/use-cases" : `/use-cases?page=${n}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {n}
                  </Link>
                )
              )}
              {paginationEnd < totalPages && (
                <>
                  {paginationEnd < totalPages - 1 && <span className="px-1 text-slate-400">…</span>}
                  <Link
                    href={`/use-cases?page=${totalPages}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {totalPages}
                  </Link>
                </>
              )}
            </div>
            {currentPage < totalPages ? (
              <Link
                href={`/use-cases?page=${currentPage + 1}`}
                className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Next
              </Link>
            ) : (
              <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400">
                Next
              </span>
            )}
          </nav>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {previewPages.map((page) => (
          <article key={`${page.slug}-preview`} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{page.searchTerm}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{page.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{page.description}</p>
            <Link
              href={`/use-cases/${page.slug}`}
              className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Open Use Case
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
