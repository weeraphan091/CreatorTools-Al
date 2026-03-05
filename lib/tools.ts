export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
};

export const tools: ToolConfig[] = [
  {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate viral, click-worthy YouTube titles in seconds.",
    seoTitle: "Free AI YouTube Title Generator",
    seoDescription: "Generate viral YouTube titles instantly using AI.",
  },
  {
    slug: "tiktok-caption-generator",
    title: "TikTok Caption Generator",
    description: "Write engaging TikTok captions optimized for reach.",
    seoTitle: "Free AI TikTok Caption Generator",
    seoDescription: "Create scroll-stopping TikTok captions with AI.",
  },
  {
    slug: "ai-hook-generator",
    title: "AI Hook Generator",
    description: "Craft attention-grabbing hooks for social and ads.",
    seoTitle: "Free AI Hook Generator",
    seoDescription: "Generate high-converting marketing hooks with AI.",
  },
  {
    slug: "instagram-bio-generator",
    title: "Instagram Bio Generator",
    description: "Build memorable Instagram bios for personal brands.",
    seoTitle: "Free AI Instagram Bio Generator",
    seoDescription: "Create professional Instagram bios in one click.",
  },
  {
    slug: "ad-headline-generator",
    title: "Ad Headline Generator",
    description: "Generate persuasive ad headlines for paid campaigns.",
    seoTitle: "Free AI Ad Headline Generator",
    seoDescription: "Write high-CTR ad headlines instantly using AI.",
  },
  {
    slug: "blog-title-generator",
    title: "Blog Title Generator",
    description: "Get SEO-friendly blog title ideas for any niche.",
    seoTitle: "Free AI Blog Title Generator",
    seoDescription: "Generate blog title ideas that improve clicks and SEO.",
  },
  {
    slug: "product-description-generator",
    title: "Product Description Generator",
    description: "Create compelling product copy that sells faster.",
    seoTitle: "Free AI Product Description Generator",
    seoDescription: "Write product descriptions that increase conversions.",
  },
  {
    slug: "brand-name-generator",
    title: "Brand Name Generator",
    description: "Discover unique and memorable brand name ideas.",
    seoTitle: "Free AI Brand Name Generator",
    seoDescription: "Generate creative brand names for your business.",
  },
  {
    slug: "slogan-generator",
    title: "Slogan Generator",
    description: "Produce catchy slogans for products and campaigns.",
    seoTitle: "Free AI Slogan Generator",
    seoDescription: "Create catchy slogans that stick in your audience's mind.",
  },
  {
    slug: "call-to-action-generator",
    title: "Call To Action Generator",
    description: "Generate strong CTAs to improve clicks and conversions.",
    seoTitle: "Free AI Call To Action Generator",
    seoDescription: "Create high-converting call-to-action copy using AI.",
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
