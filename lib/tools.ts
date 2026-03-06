import type { CategoryId } from "@/lib/categories";

export type ToolConfig = {
  slug: string;
  categoryId: CategoryId;
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
    categoryId: "youtube",
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
    categoryId: "tiktok",
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
    categoryId: "tiktok",
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
    categoryId: "instagram",
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
    categoryId: "business-writing",
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
    categoryId: "business-writing",
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
    categoryId: "ecommerce",
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
    categoryId: "ecommerce",
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
    categoryId: "business-writing",
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
    categoryId: "business-writing",
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
  {
    slug: "linkedin-viral-post-generator",
    categoryId: "business-writing",
    title: "LinkedIn Viral Post Generator",
    description: "Write high-performing LinkedIn posts for professionals and founders.",
    seoTitle: "LinkedIn Viral Post Generator (Free) - Post Ideas That Get Comments",
    seoDescription:
      "Generate 5 LinkedIn post drafts designed to increase comments, saves, and profile views. Built for professionals, founders, and creators.",
    keywords: ["linkedin post generator", "linkedin viral post", "linkedin content ideas"],
    useCases: ["Founder updates", "Career lessons", "B2B insights"],
    examples: [
      "I used to think [belief]. Then I learned this the hard way:",
      "If you're struggling with [problem], read this:",
      "3 lessons I wish I knew before [milestone]:",
      "Hot take: [contrarian claim]. Here’s why.",
      "What nobody tells you about [topic] in B2B:",
      "The framework I use to get results in [area]:",
      "I went from [before] to [after] by doing this:",
      "Stop doing [common habit]. Do this instead:",
      "Here’s the exact template I use for [outcome]:",
      "One small change that improved my [metric] by [number]%.",
    ],
    whoFor: ["Professionals building a personal brand", "Founders marketing in public", "B2B marketers posting weekly"],
    commonMistakes: [
      "Writing long intros without a strong first line",
      "Sharing opinions without examples or proof",
      "Ending posts without a clear discussion question",
    ],
    faqs: [
      {
        question: "What makes a LinkedIn post go viral?",
        answer:
          "A strong opening line, clear story or framework, and a discussion prompt that invites replies. Consistency and relevance to your audience matter more than gimmicks.",
      },
      {
        question: "How long should LinkedIn posts be?",
        answer:
          "Longer posts can work when they are scannable. Use short lines, whitespace, and one core point per section to keep retention high.",
      },
      {
        question: "What should I ask people to comment?",
        answer:
          "Ask a specific question tied to the post’s main point (e.g., “What would you do in this situation?”) rather than generic prompts like “Thoughts?”.",
      },
    ],
  },
  {
    slug: "x-thread-hook-writer",
    categoryId: "business-writing",
    title: "X (Twitter) Thread Hook Writer",
    description: "Generate thread hooks built for tech and crypto audiences.",
    seoTitle: "X Thread Hook Writer (Free) - Tech & Crypto Hook Ideas",
    seoDescription:
      "Generate 5 thread hook options optimized for tech/crypto timelines. Use proven curiosity and proof frameworks to increase reads and follows.",
    keywords: ["twitter thread hook", "x thread hook", "crypto thread hooks", "tech twitter writing"],
    useCases: ["Tech lessons", "Crypto research threads", "Product launches"],
    examples: [
      "Most people misunderstand [topic]. Here’s the truth:",
      "I spent 100 hours on [thing]. Here’s what I learned:",
      "This simple framework changed how I think about [topic]:",
      "I reviewed [number] projects — these are the winners:",
      "If you’re building in crypto, read this before shipping:",
      "The playbook to go from 0 → 1 in [area]:",
      "A contrarian take on [topic] (with receipts):",
      "Here’s why your [thing] is failing (and how to fix it):",
      "The fastest way to learn [topic] (without fluff):",
      "I made every mistake so you don’t have to. Thread:",
    ],
    whoFor: ["Tech Twitter creators", "Crypto researchers and traders", "Builders launching products in public"],
    commonMistakes: ["Overpromising without delivering proof", "Hooks that are too vague", "No clear payoff per tweet"],
    faqs: [
      {
        question: "What is the best format for an X thread hook?",
        answer:
          "Use a strong claim + specific proof + clear payoff (what the reader will learn). Curiosity works best when paired with credibility.",
      },
      {
        question: "How do I keep readers through the thread?",
        answer:
          "Make each tweet earn the next: short paragraphs, numbered steps, and concrete examples. Avoid long preambles.",
      },
      {
        question: "Should I include a call to action?",
        answer:
          "Yes. End with one clear CTA: follow for more, bookmark, or reply with a question. Keep it aligned with the thread’s topic.",
      },
    ],
  },
  {
    slug: "amazon-product-description-ai",
    categoryId: "ecommerce",
    title: "Amazon Product Description AI",
    description: "Write Amazon-ready product descriptions that convert.",
    seoTitle: "Amazon Product Description AI (Free) - Bullet + Benefit Copy",
    seoDescription:
      "Generate 5 Amazon-style descriptions with clear benefits, scannable bullets, and conversion-focused language for ecommerce sellers.",
    keywords: ["amazon product description", "amazon listing copy", "ecommerce description ai"],
    useCases: ["Amazon FBA listings", "Product relaunches", "A+ content drafts"],
    examples: [
      "✅ Benefit-first headline: Get [Outcome] in [Timeframe]",
      "Bullet: [Feature] → [Benefit] (why it matters)",
      "Perfect for: [Use case] / [Use case] / [Use case]",
      "Built to last: [Material] + [Warranty/quality note]",
      "What you get: [Included items] + quick setup steps",
      "Care instructions: simple, clear, and specific",
      "Trust note: designed for [audience], tested for [scenario]",
    ],
    whoFor: ["Amazon sellers optimizing conversion", "Ecommerce brands launching new SKUs", "Agencies managing listings"],
    commonMistakes: ["Listing features without benefits", "Generic copy that matches competitors", "No objection handling"],
    faqs: [
      {
        question: "What makes an Amazon description convert better?",
        answer:
          "Clear benefits, scannable bullets, and specificity (materials, sizes, outcomes). Answer common objections like fit, durability, and ease of use.",
      },
      {
        question: "Should I use keywords in the description?",
        answer:
          "Yes, but naturally. Prioritize readability and benefits. Keyword stuffing can reduce trust and hurt conversion.",
      },
      {
        question: "Can I use this for different variations?",
        answer:
          "Yes. Generate a base version, then adjust benefits and bullets for each variation (size, color, bundle, audience).",
      },
    ],
  },
  {
    slug: "faceless-youtube-channel-idea-generator",
    categoryId: "youtube",
    title: "Faceless YouTube Channel Idea Generator",
    description: "Generate faceless channel ideas with niches, formats, and hooks.",
    seoTitle: "Faceless YouTube Channel Idea Generator (Free) - Niche + Format Ideas",
    seoDescription:
      "Generate 5 faceless YouTube channel ideas with niche, format, and content pillars. Built for creators who want scalable content.",
    keywords: ["faceless youtube channel ideas", "youtube niche ideas", "automation channel ideas"],
    useCases: ["Channel launches", "Content pillar planning", "Shorts series ideas"],
    examples: [
      "Niche: [topic] | Format: 60s explainers | Hook: “You’re doing X wrong…”",
      "Niche: [topic] | Format: Top 5 lists | Hook: “Most people don’t know…”",
      "Niche: [topic] | Format: Before/after | Hook: “I tested this for 7 days…”",
      "Niche: [topic] | Format: Case studies | Hook: “Here’s how X works…”",
      "Niche: [topic] | Format: Myth busting | Hook: “Stop believing this…”",
    ],
    whoFor: ["Creators who prefer voiceover/AI visuals", "Teams building channel portfolios", "Anyone starting YouTube automation"],
    commonMistakes: ["Picking niches with weak demand", "No repeatable format", "Ideas that are too broad to stand out"],
    faqs: [
      {
        question: "What faceless YouTube formats scale well?",
        answer:
          "List videos, explainers, comparisons, and story summaries scale well because they are repeatable and easy to template across topics.",
      },
      {
        question: "How do I choose a niche?",
        answer:
          "Pick a niche with clear audiences and searchable problems. Validate by checking existing channels and identifying content gaps.",
      },
      {
        question: "How many ideas should I test before committing?",
        answer:
          "Test 10–20 short videos across 2–3 niches. Double down on the niche that shows consistent CTR and retention.",
      },
    ],
  },
  {
    slug: "pinterest-pin-title-desc-optimizer",
    categoryId: "business-writing",
    title: "Pinterest Pin Title & Description Optimizer",
    description: "Optimize Pin titles and descriptions for clicks and saves.",
    seoTitle: "Pinterest Pin Title & Description Optimizer (Free) - More Clicks",
    seoDescription:
      "Generate 5 optimized Pinterest Pin titles and descriptions with clear keywords, benefits, and save-worthy phrasing for lifestyle and blog content.",
    keywords: ["pinterest pin title", "pinterest description", "pinterest seo", "pin optimizer"],
    useCases: ["Recipe pins", "DIY tutorials", "Lifestyle blog pins"],
    examples: [
      "Title: [Keyword] for [Audience] (Step-by-Step)",
      "Title: [Number] Easy [Thing] Ideas for [Season]",
      "Description: Learn how to [outcome] with this simple checklist + tips.",
      "Description: Save this pin for later and use the printable template.",
      "Description: Includes [benefit], [benefit], and a quick tutorial.",
    ],
    whoFor: ["Lifestyle bloggers", "Pinterest marketers", "Creators repurposing posts into Pins"],
    commonMistakes: ["No keyword in title", "Descriptions that don’t explain the benefit", "Overly generic wording"],
    faqs: [
      {
        question: "What should a Pinterest Pin title include?",
        answer:
          "Include the primary keyword and a clear benefit. Titles that promise an outcome and specify the audience usually earn more clicks.",
      },
      {
        question: "Do hashtags matter on Pinterest?",
        answer:
          "They matter less than keywords and clarity. Focus on searchable phrasing and a strong benefit statement first.",
      },
      {
        question: "How do I increase saves?",
        answer:
          "Use save-friendly language, include checklists or steps, and create Pins that feel like resources people want to reference later.",
      },
    ],
  },
  {
    slug: "facebook-ad-copywriter",
    categoryId: "business-writing",
    title: "Facebook Ad Copywriter",
    description: "Write Facebook ad copy built for testing and conversion.",
    seoTitle: "Facebook Ad Copywriter (Free) - Test Winning Angles Fast",
    seoDescription:
      "Generate 5 Facebook ad copy variations (hooks + primary text + CTAs) to test angles faster and improve CTR and conversions.",
    keywords: ["facebook ad copy", "meta ad copywriter", "facebook ad text", "meta ads copy"],
    useCases: ["Lead gen ads", "Ecommerce offers", "Retargeting campaigns"],
    examples: [
      "Hook: Stop [pain]. Start [outcome].",
      "Primary text: Here’s how [audience] get [result] in [timeframe].",
      "Proof line: Rated [rating]/5 by [number]+ customers.",
      "Offer line: Try it free / limited bonus / discount (if true).",
      "CTA: Get the template / See pricing / Shop now",
    ],
    whoFor: ["Performance marketers", "Agencies running Meta ads", "Founders testing paid acquisition"],
    commonMistakes: ["Testing too many variables at once", "Weak offer clarity", "No proof/credibility signal"],
    faqs: [
      {
        question: "How many ad copy variants should I test?",
        answer:
          "Start with 5–10 variants per offer. Keep the offer constant and test hook angles first to isolate what drives CTR.",
      },
      {
        question: "What ad copy angles work best on Meta?",
        answer:
          "Benefit-first, proof-first, and curiosity-first angles often perform well. The best angle depends on audience awareness and offer maturity.",
      },
      {
        question: "How long should primary text be?",
        answer:
          "Short and scannable wins for cold traffic. Use a clear hook, one benefit, one proof line, then a CTA.",
      },
    ],
  },
  {
    slug: "instagram-reel-script-generator",
    categoryId: "instagram",
    title: "Instagram Reel Script Generator",
    description: "Generate Reels scripts with hooks, beats, and CTAs.",
    seoTitle: "Instagram Reel Script Generator (Free) - Hook to CTA Script",
    seoDescription:
      "Generate 5 short-form scripts for Instagram Reels with a strong hook, clear structure, and a conversion-friendly CTA.",
    keywords: ["instagram reels script", "reel script generator", "short form script", "reels hooks"],
    useCases: ["Educational Reels", "Product demos", "Influencer storytelling"],
    examples: [
      "Hook (0–2s): “Stop scrolling if you want [outcome].”",
      "Context (2–5s): “Here’s the mistake most people make…”",
      "Steps (5–20s): 1) … 2) … 3) …",
      "Proof (optional): “I used this to get [result].”",
      "CTA (final): “Save this and follow for part 2.”",
    ],
    whoFor: ["Influencers and creators", "Brands making product Reels", "Social teams scripting content batches"],
    commonMistakes: ["Hook arrives too late", "Too much context before value", "No CTA to drive saves/comments"],
    faqs: [
      {
        question: "How long should a Reel script be?",
        answer:
          "Aim for 20–45 seconds for most topics. Keep it tight: one hook, 2–3 points, and one CTA.",
      },
      {
        question: "What CTAs work best on Reels?",
        answer:
          "“Save this”, “Follow for part 2”, and a direct question that invites comments tend to perform well.",
      },
      {
        question: "How do I improve watch time?",
        answer:
          "Use pattern interrupts, quick cuts, and numbered steps. Deliver value early and tease one extra detail near the end.",
      },
    ],
  },
  {
    slug: "email-subject-line-ab-tester",
    categoryId: "business-writing",
    title: "Email Subject Line A/B Tester AI",
    description: "Generate A/B subject line variants and test angles faster.",
    seoTitle: "Email Subject Line A/B Tester (Free) - Generate A/B Variants",
    seoDescription:
      "Generate 5 A/B-ready email subject lines with different angles (curiosity, benefit, urgency, proof) to improve open rates.",
    keywords: ["email subject line generator", "ab test subject lines", "email open rate"],
    useCases: ["Newsletter sends", "Product launches", "Sales sequences"],
    examples: [
      "A: “Quick question about [topic]” | B: “The fastest way to [outcome]”",
      "A: “Before you do [thing]…” | B: “3 mistakes that kill [outcome]”",
      "A: “New: [offer] inside” | B: “Last chance: [offer] ends today”",
      "A: “What nobody tells you about [topic]” | B: “The simple framework for [outcome]”",
    ],
    whoFor: ["Business newsletters", "Lifecycle email marketers", "Founders writing launch emails"],
    commonMistakes: ["Testing multiple changes at once", "Vague subjects with no outcome", "Overusing urgency repeatedly"],
    faqs: [
      {
        question: "What should I test in subject lines?",
        answer:
          "Test one variable at a time: angle (curiosity vs benefit), length, personalization, and proof. Keep the email body consistent.",
      },
      {
        question: "What length performs best?",
        answer:
          "Shorter often wins on mobile, but the best length depends on the list. Use clarity first, then test shorter variants.",
      },
      {
        question: "How many variants should I run?",
        answer:
          "Start with A/B, then keep a swipe file of winners by segment. Over time, test 3–5 angles for major campaigns.",
      },
    ],
  },
  {
    slug: "tiktok-script-hook-generator-us-uk",
    categoryId: "tiktok",
    title: "TikTok Script Hook Generator (US/UK)",
    description: "Generate TikTok hook lines tailored for US/UK trend styles.",
    seoTitle: "TikTok Script Hook Generator (US/UK) (Free) - Hook Lines That Fit Trends",
    seoDescription:
      "Generate 5 TikTok script hook lines inspired by common US/UK trend phrasing—built to increase watch time and comments.",
    keywords: ["tiktok script hooks", "tiktok hook generator", "uk tiktok hooks", "us tiktok hooks"],
    useCases: ["Trend-driven videos", "Storytime scripts", "UGC creator hooks"],
    examples: [
      "POV: you’ve been doing [thing] wrong this whole time.",
      "Be so honest… do you do this too?",
      "Wait, why did nobody tell me this?",
      "This is your sign to stop [bad habit].",
      "I’m not gatekeeping this anymore:",
      "If you’re in the UK/US and you do [thing], you need this.",
      "Tell me you’re [type] without telling me you’re [type].",
      "The way this changed my life in 7 days…",
    ],
    whoFor: ["Creators targeting US/UK audiences", "UGC creators and brands", "Teams scripting short-form batches"],
    commonMistakes: ["Generic hooks that don’t match trend tone", "Overstuffing slang unnaturally", "No payoff promised"],
    faqs: [
      {
        question: "Do hooks need slang to perform in US/UK?",
        answer:
          "Not necessarily. Natural tone matters more than slang. Use familiar phrasing, keep it short, and promise a clear payoff.",
      },
      {
        question: "How do I turn a hook into a full script?",
        answer:
          "Follow a simple structure: hook (0–2s), context (2–5s), 2–3 steps, then a CTA to save or comment.",
      },
      {
        question: "How many hooks should I test?",
        answer:
          "Test at least 5–10 hooks per concept. Keep the visuals constant so you can isolate hook performance.",
      },
    ],
  },
  {
    slug: "google-ads-headline-optimizer",
    categoryId: "business-writing",
    title: "Google Ads Headline Optimizer",
    description: "Optimize Google Ads headlines for CTR and message match.",
    seoTitle: "Google Ads Headline Optimizer (Free) - Better CTR Headlines",
    seoDescription:
      "Generate 5 optimized Google Ads headline options with benefits, keywords, and proof angles. Built for SEM teams and agencies.",
    keywords: ["google ads headlines", "rsa headlines", "headline optimizer", "sem copy"],
    useCases: ["RSA testing", "Agency account audits", "Landing page message match"],
    examples: [
      "[Keyword] for [Audience] — Try Free",
      "Get [Outcome] in [Timeframe] | Official Site",
      "Rated [Rating]/5 by [Number]+ Users",
      "Save Time on [Task] — Start Today",
      "All-in-One [Category] Tool | No Credit Card",
      "Stop Wasting Budget on [Problem]",
    ],
    whoFor: ["SEM agencies", "In-house PPC managers", "Teams running RSA headline testing"],
    commonMistakes: ["Headlines that are too generic", "No message match with landing page", "Not testing proof angles"],
    faqs: [
      {
        question: "What makes a Google Ads headline high-CTR?",
        answer:
          "Clear keyword relevance, a specific benefit, and a credibility signal (proof, award, rating). Test multiple angles in RSAs.",
      },
      {
        question: "How many headlines should I include in an RSA?",
        answer:
          "Provide enough variety (benefit, proof, keyword, urgency) so Google can learn. Avoid near-duplicates that don’t add signal.",
      },
      {
        question: "Should I include the keyword in every headline?",
        answer:
          "Not every one. Include keywords in a few headline slots for relevance, and use other slots for benefits and proof to improve conversion quality.",
      },
    ],
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string) {
  const base = getToolBySlug(slug);
  if (!base) {
    return tools.filter((tool) => tool.slug !== slug).slice(0, 3);
  }

  const sameCategory = tools.filter((tool) => tool.slug !== slug && tool.categoryId === base.categoryId);
  const others = tools.filter((tool) => tool.slug !== slug && tool.categoryId !== base.categoryId);
  return [...sameCategory, ...others].slice(0, 3);
}
