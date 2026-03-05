"use client";

import Script from "next/script";

type AdsenseScriptProps = {
  client?: string;
};

export default function AdsenseScript({ client }: AdsenseScriptProps) {
  if (!client) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
