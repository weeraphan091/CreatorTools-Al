export const siteConfig = {
  name: "CreatorTools AI",
  description:
    "Free AI generators for YouTube titles, TikTok captions, hooks, bios, ad copy, and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://creatortools-ai.vercel.app",
  locale: "en_US",
  creator: "CreatorTools AI",
  twitterHandle: "@creatortoolsai",
  keywords: [
    "youtube title generator",
    "tiktok caption generator",
    "ai hook generator",
    "instagram bio generator",
    "ad headline generator",
    "blog title generator",
    "product description generator",
    "brand name generator",
    "slogan generator",
    "call to action generator",
  ],
  ads: {
    homepageHero: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_HERO || "",
    toolsListing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_LIST || "",
    toolDetail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_DETAIL || "",
    toolGenerateCta: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_GENERATE_CTA || "",
    blogIndex: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_LIST || "",
    blogPost: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_POST || "",
    templatesIndex: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TEMPLATES_LIST || "",
    templateDetail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TEMPLATE_DETAIL || "",
    useCasesIndex: process.env.NEXT_PUBLIC_ADSENSE_SLOT_USE_CASES_LIST || "",
    useCaseDetail: process.env.NEXT_PUBLIC_ADSENSE_SLOT_USE_CASE_DETAIL || "",
    about: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ABOUT || "",
    mobileStickyFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_STICKY_FOOTER || "",
  },
};

export function absoluteUrl(pathname: string) {
  return `${siteConfig.url}${pathname}`;
}
