import AdsenseUnit from "@/components/AdsenseUnit";

type AdBannerProps = {
  slot?: string;
  adSlotId?: string;
};

export default function AdBanner({ slot = "Homepage Top Banner", adSlotId }: AdBannerProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const hasRealAdConfig = Boolean(adsenseClient && adSlotId);

  if (!hasRealAdConfig) {
    return null;
  }

  return (
    <aside className="card border-dashed p-5" aria-label={`Advertisement ${slot}`}>
      <AdsenseUnit adSlot={adSlotId as string} />
    </aside>
  );
}
