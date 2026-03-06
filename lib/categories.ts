export type CategoryId = "tiktok" | "youtube" | "instagram" | "ecommerce" | "business-writing" | "seo-marketing";

export type Category = {
  id: CategoryId;
  label: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
};

export const categories: Category[] = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "/tiktok",
    seoTitle: "Best AI Tools for TikTok Growth",
    seoDescription:
      "Discover ViralHookLab tools for TikTok hooks, scripts, captions, and CTAs—built to improve watch time, comments, and saves.",
    intro:
      "TikTok rewards retention and fast pattern interrupts—your first line and first two seconds matter more than anything. ViralHookLab helps you generate scroll-stopping hooks, caption lines that drive comments, and script starters you can batch for consistent posting. Use these tools to test multiple angles quickly: curiosity, proof, contrarian takes, and outcome-based openers. For best results, generate 10 variations, select the top 3 by clarity and novelty, then test them across similar visuals for 24–72 hours. Save your winners, reuse them across Reels and Shorts, and iterate weekly to compound results.",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "/youtube",
    seoTitle: "Best AI Tools for YouTube CTR & Growth",
    seoDescription:
      "Use ViralHookLab to generate YouTube titles, faceless channel ideas, and hook angles designed to improve CTR and discovery.",
    intro:
      "YouTube growth is a packaging game: titles, thumbnails, and the opening promise determine clicks and retention. ViralHookLab helps you generate high-CTR title angles, hook lines that match search intent, and faceless channel ideas with repeatable formats. Use these tools to create a weekly testing loop—generate variants, publish, then compare CTR and retention in YouTube Analytics. Keep what works, refresh what doesn’t, and build a library of proven angles you can reuse across new topics and series. The faster you test, the faster your channel compounds.",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "/instagram",
    seoTitle: "Best AI Tools for Instagram Reels & Profiles",
    seoDescription:
      "Generate Instagram Reels scripts, profile bios, and hook-driven content ideas with ViralHookLab—built for saves, shares, and follows.",
    intro:
      "Instagram growth comes from consistency and clarity: strong hooks, simple structure, and a clear call to action. ViralHookLab helps you generate Reel scripts with a hook-to-CTA flow, plus bios that communicate who you help, what result you deliver, and what to do next. Use these tools to batch content, rotate winners, and avoid repeating the same messaging. For each concept, test multiple hooks, keep the body tight, and end with a save/comment CTA. Over time, your profile conversion and engagement will rise together.",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    href: "/ecommerce",
    seoTitle: "Best AI Tools for E-commerce Copy That Converts",
    seoDescription:
      "Create product descriptions, Amazon listing copy, brand names, and slogans with ViralHookLab—optimized for conversion and clarity.",
    intro:
      "E-commerce copy wins when it makes value obvious fast: benefit-first language, scannable structure, and clear objection handling. ViralHookLab helps you generate product descriptions, Amazon-ready bullets, and brand assets like names and slogans so you can ship faster and test more angles. Use these tools to connect features to benefits, specify outcomes, and reinforce trust. The goal isn’t fancy words—it’s clarity that reduces friction and increases conversion rate. Generate multiple variants per SKU, then test on product pages and ads to find what actually sells.",
  },
  {
    id: "business-writing",
    label: "Business Writing",
    href: "/business-writing",
    seoTitle: "Best AI Tools for Business Writing & Marketing Copy",
    seoDescription:
      "Generate LinkedIn posts, X thread hooks, email subject A/B tests, ad headlines, blog titles, and CTAs with ViralHookLab.",
    intro:
      "Business writing is a distribution lever: the same idea performs wildly differently depending on the hook, structure, and CTA. ViralHookLab helps you generate LinkedIn post drafts, X thread hooks, email subject line A/B variants, and ad headlines designed to improve clicks and replies. Use these tools to test angles quickly—curiosity, proof, benefit, urgency—then keep a swipe file of winners by audience and channel. The compounding advantage comes from speed: ship more tests, measure, and double down on the formats that earn attention.",
  },
  {
    id: "seo-marketing",
    label: "SEO & Marketing",
    href: "/seo-marketing",
    seoTitle: "Best AI Tools for SEO & Marketing",
    seoDescription:
      "Optimize meta descriptions, local SEO, lead magnets, user personas, and Quora answers with ViralHookLab—built for agencies and growth teams.",
    intro:
      "SEO and marketing copy drive discoverability and conversion. ViralHookLab helps you generate meta descriptions at scale, Google Business Profile copy for local visibility, user personas for targeting, lead magnet ideas for list building, and Quora answers tuned for lead generation. Use these tools to align messaging with search intent, improve CTR in SERPs, and qualify audiences before they reach your site. Consistency and clarity win: one strong angle per asset, then test and iterate.",
  },
];

export function getCategoryById(id: CategoryId) {
  return categories.find((category) => category.id === id) ?? null;
}

