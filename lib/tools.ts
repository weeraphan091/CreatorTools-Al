export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  useCases: string[];
  examples: string[];
  whoFor: string[];
  commonMistakes: string[];
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
    examples: [
      "I Tried [X] for 30 Days — Here's What Happened",
      "Stop Doing This If You Want to Grow on YouTube",
      "The 3-Minute Trick That Fixed My [Problem]",
      "[Number] Mistakes Beginners Make in [Topic]",
      "I Tested the Viral Advice… It Actually Worked",
      "Before You Upload, Do This One Thing",
      "How I Got [Outcome] Without [Pain]",
      "This Simple Change Doubled My CTR (Proof)",
      "The Fastest Way to Learn [Skill] (No Fluff)",
      "[Topic] Explained for Absolute Beginners",
    ],
    whoFor: [
      "Creators who want higher click-through rate (CTR)",
      "Channels planning weekly title testing",
      "Marketers repurposing video ideas into search-friendly topics",
    ],
    commonMistakes: [
      "Using vague titles without a clear outcome",
      "Stuffing keywords and losing clarity",
      "Copying competitors without adding specificity or proof",
    ],
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
    examples: [
      "If you’re still doing this in 2026… watch.",
      "This took me 10 minutes and saved me hours.",
      "Here’s the part nobody tells beginners.",
      "Rate this setup 1–10 (be honest).",
      "I wish I knew this sooner.",
      "Comment “template” and I’ll share it.",
      "Save this for later — you’ll need it.",
      "I tried the viral method… results surprised me.",
      "3 tips that instantly improved my results:",
      "Which option would you pick? A or B?",
    ],
    whoFor: [
      "Creators who want more comments and saves",
      "Brands testing short-form hooks + captions",
      "Social media managers batching content",
    ],
    commonMistakes: [
      "Long captions with no hook in the first line",
      "Too many hashtags before the message",
      "No clear CTA (comment/save/follow) at the end",
    ],
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
    examples: [
      "You’re doing [X] wrong — do this instead.",
      "This feels illegal… but it works.",
      "If you only remember one thing, remember this.",
      "The fastest way to get [Outcome] (without [Pain]).",
      "I tested 5 strategies — only 1 worked.",
      "Nobody talks about this because it’s uncomfortable.",
      "I was today years old when I learned this.",
      "Steal my exact script for [Outcome].",
      "Here’s why your [thing] isn’t working.",
      "The counterintuitive tip that changed everything:",
    ],
    whoFor: [
      "Creators who need stronger first 2 seconds",
      "Advertisers testing opening angles at scale",
      "Teams building hook libraries for content batching",
    ],
    commonMistakes: [
      "Starting with context instead of tension/curiosity",
      "Making claims without proof or specificity",
      "Using the same hook style for every audience",
    ],
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
    examples: [
      "Helping [audience] get [result] | DM “START”",
      "[Role] • [Proof] • [Offer] ↓",
      "I teach [topic] in 60s | Free guide below",
      "[Niche] tips + templates | New posts weekly",
      "From [before] → [after] | Get the playbook",
      "⚡️ [Outcome] for [Audience]\n📩 Collabs: support@viralhooklab.com",
      "Simple [topic] for busy people | Subscribe ↓",
      "Build your [thing] without burnout | Follow",
      "Tools + prompts for creators | Try free ↓",
      "Make content that converts | Links below",
    ],
    whoFor: [
      "Personal brands refining positioning fast",
      "Coaches and creators optimizing profile conversion",
      "Businesses needing a clear CTA in bio",
    ],
    commonMistakes: [
      "No clear audience or outcome statement",
      "Multiple competing CTAs",
      "Too much jargon and not enough proof",
    ],
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
    examples: [
      "Get [Outcome] Without [Pain] — Start Today",
      "[Number] Ways to Fix [Problem] Fast",
      "New: The Simple [Tool] for [Audience]",
      "Stop Wasting Money on [Thing] — Do This",
      "Limited: [Offer] for [Audience] This Week",
      "Proven System to Increase [Metric] (Free)",
      "The Shortcut to [Outcome] (No Experience)",
      "Build [Result] in [Timeframe] — Try Free",
      "Finally: A Better Way to [Job-to-be-done]",
      "Get Results in Days, Not Months",
    ],
    whoFor: [
      "Paid media teams testing CTR angles",
      "Founders writing landing page hero variants",
      "Agencies generating headline batches",
    ],
    commonMistakes: [
      "Benefits too generic (no metric/outcome)",
      "Mismatch between headline and landing message",
      "Overusing urgency without credibility",
    ],
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
    examples: [
      "How to [Outcome] in [Time] (Beginner-Friendly)",
      "[Number] Best [Thing] for [Audience] in 2026",
      "[Thing] vs [Thing]: Which Should You Choose?",
      "The Ultimate Guide to [Topic] (with Examples)",
      "What Nobody Tells You About [Topic]",
      "A Simple Framework to Improve [Metric]",
      "The Checklist: [Topic] Before You Start",
      "How I Improved [Metric] by [Number]%",
      "The Common Mistakes That Kill [Outcome]",
      "Best Tools for [Job-to-be-done] (Tested)",
    ],
    whoFor: [
      "SEO writers improving organic CTR",
      "Affiliate site owners targeting commercial keywords",
      "SaaS content teams planning clusters",
    ],
    commonMistakes: [
      "Targeting too broad keywords with weak intent match",
      "Titles that promise outcomes the post doesn’t deliver",
      "Duplicating formats across multiple posts without uniqueness",
    ],
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
    examples: [
      "Meet the [Product]: built for [Audience] who want [Outcome].",
      "Why you’ll love it: [Benefit 1], [Benefit 2], [Benefit 3].",
      "Designed to solve [Pain] without [Downside].",
      "Perfect for: [Use case], [Use case], [Use case].",
      "Feature → Benefit: [Feature] means you get [Benefit].",
      "What’s included: [List].",
      "Care & specs: [Key spec bullets].",
      "FAQ: Will it work for [Scenario]? Yes—because [Reason].",
    ],
    whoFor: [
      "Ecommerce teams improving conversion rate",
      "Shopify owners launching new products fast",
      "Marketers A/B testing product angles",
    ],
    commonMistakes: [
      "Listing features with no benefits",
      "Using generic adjectives instead of specifics",
      "No objection handling (shipping, sizing, trust)",
    ],
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
    examples: [
      "Verb + Benefit: SnapScale, BrightLaunch",
      "Two-word combo: PixelHarbor, NovaCraft",
      "Invented brand: Zenvora, Lumivo",
      "Category twist: HookFoundry, CaptionLab",
      "Geometric/tech: HexaFlow, OrbitPress",
      "Premium feel: VelvetSignal, SilverMetric",
      "Playful: Hookaroo, CaptionPop",
      "Short + punchy: Virlo, Hoolab",
    ],
    whoFor: [
      "Founders naming products and startups",
      "Ecommerce teams launching brands",
      "Agencies doing fast naming sprints",
    ],
    commonMistakes: [
      "Choosing names that are hard to pronounce/spell",
      "Too close to existing competitors",
      "Ignoring domain and social handle availability",
    ],
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
    examples: [
      "Make [Outcome] feel effortless.",
      "Built for [Audience]. Designed for results.",
      "Less [Pain]. More [Benefit].",
      "Your shortcut to [Outcome].",
      "Create smarter. Publish faster.",
      "Turn ideas into momentum.",
      "Simple tools. Serious growth.",
      "Clarity that converts.",
    ],
    whoFor: [
      "Brands refreshing positioning",
      "Landing pages needing punchy heroes",
      "Campaign teams creating variants",
    ],
    commonMistakes: [
      "Too long to remember",
      "Vague promises without differentiation",
      "Sounding like every competitor",
    ],
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
    examples: [
      "Get the free template",
      "Start free today",
      "See pricing now",
      "Generate my hooks",
      "Download the swipe file",
      "Show me examples",
      "Send me the checklist",
      "Try the generator",
      "Book a quick call",
      "Get instant access",
    ],
    whoFor: [
      "Landing pages improving button CTR",
      "Email marketers increasing clicks",
      "Ads teams aligning CTA with intent",
    ],
    commonMistakes: [
      "Using generic CTAs like “Submit”",
      "CTA doesn’t match the page promise",
      "Too many CTAs competing on one screen",
    ],
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
