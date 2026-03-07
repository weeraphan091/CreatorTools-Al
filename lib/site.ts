/** Max length for the title part before " | ViralHookLab.com" (46 + 24 = 70 total). */
export const META_TITLE_PART_MAX = 46;

/**
 * Truncates a meta title to fit within the layout template (≤70 chars total).
 * Prefers cutting at the last space before max to avoid mid-word truncation.
 */
export function truncateMetaTitle(title: string, max = META_TITLE_PART_MAX): string {
  if (title.length <= max) return title;
  const cut = max - 3;
  const at = title.slice(0, cut + 1).lastIndexOf(" ");
  const end = at > cut * 0.5 ? at : cut;
  return title.slice(0, end).trim() + "...";
}

export const siteConfig = {
  name: "ViralHookLab",
  description:
    "AI-powered viral hook, title, caption, and ad copy generators for creators and marketers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://viralhooklab.com",
  locale: "en_US",
  creator: "ViralHookLab",
  twitterHandle: "@viralhooklab",
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
