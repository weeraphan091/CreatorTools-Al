import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";
import AffiliateBlock from "@/components/AffiliateBlock";
import { getToolBySlug, tools } from "@/lib/tools";

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
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="card p-8">
        <h1 className="text-3xl font-bold text-slate-900">{tool.title}</h1>
        <p className="mt-3 text-slate-600">{tool.description}</p>
      </section>

      <GeneratorForm toolTitle={tool.title} />

      <div className="grid gap-4 lg:grid-cols-2">
        <AdBanner slot={`${tool.title} Banner`} />
        <AffiliateBlock title={`${tool.title} - Partner Offer`} />
      </div>
    </div>
  );
}
