import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import AdsenseScript from "@/components/AdsenseScript";
import AdSlot from "@/components/AdSlot";
import WebsiteJsonLd from "@/components/WebsiteJsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "ViralHookLab.com | AI Viral Hook & Content Generators",
    template: "%s | ViralHookLab.com",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ViralHookLab.com | AI Viral Hook & Content Generators",
    description:
      "Generate viral hooks, titles, captions, CTAs, and ad copy fast with AI tools built for creators and marketers.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ViralHookLab.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralHookLab.com | AI Content Generators",
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: ["/twitter-image"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-[var(--ct-sticky-ad-offset,0px)]">
        <WebsiteJsonLd />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <AdsenseScript client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT} />
        <Navbar />
        <main className="container-shell py-8">{children}</main>
        <Footer />
        <AdSlot
          variant="sticky"
          label="Mobile Sticky Footer"
          slotId={siteConfig.ads.mobileStickyFooter}
          className="md:hidden"
          dismissible
          dismissKey="mobile_sticky_footer"
        />
      </body>
    </html>
  );
}
