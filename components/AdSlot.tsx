"use client";

import { useEffect, useMemo, useState } from "react";
import AdsenseUnit from "@/components/AdsenseUnit";

type AdSlotVariant = "hero" | "inline" | "sticky";

type AdSlotProps = {
  slotId?: string;
  label?: string;
  variant?: AdSlotVariant;
  className?: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  dismissible?: boolean;
  dismissKey?: string;
};

const variantStyles: Record<AdSlotVariant, { wrapper: string; unit: string }> = {
  hero: {
    wrapper: "rounded-2xl border border-slate-200 bg-white/60 p-4 backdrop-blur",
    unit: "min-h-[90px] sm:min-h-[120px]",
  },
  inline: {
    wrapper: "rounded-2xl border border-slate-200 bg-white p-4",
    unit: "min-h-[90px] sm:min-h-[120px]",
  },
  sticky: {
    wrapper:
      "fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur supports-[padding:max(0px)]:pb-[env(safe-area-inset-bottom)]",
    unit: "min-h-[60px]",
  },
};

export default function AdSlot({
  slotId,
  label = "Ad slot",
  variant = "inline",
  className,
  adFormat = "auto",
  dismissible = false,
  dismissKey,
}: AdSlotProps) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const hasRealAdConfig = Boolean(adsenseClient && slotId);

  const styles = variantStyles[variant];
  const ariaLabel = label ? `Advertisement - ${label}` : "Advertisement";

  const storageKey = useMemo(() => {
    if (!dismissKey) {
      return null;
    }
    return `ct_ads_dismiss_${dismissKey}`;
  }, [dismissKey]);

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!storageKey) {
      return;
    }
    try {
      const stored = window.localStorage.getItem(storageKey);
      setDismissed(stored === "1");
    } catch {
      // Ignore storage access issues.
    }
  }, [storageKey]);

  useEffect(() => {
    if (variant !== "sticky") {
      return;
    }

    if (!hasRealAdConfig || (dismissible && dismissed)) {
      document.documentElement.style.removeProperty("--ct-sticky-ad-offset");
      return;
    }

    document.documentElement.style.setProperty("--ct-sticky-ad-offset", "96px");
    return () => {
      document.documentElement.style.removeProperty("--ct-sticky-ad-offset");
    };
  }, [dismissed, dismissible, hasRealAdConfig, variant]);

  if (!hasRealAdConfig) {
    return null;
  }

  if (variant === "sticky" && dismissible && dismissed) {
    return null;
  }

  return (
    <aside aria-label={ariaLabel} className={`${styles.wrapper} ${className ?? ""}`}>
      {variant === "sticky" ? (
        <div className="container-shell relative py-2">
          {dismissible ? (
            <button
              type="button"
              aria-label="Close ad"
              onClick={() => {
                setDismissed(true);
                if (storageKey) {
                  try {
                    window.localStorage.setItem(storageKey, "1");
                  } catch {
                    // Ignore storage write issues.
                  }
                }
              }}
              className="absolute right-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50"
            >
              <span aria-hidden>×</span>
            </button>
          ) : null}
          <AdsenseUnit adSlot={slotId as string} adFormat={adFormat} className={styles.unit} />
        </div>
      ) : (
        <AdsenseUnit adSlot={slotId as string} adFormat={adFormat} className={styles.unit} />
      )}
    </aside>
  );
}

