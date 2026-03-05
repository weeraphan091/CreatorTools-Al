type AffiliateBlockProps = {
  title?: string;
};

export default function AffiliateBlock({ title = "Recommended Creator Tool" }: AffiliateBlockProps) {
  return (
    <aside className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Affiliate Block Placeholder</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">
        Replace this block with your affiliate offer CTA, product image, and tracking link.
      </p>
      <button className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
        View Offer
      </button>
    </aside>
  );
}
