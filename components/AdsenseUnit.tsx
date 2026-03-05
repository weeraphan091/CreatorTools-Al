"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdsenseUnitProps = {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
};

export default function AdsenseUnit({
  adSlot,
  adFormat = "auto",
  className,
}: AdsenseUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore ad script race conditions in dev.
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle block w-full overflow-hidden rounded-xl ${className ?? ""}`}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}
