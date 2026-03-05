export type TemplatePage = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  toolSlug: string;
  tips: string[];
};

export const templatePages: TemplatePage[] = [
  {
    slug: "youtube-title-generator-for-gaming",
    title: "YouTube Title Generator for Gaming Videos",
    description: "Generate clickable gaming YouTube titles for walkthroughs, reactions, and challenge videos.",
    keyword: "youtube title generator for gaming",
    toolSlug: "youtube-title-generator",
    tips: [
      "Lead with the game name plus the emotional angle.",
      "Use specific outcomes like wins, fails, or time-based challenges.",
      "Test two title directions: search intent vs curiosity hook.",
    ],
  },
  {
    slug: "tiktok-caption-generator-for-beauty",
    title: "TikTok Caption Generator for Beauty Creators",
    description: "Create high-engagement TikTok captions for makeup tutorials, skincare tips, and GRWM clips.",
    keyword: "tiktok caption generator for beauty",
    toolSlug: "tiktok-caption-generator",
    tips: [
      "Open with a short hook that matches your first shot.",
      "End captions with a simple comment CTA.",
      "Keep captions easy to skim on mobile.",
    ],
  },
  {
    slug: "ai-hook-generator-for-reels",
    title: "AI Hook Generator for Reels and Shorts",
    description: "Write scroll-stopping hooks for Reels, Shorts, and TikTok in seconds.",
    keyword: "ai hook generator for reels",
    toolSlug: "ai-hook-generator",
    tips: [
      "Use curiosity gaps and specific numbers.",
      "Focus one hook on one clear audience pain point.",
      "Record multiple hook variations before filming full content.",
    ],
  },
  {
    slug: "instagram-bio-generator-for-coaches",
    title: "Instagram Bio Generator for Coaches",
    description: "Generate clear, authority-building Instagram bios for business and life coaches.",
    keyword: "instagram bio generator for coaches",
    toolSlug: "instagram-bio-generator",
    tips: [
      "Mention who you help and what outcome you deliver.",
      "Add one line of proof like results or years of experience.",
      "Finish with a direct CTA to DM or book a call.",
    ],
  },
  {
    slug: "ad-headline-generator-for-facebook-ads",
    title: "Ad Headline Generator for Facebook Ads",
    description: "Generate conversion-focused headline ideas for Meta campaigns and ad creatives.",
    keyword: "ad headline generator for facebook ads",
    toolSlug: "ad-headline-generator",
    tips: [
      "Highlight one core benefit per headline.",
      "Use audience language from comments and reviews.",
      "Test urgency vs curiosity headline angles weekly.",
    ],
  },
  {
    slug: "blog-title-generator-for-seo",
    title: "Blog Title Generator for SEO Content",
    description: "Create SEO-friendly blog title ideas designed for higher CTR and search intent match.",
    keyword: "blog title generator for seo",
    toolSlug: "blog-title-generator",
    tips: [
      "Include the target keyword close to the beginning.",
      "Promise a specific result or framework.",
      "Avoid vague titles without audience context.",
    ],
  },
  {
    slug: "product-description-generator-for-shopify",
    title: "Product Description Generator for Shopify",
    description: "Write persuasive product descriptions optimized for ecommerce conversion.",
    keyword: "product description generator for shopify",
    toolSlug: "product-description-generator",
    tips: [
      "Translate features into practical buyer benefits.",
      "Handle one objection in each description variant.",
      "Use concise paragraphs and clear bullet points.",
    ],
  },
  {
    slug: "brand-name-generator-for-startups",
    title: "Brand Name Generator for Startups",
    description: "Generate modern startup name ideas for SaaS, ecommerce, and creator businesses.",
    keyword: "brand name generator for startups",
    toolSlug: "brand-name-generator",
    tips: [
      "Keep names easy to pronounce and spell.",
      "Check for naming collisions before finalizing.",
      "Prioritize names that fit long-term brand positioning.",
    ],
  },
  {
    slug: "slogan-generator-for-fashion-brands",
    title: "Slogan Generator for Fashion Brands",
    description: "Generate memorable slogan ideas for fashion, lifestyle, and beauty brands.",
    keyword: "slogan generator for fashion brands",
    toolSlug: "slogan-generator",
    tips: [
      "Aim for short and rhythmic phrasing.",
      "Focus on a clear emotional brand promise.",
      "Test recall by asking users to repeat slogans after one read.",
    ],
  },
  {
    slug: "call-to-action-generator-for-landing-pages",
    title: "Call To Action Generator for Landing Pages",
    description: "Create high-converting CTA copy for lead-gen pages, sales pages, and offers.",
    keyword: "call to action generator for landing pages",
    toolSlug: "call-to-action-generator",
    tips: [
      "Pair action verbs with concrete value outcomes.",
      "Keep CTA text specific and low-friction.",
      "Repeat CTA near proof and pricing sections.",
    ],
  },
];

export function getTemplateBySlug(slug: string) {
  return templatePages.find((page) => page.slug === slug);
}
