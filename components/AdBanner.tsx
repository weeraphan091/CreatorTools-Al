type AdBannerProps = {
  slot?: string;
};

export default function AdBanner({ slot = "Homepage Top Banner" }: AdBannerProps) {
  return (
    <aside className="card border-dashed p-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Google Adsense Placeholder</p>
      <p className="mt-2 text-sm text-slate-700">Ad Slot: {slot}</p>
    </aside>
  );
}
