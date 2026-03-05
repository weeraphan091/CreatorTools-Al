export type KeywordCluster = {
  pillar: string;
  intent: "informational" | "commercial" | "transactional";
  primaryKeyword: string;
  secondaryKeywords: string[];
  targetHref: string;
};

export const keywordClusters: KeywordCluster[] = [
  {
    pillar: "YouTube Growth",
    intent: "transactional",
    primaryKeyword: "youtube title generator",
    secondaryKeywords: ["youtube title ideas", "viral youtube titles", "youtube seo title generator"],
    targetHref: "/tools/youtube-title-generator",
  },
  {
    pillar: "TikTok Growth",
    intent: "transactional",
    primaryKeyword: "tiktok caption generator",
    secondaryKeywords: ["tiktok caption ideas", "viral tiktok captions", "caption generator for tiktok"],
    targetHref: "/tools/tiktok-caption-generator",
  },
  {
    pillar: "Hooks & Openers",
    intent: "transactional",
    primaryKeyword: "ai hook generator",
    secondaryKeywords: ["viral hook generator", "marketing hooks", "hook ideas for reels"],
    targetHref: "/tools/ai-hook-generator",
  },
  {
    pillar: "Instagram Profile SEO",
    intent: "transactional",
    primaryKeyword: "instagram bio generator",
    secondaryKeywords: ["instagram bio ideas", "bio for creators", "professional instagram bio"],
    targetHref: "/tools/instagram-bio-generator",
  },
  {
    pillar: "Paid Ads Copy",
    intent: "transactional",
    primaryKeyword: "ad headline generator",
    secondaryKeywords: ["google ad headline ideas", "facebook ad headline generator", "high ctr ad headlines"],
    targetHref: "/tools/ad-headline-generator",
  },
  {
    pillar: "Blog SEO",
    intent: "commercial",
    primaryKeyword: "blog title generator",
    secondaryKeywords: ["seo blog title ideas", "blog headline generator", "title ideas for blog posts"],
    targetHref: "/tools/blog-title-generator",
  },
  {
    pillar: "Ecommerce Copy",
    intent: "commercial",
    primaryKeyword: "product description generator",
    secondaryKeywords: ["shopify product description ai", "product copy generator", "ecommerce description writer"],
    targetHref: "/tools/product-description-generator",
  },
  {
    pillar: "Brand Positioning",
    intent: "commercial",
    primaryKeyword: "brand name generator",
    secondaryKeywords: ["business name ideas", "startup name generator", "brand naming tool"],
    targetHref: "/tools/brand-name-generator",
  },
  {
    pillar: "Messaging Strategy",
    intent: "commercial",
    primaryKeyword: "slogan generator",
    secondaryKeywords: ["tagline generator", "brand slogan ideas", "catchy slogan creator"],
    targetHref: "/tools/slogan-generator",
  },
  {
    pillar: "Conversion Optimization",
    intent: "transactional",
    primaryKeyword: "call to action generator",
    secondaryKeywords: ["cta copy generator", "high converting cta examples", "landing page cta ideas"],
    targetHref: "/tools/call-to-action-generator",
  },
  {
    pillar: "Programmatic SEO",
    intent: "informational",
    primaryKeyword: "programmatic seo for ai tools",
    secondaryKeywords: ["ai seo strategy", "programmatic landing pages", "seo for generators"],
    targetHref: "/blog/programmatic-seo-for-ai-websites",
  },
  {
    pillar: "Intent Landing Pages",
    intent: "commercial",
    primaryKeyword: "youtube title generator for gaming",
    secondaryKeywords: ["tiktok caption generator for beauty", "ai hook generator for reels", "instagram bio generator for coaches"],
    targetHref: "/templates",
  },
];
