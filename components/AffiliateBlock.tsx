type AffiliateBlockProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  href?: string;
};

export default function AffiliateBlock({
  title = "Recommended Creator Tool",
  description = "Explore our recommended partner solution for creators and marketers.",
  ctaText = "Learn More",
  href = "/blog",
}: AffiliateBlockProps) {
  return (
    <aside className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Partner Recommendation</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <a
        href={href}
        className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        {ctaText}
      </a>
    </aside>
  );
}
