import AdsenseUnit from "@/components/AdsenseUnit";

type AdBannerProps = {
  slot?: string;
  adSlotId?: string;
};

export default function AdBanner({ slot = "Homepage Top Banner", adSlotId }: AdBannerProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const hasRealAdConfig = Boolean(adsenseClient && adSlotId);

  return (
    <aside className="card border-dashed p-5">
      {hasRealAdConfig ? (
        <AdsenseUnit adSlot={adSlotId as string} />
      ) : (
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Google Adsense Placeholder
          </p>
          <p className="mt-2 text-sm text-slate-700">Ad Slot: {slot}</p>
          <p className="mt-1 text-xs text-slate-500">
            Set NEXT_PUBLIC_ADSENSE_CLIENT and adSlotId to render real ads.
          </p>
        </div>
      )}
    </aside>
  );
}
