export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  useCases: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const tools: ToolConfig[] = [
  {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate viral, click-worthy YouTube titles in seconds.",
    seoTitle: "YouTube Title Generator (Free) - 5 Viral Ideas Fast",
    seoDescription:
      "Generate 5 high-CTR YouTube titles in seconds. Free AI tool for creators, channels, and marketers.",
    keywords: ["youtube title generator", "youtube seo title ideas", "viral youtube titles"],
    useCases: ["Gaming videos", "Tutorial channels", "Product reviews"],
    faqs: [
      {
        question: "How do I write a high-CTR YouTube title?",
        answer:
          "Use a specific outcome, one emotional trigger, and a clear audience cue. Test at least two variants and monitor click-through rate in YouTube Analytics.",
      },
      {
        question: "Can this tool help with YouTube SEO?",
        answer:
          "Yes. Start with your target keyword and the generator returns titles that combine search intent with curiosity to improve discoverability.",
      },
    ],
  },
  {
    slug: "tiktok-caption-generator",
    title: "TikTok Caption Generator",
    description: "Write engaging TikTok captions optimized for reach.",
    seoTitle: "TikTok Caption Generator (Free) - Viral Caption Ideas",
    seoDescription:
      "Create 5 scroll-stopping TikTok captions instantly. Free AI caption tool to boost comments, saves, and reach.",
    keywords: ["tiktok caption generator", "tiktok caption ideas", "viral tiktok captions"],
    useCases: ["Short-form education", "Lifestyle creators", "Product showcase clips"],
    faqs: [
      {
        question: "What makes a TikTok caption perform better?",
        answer:
          "Short hooks, clear context, and comment-driving prompts generally perform best. Add relevant hashtags after the main message.",
      },
      {
        question: "How long should a TikTok caption be?",
        answer:
          "Keep it concise and easy to scan. Lead with a compelling first line, then add a quick CTA like 'save this' or 'comment yes'.",
      },
    ],
  },
  {
    slug: "ai-hook-generator",
    title: "AI Hook Generator",
    description: "Craft attention-grabbing hooks for social and ads.",
    seoTitle: "AI Hook Generator (Free) - 5 High-Converting Hooks",
    seoDescription:
      "Generate 5 proven hook ideas for Reels, Shorts, TikTok, and ads. Free AI hook generator built for conversion.",
    keywords: ["ai hook generator", "marketing hook ideas", "viral hook generator"],
    useCases: ["Short-form videos", "Ad creative testing", "Email subject angles"],
    faqs: [
      {
        question: "What is a marketing hook?",
        answer:
          "A hook is the first line that grabs attention and creates curiosity. Strong hooks make people stop scrolling and keep reading or watching.",
      },
      {
        question: "How many hooks should I test per campaign?",
        answer:
          "Test at least five hooks per concept. Keep the core offer the same and vary only opening angles to identify top performers quickly.",
      },
    ],
  },
  {
    slug: "instagram-bio-generator",
    title: "Instagram Bio Generator",
    description: "Build memorable Instagram bios for personal brands.",
    seoTitle: "Instagram Bio Generator (Free) - Better Bio in Seconds",
    seoDescription:
      "Create 5 professional Instagram bio options instantly. Free AI bio generator for creators, coaches, and brands.",
    keywords: ["instagram bio generator", "instagram bio ideas", "bio for creators"],
    useCases: ["Creator profiles", "Coaches", "Small business accounts"],
    faqs: [
      {
        question: "What should an Instagram bio include?",
        answer:
          "A clear identity statement, a benefit you provide, and one action to take next. Keep it easy to understand in under five seconds.",
      },
      {
        question: "Can I use emojis in my Instagram bio?",
        answer:
          "Yes. Emojis can improve readability when used sparingly. Use them to structure lines, not to replace key words.",
      },
    ],
  },
  {
    slug: "ad-headline-generator",
    title: "Ad Headline Generator",
    description: "Generate persuasive ad headlines for paid campaigns.",
    seoTitle: "Ad Headline Generator (Free) - Boost CTR Fast",
    seoDescription:
      "Generate 5 click-worthy ad headline ideas for Meta and Google ads. Free AI tool for higher CTR campaigns.",
    keywords: ["ad headline generator", "facebook ad headline ideas", "google ads headlines"],
    useCases: ["Meta ads", "Google ads", "Landing page hero copy"],
    faqs: [
      {
        question: "How do I improve ad headline CTR?",
        answer:
          "Lead with the biggest value proposition, include a concrete benefit, and test urgency vs curiosity angles with equal spend.",
      },
      {
        question: "Should ad headlines be short or long?",
        answer:
          "Start short and specific. For high-intent audiences, slightly longer headlines with proof often convert better.",
      },
    ],
  },
  {
    slug: "blog-title-generator",
    title: "Blog Title Generator",
    description: "Get SEO-friendly blog title ideas for any niche.",
    seoTitle: "Blog Title Generator (Free) - SEO Title Ideas",
    seoDescription:
      "Generate 5 SEO-friendly blog titles with high click potential. Free AI blog headline tool for better organic CTR.",
    keywords: ["blog title generator", "seo blog title ideas", "article headline generator"],
    useCases: ["Affiliate blogs", "SaaS content", "Niche authority sites"],
    faqs: [
      {
        question: "How can blog titles rank better on Google?",
        answer:
          "Match exact search intent, include primary keywords naturally, and communicate a clear outcome users will get from reading.",
      },
      {
        question: "How many title options should I test?",
        answer:
          "Prepare five to ten options, then pick the one that balances SEO intent and click appeal.",
      },
    ],
  },
  {
    slug: "product-description-generator",
    title: "Product Description Generator",
    description: "Create compelling product copy that sells faster.",
    seoTitle: "Product Description Generator (Free) - Convert More",
    seoDescription:
      "Write 5 persuasive product descriptions in seconds. Free AI copy tool for ecommerce, Shopify, and DTC stores.",
    keywords: ["product description generator", "ecommerce product copy", "shopify description ai"],
    useCases: ["Shopify product pages", "Amazon listings", "DTC landing pages"],
    faqs: [
      {
        question: "What makes product descriptions convert?",
        answer:
          "Strong descriptions connect features to benefits, handle objections, and end with a specific purchase CTA.",
      },
      {
        question: "Can I use this for multiple products?",
        answer:
          "Yes. Enter each product angle separately to generate targeted descriptions for different audiences or campaigns.",
      },
    ],
  },
  {
    slug: "brand-name-generator",
    title: "Brand Name Generator",
    description: "Discover unique and memorable brand name ideas.",
    seoTitle: "Brand Name Generator (Free) - 5 Name Ideas Instantly",
    seoDescription:
      "Generate creative, memorable brand names for startups and ecommerce. Free AI naming tool with fast ideas.",
    keywords: ["brand name generator", "business name ideas", "startup name generator"],
    useCases: ["Startup naming", "Ecommerce brands", "Agency rebrands"],
    faqs: [
      {
        question: "How do I choose a good brand name?",
        answer:
          "Pick names that are easy to pronounce, memorable, and aligned with your category positioning. Short names are easier to remember.",
      },
      {
        question: "Should the brand name include a keyword?",
        answer:
          "Not always. Keyword names can aid clarity, but unique names often perform better for long-term brand identity.",
      },
    ],
  },
  {
    slug: "slogan-generator",
    title: "Slogan Generator",
    description: "Produce catchy slogans for products and campaigns.",
    seoTitle: "Slogan Generator (Free) - Catchy Taglines in Seconds",
    seoDescription:
      "Generate 5 catchy slogan ideas for products, campaigns, and brands. Free AI slogan tool built for recall.",
    keywords: ["slogan generator", "tagline generator", "brand slogan ideas"],
    useCases: ["Brand campaigns", "Product launches", "Homepage hero messaging"],
    faqs: [
      {
        question: "What is a strong slogan formula?",
        answer:
          "Use short language, a clear promise, and a distinct brand tone. Good slogans are easy to repeat and hard to forget.",
      },
      {
        question: "How many slogan ideas should I shortlist?",
        answer:
          "Start with five options, test with your audience, then keep one primary slogan and two alternates.",
      },
    ],
  },
  {
    slug: "call-to-action-generator",
    title: "Call To Action Generator",
    description: "Generate strong CTAs to improve clicks and conversions.",
    seoTitle: "Call To Action Generator (Free) - High-Converting CTA",
    seoDescription:
      "Create 5 high-converting CTA ideas for landing pages, email, and ads. Free AI call-to-action generator.",
    keywords: ["call to action generator", "cta copy generator", "high converting cta"],
    useCases: ["Landing pages", "Email campaigns", "Social content CTAs"],
    faqs: [
      {
        question: "What words increase CTA conversion?",
        answer:
          "Action verbs + specific outcomes convert best, such as 'Get the template', 'Start free today', or 'See pricing now'.",
      },
      {
        question: "Where should I place CTAs?",
        answer:
          "Place primary CTAs above the fold and repeat at decision points like after benefits, proof, and pricing sections.",
      },
    ],
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string) {
  return tools.filter((tool) => tool.slug !== slug).slice(0, 3);
}
