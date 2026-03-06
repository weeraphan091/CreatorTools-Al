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
      {
        question: "How many YouTube title options should I generate?",
        answer:
          "Generate at least five variants per video, then pick the one that balances curiosity, clarity, and keyword relevance for your target audience.",
      },
      {
        question: "Should I include numbers in my YouTube title?",
        answer:
          "Numbers add specificity and boost CTR. Titles like '7 Tips' or '30-Day Challenge' set clear expectations and stand out in search results.",
      },
      {
        question: "How long should a YouTube title be?",
        answer:
          "Keep titles under 60 characters so they display fully on mobile. Front-load the most compelling words before the cutoff point.",
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
      {
        question: "Should I include a CTA in my TikTok caption?",
        answer:
          "Yes. A short CTA like 'save this,' 'comment YES,' or 'follow for more' tells viewers what to do next and can boost engagement metrics.",
      },
      {
        question: "How many hashtags should I use on TikTok?",
        answer:
          "Use 3–5 relevant hashtags after the caption. Mix niche and trending tags, and don't let hashtags overshadow the message itself.",
      },
      {
        question: "Can I reuse captions across multiple TikTok videos?",
        answer:
          "You can reuse structures and CTA styles, but personalize each caption to the specific video content for better relevance and engagement.",
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
      {
        question: "What is the ideal length for a hook?",
        answer:
          "Keep hooks under two sentences. The goal is to spark curiosity or tension in the first 1–3 seconds of a video or the first line of copy.",
      },
      {
        question: "Can I use the same hook for different platforms?",
        answer:
          "Yes, but adjust length and tone per platform. A Reel hook can be more visual while an email hook should be more benefit-driven.",
      },
      {
        question: "How do I know if my hook is working?",
        answer:
          "Track watch time (video) or open rate (email) for the first few seconds or lines. A strong hook keeps at least 70% of viewers past the opening.",
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
      {
        question: "How often should I update my Instagram bio?",
        answer:
          "Update whenever your offer, niche, or CTA changes. A fresh bio every few months keeps your profile aligned with your current goals.",
      },
      {
        question: "Should my Instagram bio include a link?",
        answer:
          "Yes. Use the single link or a link-in-bio tool to direct visitors to your most important page, whether it's a landing page, shop, or free resource.",
      },
      {
        question: "How do I make my Instagram bio stand out?",
        answer:
          "Use line breaks for structure, lead with your unique value, and end with one clear CTA. Avoid clichés and focus on what makes you different.",
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
      {
        question: "How many ad headline variants should I test?",
        answer:
          "Test at least 5–10 variants per campaign. Keep the offer constant and vary only the headline angle to isolate what drives the highest CTR.",
      },
      {
        question: "What's the difference between headlines for Meta and Google?",
        answer:
          "Google headlines need keyword relevance for search intent. Meta headlines rely more on curiosity and scroll-stopping appeal since users aren't actively searching.",
      },
      {
        question: "Can I use questions in ad headlines?",
        answer:
          "Yes. Questions that address a pain point or desired outcome can increase engagement, especially for awareness campaigns targeting cold audiences.",
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
      {
        question: "What blog title formats get the most clicks?",
        answer:
          "How-to guides, numbered lists, and comparison posts consistently earn high CTR because they set clear expectations for the reader.",
      },
      {
        question: "Should I include the year in my blog title?",
        answer:
          "Yes, for time-sensitive topics like 'Best Tools in 2026.' It signals freshness to both readers and search engines.",
      },
      {
        question: "How do I write blog titles for featured snippets?",
        answer:
          "Use question-based titles that match exact search queries. Structure the article so the answer appears clearly in the first paragraph or a dedicated section.",
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
      {
        question: "How long should a product description be?",
        answer:
          "Aim for 100–300 words depending on product complexity. Lead with benefits, follow with specs, and end with a CTA or trust signal.",
      },
      {
        question: "Should I write different descriptions for different channels?",
        answer:
          "Yes. Amazon listings need keyword-rich bullets, while your own site can use more storytelling and brand voice. Tailor copy to each platform's format.",
      },
      {
        question: "How do I handle objections in product copy?",
        answer:
          "Address common concerns (sizing, durability, shipping) directly in the description. A short FAQ section near the buy button can reduce hesitation.",
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
      {
        question: "How do I check if a brand name is available?",
        answer:
          "Search domain registrars, social media handles, and trademark databases (e.g., USPTO). Check availability before committing to any name.",
      },
      {
        question: "Should my brand name be short or descriptive?",
        answer:
          "Shorter names (1–2 syllables) are easier to remember and type. Descriptive names aid initial clarity but can limit future pivots.",
      },
      {
        question: "Can I change my brand name later?",
        answer:
          "You can, but rebranding is costly and risks losing recognition. Invest time upfront to choose a name that can grow with your business.",
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
      {
        question: "What is the difference between a slogan and a tagline?",
        answer:
          "A slogan is often campaign-specific, while a tagline is a permanent brand phrase. Both should be short, memorable, and tied to your core promise.",
      },
      {
        question: "How do I test which slogan works best?",
        answer:
          "Run A/B tests on landing pages or ads using different slogans. Measure recall, preference, and conversion to find the strongest option.",
      },
      {
        question: "Can a slogan work across different languages?",
        answer:
          "Test translations carefully. Some slogans lose meaning or impact when translated, so consider creating region-specific versions for global campaigns.",
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
      {
        question: "How many CTAs should a landing page have?",
        answer:
          "Use one primary CTA repeated 2–3 times on the page. Avoid competing CTAs that split attention and reduce conversion.",
      },
      {
        question: "Should CTAs be personalized?",
        answer:
          "Yes. First-person CTAs like 'Start my free trial' often outperform generic ones like 'Start free trial' because they feel more personal.",
      },
      {
        question: "What colors work best for CTA buttons?",
        answer:
          "High-contrast colors that stand out from the page background work best. Test button color alongside copy changes to isolate what drives clicks.",
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
      {
        question: "When is the best time to post on LinkedIn?",
        answer:
          "Weekday mornings (Tuesday–Thursday, 7–9 AM in your audience’s timezone) tend to see strong engagement. Test different times and check your post analytics.",
      },
      {
        question: "Should I use images or text-only posts on LinkedIn?",
        answer:
          "Both can work. Text-only posts often get strong reach in the feed. Use images or carousels when visuals add value; avoid stock photos that feel generic.",
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
      {
        question: "What topics perform best for tech and crypto threads?",
        answer:
          "Deep dives, contrarian takes with data, and actionable frameworks get the most engagement. Pair timely news with lasting insights for wider reach.",
      },
      {
        question: "How often should I post threads on X?",
        answer:
          "One to two quality threads per week is a strong pace. Consistency matters more than volume; supplement with shorter single-tweet posts between threads.",
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
      {
        question: "How long should Amazon product descriptions be?",
        answer:
          "Use the full allowed space. Bullet points should be 1–2 lines each. Descriptions can be 200–300 words focused on benefits, use cases, and trust signals.",
      },
      {
        question: "Should I include competitor comparisons in my listing?",
        answer:
          "Avoid naming competitors directly. Instead, highlight your unique advantages (materials, warranty, features) so buyers can draw their own conclusions.",
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
      {
        question: "What tools do I need for a faceless YouTube channel?",
        answer:
          "A script, AI voiceover or recorded narration, stock footage or screen recordings, and a simple editor. Many creators start with free tools and scale up.",
      },
      {
        question: "How long does it take for a faceless channel to grow?",
        answer:
          "Expect 3–6 months of consistent uploads before seeing meaningful traction. Focus on a repeatable format and study analytics to improve CTR and retention.",
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
      {
        question: "How often should I post Pins?",
        answer:
          "Consistency matters more than volume. Aim for 5–15 Pins per week, mixing fresh content with repins. Schedule ahead to maintain a steady presence.",
      },
      {
        question: "Should I use the same description on multiple Pins?",
        answer:
          "Vary descriptions even for similar content. Unique descriptions help each Pin rank for different keywords and avoid appearing repetitive to Pinterest's algorithm.",
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
      {
        question: "What is the ideal Facebook ad copy structure?",
        answer:
          "Hook (first line), benefit or story (2–3 lines), proof or credibility (one line), and a clear CTA. Keep paragraphs short for mobile readability.",
      },
      {
        question: "Should I use emojis in Facebook ad copy?",
        answer:
          "Emojis can increase visual contrast and readability when used sparingly. Test ads with and without emojis to see what your audience prefers.",
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
      {
        question: "Should I add text overlays to my Reels?",
        answer:
          "Yes. Text overlays reinforce your message for viewers watching without sound, which is common. Keep text short and sync it with your voiceover.",
      },
      {
        question: "How do I batch-produce Reel scripts?",
        answer:
          "Use a repeatable format (hook, 3 tips, CTA) and swap topics. Write 5–10 scripts in one sitting, then film and edit in batches for efficiency.",
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
      {
        question: "When should I send the winning subject line?",
        answer:
          "Most email platforms auto-send the winner after a test window (e.g., 2–4 hours). Set the window based on your list size and typical open timing.",
      },
      {
        question: "Do emojis improve email open rates?",
        answer:
          "It depends on your audience. Some segments respond well to a single relevant emoji; others prefer plain text. Always A/B test before committing.",
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
      {
        question: "Can I use trending audio with scripted hooks?",
        answer:
          "Yes. Pair a trending sound with a strong text hook overlay or voiceover. The combination of familiar audio and a fresh hook can boost watch time.",
      },
      {
        question: "What's the best way to test hooks on TikTok?",
        answer:
          "Post 3–5 variations of the same concept with different hooks. Keep visuals and content the same so you can isolate which opening line performs best.",
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
      {
        question: "How do I write headlines for different match types?",
        answer:
          "Broad match headlines should cover intent themes. Exact match headlines should mirror the search query closely. Tailor specificity to match type for better relevance.",
      },
      {
        question: "What's the character limit for Google Ads headlines?",
        answer:
          "Each headline can be up to 30 characters. Write concise, benefit-led copy and use every character wisely. Test short vs. full-length headlines.",
      },
    ],
  },
  // ---- 20 new unique tools (no overlap with existing) ----
  {
    slug: "ai-scriptwriter-faceless-channels",
    categoryId: "youtube",
    title: "AI Scriptwriter for Faceless Channels",
    description: "Generate full scripts for faceless YouTube videos with hooks, structure, and CTAs.",
    seoTitle: "AI Scriptwriter for Faceless Channels (Free) - YouTube Automation Scripts",
    seoDescription:
      "Generate faceless YouTube scripts with hooks, retention beats, and CTAs. Free AI tool for YouTube automation and cash-cow channels.",
    keywords: ["faceless youtube script", "youtube automation script", "ai scriptwriter youtube", "faceless channel script"],
    useCases: ["List videos", "Explainer content", "Reddit story narration", "Comparison videos"],
    examples: [
      "Hook: You're doing [X] wrong. Here's what actually works.",
      "Retention beat every 30s: number, tip, or twist",
      "CTA: Like and subscribe for more [topic] breakdowns",
      "Pattern: Problem → 3 steps → Proof → CTA",
    ],
    whoFor: ["YouTube automation creators", "Faceless channel operators", "Teams scaling scripted content"],
    commonMistakes: ["No clear hook in first 5 seconds", "Scripts that sound robotic", "Missing mid-roll retention beats"],
    faqs: [
      {
        question: "What makes a good faceless YouTube script?",
        answer:
          "A strong hook in the first 3–5 seconds, clear structure (problem, steps, proof), retention beats every 20–40 seconds, and a clear CTA. Keep sentences short for voiceover.",
      },
      {
        question: "How long should a faceless script be?",
        answer:
          "Aim for 8–12 minutes for standard videos (1,200–1,800 words). Shorts: 30–60 seconds. Match length to topic depth and audience expectations.",
      },
      {
        question: "Can I use this for different niches?",
        answer:
          "Yes. Enter your topic or niche and the tool generates structure and phrasing you can adapt. Swap in your own facts and examples for authenticity.",
      },
      {
        question: "How do I improve retention with script structure?",
        answer:
          "Add a mini-hook or twist every 30–45 seconds (number, “but here’s the catch,” or “step two changes everything”). Tease the next point before transitions.",
      },
      {
        question: "Should I use the same script format for every video?",
        answer:
          "Use a consistent format (e.g., hook → 3 tips → CTA) so viewers know what to expect. Vary the angle and examples, not the structure.",
      },
    ],
  },
  {
    slug: "pinterest-idea-pin-planner",
    categoryId: "business-writing",
    title: "Pinterest Idea Pin Planner",
    description: "Plan Idea Pin titles, page copy, and CTAs for multi-page Pinterest content.",
    seoTitle: "Pinterest Idea Pin Planner (Free) - Multi-Page Pin Copy & CTAs",
    seoDescription:
      "Plan Idea Pin titles, page-by-page copy, and CTAs. Free AI tool for visual content creators and Pinterest marketers.",
    keywords: ["pinterest idea pin", "idea pin planner", "pinterest multi-page", "pinterest content planner"],
    useCases: ["How-to Idea Pins", "List-style pins", "Story-style sequences", "Product showcases"],
    examples: [
      "Title: [Number] [Outcome] in [Timeframe] (Swipe for Steps)",
      "Page 1: Hook + promise | Page 2–N: One tip per page | Last: CTA",
      "CTA options: Save this pin, Follow for more, Tap link in bio",
    ],
    whoFor: ["Pinterest creators", "Lifestyle and DIY bloggers", "Brands building Idea Pin series"],
    commonMistakes: ["Weak first page hook", "Too much text per page", "No clear CTA on final page"],
    faqs: [
      {
        question: "What is a Pinterest Idea Pin?",
        answer:
          "Idea Pins are multi-page, native Pinterest formats (like Stories). They support up to 20 pages and are ideal for how-tos, lists, and step-by-step content.",
      },
      {
        question: "How many pages should an Idea Pin have?",
        answer:
          "Often 5–10 pages work best. Use the first page as a strong hook and title, then one clear idea per page. End with a CTA page.",
      },
      {
        question: "What should each page say?",
        answer:
          "Keep copy short and scannable. One headline or tip per page. Use the first page to promise an outcome; use the last to drive saves, follows, or link clicks.",
      },
      {
        question: "How do I get more saves on Idea Pins?",
        answer:
          "Use save-worthy titles (e.g., “Save for later”), include checklists or steps, and make the outcome clear in the first page so people know what they’re saving.",
      },
      {
        question: "Can I reuse the same structure for different topics?",
        answer:
          "Yes. Use a template (e.g., “X tips for Y”) and swap the topic and details. Consistency helps your audience recognize your style and improves performance over time.",
      },
    ],
  },
  {
    slug: "x-viral-thread-starter",
    categoryId: "business-writing",
    title: "X (Twitter) Viral Thread Starter",
    description: "Generate thread openers and structure for thought leaders and educators on X.",
    seoTitle: "X Viral Thread Starter (Free) - Thread Hooks & Structure for Thought Leaders",
    seoDescription:
      "Generate viral X (Twitter) thread openers and structure. Free AI tool for thought leaders, educators, and creators.",
    keywords: ["twitter thread starter", "x thread viral", "thread hook generator", "twitter thread structure"],
    useCases: ["Educational threads", "Story threads", "Framework breakdowns", "Hot takes with proof"],
    examples: [
      "I spent [X] hours on [topic]. Here are [number] things nobody talks about:",
      "The [framework] that changed how I [outcome]. Thread:",
      "Most people get [topic] wrong. Here's the truth (with receipts):",
    ],
    whoFor: ["Thought leaders on X", "Educators and coaches", "Creators building authority with threads"],
    commonMistakes: ["Vague opener with no payoff", "No clear structure (numbered vs story)", "Thread too long without sub-hooks"],
    faqs: [
      {
        question: "What makes a thread go viral on X?",
        answer:
          "A strong first tweet that promises a clear payoff, a consistent structure (numbered list or story), and each tweet earning the next. Add proof or examples when possible.",
      },
      {
        question: "How long should my thread be?",
        answer:
          "Often 5–12 tweets. Short enough to finish, long enough to deliver value. Use the first tweet as a hook and table of contents when helpful.",
      },
      {
        question: "Should I use a hook or a question to start?",
        answer:
          "Both work. Use a bold claim or “I did X, here’s what I learned” for authority. Use a question when you want replies and discussion. Test both.",
      },
      {
        question: "How do I keep people reading to the end?",
        answer:
          "Tease the next tweet at the end of each one (“This is where it gets interesting”) and deliver one clear idea per tweet. Avoid long blocks of text.",
      },
      {
        question: "Can I reuse thread structures for different topics?",
        answer:
          "Yes. Use a repeatable format (e.g., “X lessons from Y”) so your audience knows what to expect. Swap the topic and examples for each new thread.",
      },
    ],
  },
  {
    slug: "linkedin-thought-leadership-post-ai",
    categoryId: "business-writing",
    title: "LinkedIn Thought Leadership Post AI",
    description: "Write LinkedIn posts that build authority and spark discussion for B2B professionals.",
    seoTitle: "LinkedIn Thought Leadership Post AI (Free) - B2B Authority-Building Posts",
    seoDescription:
      "Generate LinkedIn thought leadership posts designed for engagement and authority. Free AI tool for B2B professionals and executives.",
    keywords: ["linkedin thought leadership", "linkedin authority posts", "b2b linkedin content", "linkedin post generator"],
    useCases: ["Industry insights", "Lessons learned", "Hot takes with nuance", "Framework sharing"],
    examples: [
      "I used to believe [X]. Then [experience] changed my view. Here's what I learned:",
      "The [framework] I use to [outcome]. No fluff:",
      "Unpopular opinion: [claim]. Here's why:",
    ],
    whoFor: ["B2B executives and founders", "Consultants and coaches", "Professionals building personal brand on LinkedIn"],
    commonMistakes: ["Generic advice without personal angle", "No discussion prompt", "Too long without subheads or breaks"],
    faqs: [
      {
        question: "What is a thought leadership post on LinkedIn?",
        answer:
          "A post that shares a clear point of view, backed by experience or evidence. It invites discussion and positions you as a trusted voice on a topic.",
      },
      {
        question: "How long should a LinkedIn thought leadership post be?",
        answer:
          "Often 150–300 words. Use short paragraphs and line breaks. Lead with the insight, then support it with a story or framework. End with a question or CTA.",
      },
      {
        question: "How do I get more comments on LinkedIn posts?",
        answer:
          "End with a specific question tied to the post. Ask for opinions, examples, or “agree or disagree.” Avoid generic “Thoughts?” and make it easy to answer.",
      },
      {
        question: "Should I share personal stories?",
        answer:
          "Yes, when they support your point. A short anecdote or lesson learned makes the post memorable and builds connection. Keep it relevant to your audience.",
      },
      {
        question: "How often should I post thought leadership content?",
        answer:
          "Consistency matters more than volume. Aim for 2–4 posts per week. Mix thought leadership with lighter updates and engagement on others’ posts.",
      },
    ],
  },
  {
    slug: "podcast-episode-show-notes-generator",
    categoryId: "business-writing",
    title: "Podcast Episode Show Notes Generator",
    description: "Generate show notes, timestamps, and key takeaways for podcast episodes.",
    seoTitle: "Podcast Episode Show Notes Generator (Free) - Show Notes & Timestamps",
    seoDescription:
      "Generate podcast show notes, timestamps, and key takeaways. Free AI tool for podcasters and audio creators.",
    keywords: ["podcast show notes", "show notes generator", "podcast timestamps", "episode summary"],
    useCases: ["Interview episodes", "Solo episodes", "Educational series", "Repurposing for SEO"],
    examples: [
      "[Timestamp] – Topic intro and hook",
      "Key takeaway: [One sentence]",
      "In this episode we cover: [3–5 bullets]",
      "Resources mentioned: [Links or names]",
    ],
    whoFor: ["Podcasters publishing weekly", "Teams repurposing episodes for blogs", "Creators improving discoverability"],
    commonMistakes: ["Show notes that are too vague", "No timestamps for key moments", "Missing keywords for search"],
    faqs: [
      {
        question: "What should podcast show notes include?",
        answer:
          "A short summary (2–4 sentences), 3–5 key takeaways, timestamps for major sections, guest or topic details, and links to resources mentioned.",
      },
      {
        question: "Why are timestamps important?",
        answer:
          "They help listeners jump to sections they care about and improve engagement. They also help platforms and SEO when included in descriptions.",
      },
      {
        question: "How long should show notes be?",
        answer:
          "Enough to convey value and keywords: often 150–400 words. Keep the first paragraph strong for previews and search snippets.",
      },
      {
        question: "Can show notes help with podcast SEO?",
        answer:
          "Yes. Use relevant keywords in the title and first paragraph. Include topic phrases and guest names. Publish show notes on your site for indexation.",
      },
      {
        question: "Should I write show notes before or after recording?",
        answer:
          "After recording you have exact timestamps and quotes. Draft a structure before if it helps; finalize with accurate timestamps and takeaways after.",
      },
    ],
  },
  {
    slug: "email-newsletter-subject-line-ab-tester",
    categoryId: "business-writing",
    title: "Email Newsletter Subject Line A/B Tester",
    description: "Generate A/B subject line variants for newsletters to improve open rates.",
    seoTitle: "Email Newsletter Subject Line A/B Tester (Free) - Open Rate Optimization",
    seoDescription:
      "Generate A/B newsletter subject lines with different angles. Free AI tool for email marketers and newsletter creators.",
    keywords: ["newsletter subject line", "email subject line ab test", "newsletter open rate", "subject line tester"],
    useCases: ["Weekly newsletters", "Launch announcements", "Digest emails", "Re-engagement campaigns"],
    examples: [
      "A: [Curiosity] | B: [Benefit]",
      "A: [Number] things you missed this week | B: [Personalization]",
      "A: Quick question... | B: [Outcome] in [timeframe]",
    ],
    whoFor: ["Newsletter creators", "Email marketers", "Founders sending regular updates"],
    commonMistakes: ["Testing two similar angles", "Overusing urgency or clickbait", "No clear winner criteria"],
    faqs: [
      {
        question: "What should I test in newsletter subject lines?",
        answer:
          "Test one variable at a time: angle (curiosity vs benefit), length, personalization, or format (question vs statement). Keep the rest of the email the same.",
      },
      {
        question: "How many subscribers do I need to A/B test?",
        answer:
          "Roughly 1,000+ for meaningful results. With smaller lists, run sequential tests or use best practices (clear benefit, concise length) until you have enough volume.",
      },
      {
        question: "What length works best for newsletter subjects?",
        answer:
          "It depends on your audience. Mobile users often see 40–50 characters. Test short (under 50) vs longer (50–70) and check your own open data.",
      },
      {
        question: "Should I use emojis in subject lines?",
        answer:
          "Test it. Some audiences open more with a relevant emoji; others prefer plain text. Use one emoji at most and keep it consistent with your brand.",
      },
      {
        question: "How do I avoid spam filters with subject lines?",
        answer:
          "Avoid all caps, excessive punctuation, and spam triggers (“FREE,” “Act now”). Keep copy clear and value-focused. Maintain a healthy sender reputation.",
      },
    ],
  },
  {
    slug: "amazon-aplus-content-headline-optimizer",
    categoryId: "ecommerce",
    title: "Amazon A+ Content Headline Optimizer",
    description: "Optimize headlines and module copy for Amazon A+ Content to boost conversion.",
    seoTitle: "Amazon A+ Content Headline Optimizer (Free) - E-commerce Sellers",
    seoDescription:
      "Generate and optimize A+ Content headlines and module copy for Amazon listings. Free AI tool for e-commerce sellers.",
    keywords: ["amazon a+ content", "a+ content headline", "amazon brand story", "amazon listing optimizer"],
    useCases: ["Brand story modules", "Comparison charts", "Feature callouts", "Trust and warranty sections"],
    examples: [
      "Why [Product]? [Benefit] in [Timeframe]",
      "[Number] Reasons [Audience] Choose [Brand]",
      "From [Problem] to [Outcome] – How It Works",
    ],
    whoFor: ["Amazon sellers with Brand Registry", "E-commerce brands optimizing listings", "Agencies managing multiple ASINs"],
    commonMistakes: ["Generic headlines that don’t differentiate", "Too much text per module", "Ignoring mobile layout"],
    faqs: [
      {
        question: "What is Amazon A+ Content?",
        answer:
          "A+ Content (Brand Story) is enhanced product detail for Brand Registry sellers. It includes headlines, images, and modules below the fold to explain benefits and build trust.",
      },
      {
        question: "What makes a strong A+ headline?",
        answer:
          "Clear benefit, audience or use case, and outcome. Keep it short and scannable. Match the headline to the module content (e.g., comparison vs feature).",
      },
      {
        question: "How many modules should I use?",
        answer:
          "Use the space Amazon allows (typically 5–7 modules). Lead with brand story or key benefits, then comparison, features, and trust (warranty, materials).",
      },
      {
        question: "Can A+ Content improve conversion rate?",
        answer:
          "Yes. Clear benefits, comparison charts, and trust elements can reduce returns and improve conversion. Test different headlines and module order.",
      },
      {
        question: "Should I use keywords in A+ Content?",
        answer:
          "Use them naturally in headlines and body. Don’t stuff. Focus on readability and benefit-led copy; use backend search terms for heavy keyword coverage.",
      },
    ],
  },
  {
    slug: "etsy-seo-product-title-generator",
    categoryId: "ecommerce",
    title: "Etsy SEO Product Title Generator",
    description: "Generate Etsy-optimized product titles with keywords for handmade and vintage sellers.",
    seoTitle: "Etsy SEO Product Title Generator (Free) - Handmade Sellers",
    seoDescription:
      "Generate Etsy product titles with relevant keywords for search. Free AI tool for handmade, vintage, and craft sellers.",
    keywords: ["etsy product title", "etsy seo", "etsy title generator", "handmade seo"],
    useCases: ["Handmade jewelry", "Vintage items", "Digital downloads", "Custom gifts"],
    examples: [
      "[Material] [Product Type] for [Occasion] – [Style] – [Audience] Gift",
      "[Number] [Item] – [Descriptor] – [Color] – Personalization Available",
      "[Seasonal] [Product] – [Key Feature] – [Material]",
    ],
    whoFor: ["Etsy sellers", "Handmade and vintage shop owners", "Sellers improving search rank"],
    commonMistakes: ["Keyword stuffing", "Missing niche keywords", "Titles that don’t read naturally"],
    faqs: [
      {
        question: "How long can an Etsy title be?",
        answer:
          "Up to 140 characters. Use the full space with relevant, readable keywords. Front-load the most important terms for search and clarity.",
      },
      {
        question: "What keywords should I include in Etsy titles?",
        answer:
          "Include product type, material, style, occasion, color, and audience (e.g., “gift for her”). Use Etsy search and listings to find what buyers search for.",
      },
      {
        question: "Should I repeat keywords from tags in the title?",
        answer:
          "Use your most important tags in the title. Repeating exact phrases can help for that term, but prioritize a natural, readable title first.",
      },
      {
        question: "How do I balance SEO and readability?",
        answer:
          "Write for humans first: a clear, descriptive title. Then weave in search terms (material, style, occasion) without stuffing. Read it aloud to check flow.",
      },
      {
        question: "Can I use this for digital products on Etsy?",
        answer:
          "Yes. Use the same principles: product type, format (e.g., printable, SVG), use case, and audience. Include “instant download” or “digital” if relevant.",
      },
    ],
  },
  {
    slug: "google-business-profile-description-ai",
    categoryId: "seo-marketing",
    title: "Google Business Profile Description AI",
    description: "Write Google Business Profile descriptions for local SEO and discovery.",
    seoTitle: "Google Business Profile Description AI (Free) - Local SEO",
    seoDescription:
      "Generate Google Business Profile (Google My Business) descriptions for local SEO. Free AI tool for local businesses and agencies.",
    keywords: ["google business profile", "google my business description", "local seo", "gbp description"],
    useCases: ["Local services", "Restaurants and retail", "Multi-location brands", "Service area businesses"],
    examples: [
      "[Business] serving [Area] since [Year]. We [primary service]. [Key differentiator]. Call or visit today.",
      "[Type] in [Location]. [Offer]. [Proof]. Open [hours]. [CTA].",
    ],
    whoFor: ["Local business owners", "Multi-location marketers", "SEO agencies managing GBP"],
    commonMistakes: ["Generic descriptions", "Missing location and service keywords", "Over 750 characters (limit)"],
    faqs: [
      {
        question: "How long can my Google Business Profile description be?",
        answer:
          "Up to 750 characters. Use the space to cover what you do, where you serve, key services, and a clear CTA. Avoid keyword stuffing.",
      },
      {
        question: "What should a GBP description include?",
        answer:
          "Business name and category, primary services or products, location or service area, what makes you different, and a call to action (call, book, visit).",
      },
      {
        question: "Do keywords in the description help local SEO?",
        answer:
          "Relevant terms help Google understand your business. Use natural language and include location, service type, and niche terms. Don’t stuff.",
      },
      {
        question: "Can I use the same description for multiple locations?",
        answer:
          "Use a template and customize per location (city, neighborhood, services). Duplicate content across many profiles can be less effective; localize where possible.",
      },
      {
        question: "How often should I update my GBP description?",
        answer:
          "Update when offerings, hours, or messaging change. There’s no need to change it constantly; keep it accurate and relevant.",
      },
    ],
  },
  {
    slug: "press-release-draft-generator",
    categoryId: "business-writing",
    title: "Press Release Draft Generator",
    description: "Draft press release structure and copy for PR and startup announcements.",
    seoTitle: "Press Release Draft Generator (Free) - PR & Startups",
    seoDescription:
      "Generate press release drafts with headline, subhead, boilerplate, and quotes. Free AI tool for PR teams and startups.",
    keywords: ["press release generator", "press release template", "pr draft", "news release"],
    useCases: ["Product launches", "Funding announcements", "Partnerships", "Awards and milestones"],
    examples: [
      "[Company] Launches [Product] to [Outcome] for [Audience]",
      "[Company] Secures [Amount] to [Mission] – [Quote]",
      "FOR IMMEDIATE RELEASE – [Headline] – [City, Date]",
    ],
    whoFor: ["PR professionals", "Startup founders", "Communications teams"],
    commonMistakes: ["Buried lead", "No quote or spokesperson", "Too long or jargon-heavy"],
    faqs: [
      {
        question: "What should a press release include?",
        answer:
          "A clear headline, dateline, lead paragraph (who, what, when, where, why), supporting paragraphs, quote from spokesperson, boilerplate about the company, and contact info.",
      },
      {
        question: "How long should a press release be?",
        answer:
          "Often 400–600 words. Keep the lead to 1–2 sentences. Journalists scan quickly; put the most newsworthy information first.",
      },
      {
        question: "What makes a strong press release headline?",
        answer:
          "Specific and newsworthy: include the key news (launch, funding, partnership). Avoid hype words. Use active voice and clarity.",
      },
      {
        question: "Should I include quotes in a press release?",
        answer:
          "Yes. Include at least one quote from a named spokesperson (CEO, VP). It adds credibility and gives journalists a ready-made sound bite.",
      },
      {
        question: "How do I distribute a press release?",
        answer:
          "Use wire services (e.g., PR Newswire, Business Wire) for reach, and also send directly to relevant journalists. Post on your newsroom and social channels.",
      },
    ],
  },
  {
    slug: "webinar-registration-page-copy-ai",
    categoryId: "business-writing",
    title: "Webinar Registration Page Copy AI",
    description: "Write webinar registration page headlines, bullets, and CTAs for online educators.",
    seoTitle: "Webinar Registration Page Copy AI (Free) - Online Educators",
    seoDescription:
      "Generate webinar registration page copy: headlines, benefits, and CTAs. Free AI tool for course creators and educators.",
    keywords: ["webinar registration page", "webinar copy", "registration page headline", "webinar signup copy"],
    useCases: ["Lead gen webinars", "Product demos", "Training launches", "Evergreen webinar funnels"],
    examples: [
      "Join [Expert] for [Topic]: [Outcome] in [Timeframe]",
      "What you'll learn: [3–5 bullets]",
      "Reserve your spot – [Date] at [Time] – Free",
    ],
    whoFor: ["Online educators", "Course creators", "B2B marketers running webinars"],
    commonMistakes: ["Vague headline", "Too many bullets", "Weak or missing CTA"],
    faqs: [
      {
        question: "What should a webinar registration page include?",
        answer:
          "A clear headline (topic + outcome), 3–5 benefit bullets, date/time/timezone, speaker credibility, and a strong CTA (e.g., Reserve my spot, Register free).",
      },
      {
        question: "How long should the headline be?",
        answer:
          "Short enough to scan: often 10–15 words. Include the topic and the main outcome or promise. Avoid jargon.",
      },
      {
        question: "What makes people register for webinars?",
        answer:
          "Clear value (what they’ll learn), credibility (who’s presenting), low friction (free, one click), and sometimes urgency (limited spots, deadline).",
      },
      {
        question: "Should I use countdown timers or urgency?",
        answer:
          "Use sparingly and honestly. “Limited spots” or “Register by X” can help if true. Avoid fake scarcity; it can hurt trust and compliance.",
      },
      {
        question: "Can I reuse the same page for multiple webinars?",
        answer:
          "Use a template and swap headline, date, and bullets. Keep the structure and CTA consistent so you can optimize over time.",
      },
    ],
  },
  {
    slug: "app-store-aso-description-optimizer",
    categoryId: "ecommerce",
    title: "App Store (ASO) Description Optimizer",
    description: "Optimize App Store and Play Store descriptions for ASO and conversion.",
    seoTitle: "App Store ASO Description Optimizer (Free) - Mobile App Devs",
    seoDescription:
      "Generate and optimize App Store and Google Play descriptions for ASO. Free AI tool for mobile app developers and publishers.",
    keywords: ["app store description", "aso optimizer", "play store description", "app store optimization"],
    useCases: ["New app launches", "Update descriptions", "Keyword testing", "Localization prep"],
    examples: [
      "[App] – [One-line benefit]. [Key feature]. [Key feature]. [Social proof]. Download free.",
      "Subtitle: [Benefit] in [Timeframe]",
      "First 3 lines: keyword-rich, benefit-led (visible before “more”)",
    ],
    whoFor: ["Mobile app developers", "ASO specialists", "Publishers with multiple apps"],
    commonMistakes: ["Ignoring character limits", "Keyword stuffing", "Weak first line (visible in store)"],
    faqs: [
      {
        question: "What is ASO?",
        answer:
          "App Store Optimization: improving visibility and conversion in app stores through keywords, title, subtitle, description, and screenshots. Similar to SEO for apps.",
      },
      {
        question: "What are App Store character limits?",
        answer:
          "Apple: subtitle 30 characters, promo text 170. Description length varies by store. Google Play: short description 80 characters, full description 4,000. Prioritize what’s visible first.",
      },
      {
        question: "What should the first line of my description say?",
        answer:
          "Lead with the main benefit or value proposition. Many users only see the first few lines; make them keyword-aware but readable.",
      },
      {
        question: "How do I choose ASO keywords?",
        answer:
          "Use store search suggestions, competitor apps, and keyword tools. Include core terms in title/subtitle and natural phrases in the description.",
      },
      {
        question: "Should I A/B test my store listing?",
        answer:
          "Yes. Test icons, screenshots, and first lines where possible. Small changes can improve conversion; measure installs and conversion rate.",
      },
    ],
  },
  {
    slug: "real-estate-property-listing-storyteller",
    categoryId: "business-writing",
    title: "Real Estate Property Listing Storyteller",
    description: "Turn property details into compelling listing copy for realtors.",
    seoTitle: "Real Estate Property Listing Storyteller (Free) - Realtors",
    seoDescription:
      "Generate compelling real estate listing copy from property details. Free AI tool for realtors and property marketers.",
    keywords: ["real estate listing copy", "property description", "realtor copy", "listing storyteller"],
    useCases: ["Residential listings", "Luxury properties", "Open house blurbs", "Zillow/MLS descriptions"],
    examples: [
      "Welcome to [Address] – [Key feature]. [Lifestyle angle]. [Room highlights]. [Outdoor/area]. Schedule your tour.",
      "[Neighborhood] gem: [Bed/bath]. [Standout feature]. [Perfect for]. [CTA].",
    ],
    whoFor: ["Realtors", "Property managers", "Real estate marketers"],
    commonMistakes: ["Only listing features", "No lifestyle or emotion", "Missing CTA or contact"],
    faqs: [
      {
        question: "What makes real estate listing copy sell?",
        answer:
          "Lead with the most desirable feature or lifestyle (views, location, layout). Use vivid but accurate language. Include key specs and a clear CTA.",
      },
      {
        question: "How long should a listing description be?",
        answer:
          "Varies by platform. Zillow and MLS allow longer copy; use 100–200 words for the main description and a short headline. Lead with the hook.",
      },
      {
        question: "Should I use superlatives?",
        answer:
          "Use them sparingly and only when true (“stunning,” “spacious”). Avoid overused or vague terms. Be specific (e.g., “floor-to-ceiling windows”) instead.",
      },
      {
        question: "How do I write for different price points?",
        answer:
          "Luxury: emphasize lifestyle, quality, exclusivity. Mid-range: balance features and value. Entry-level: highlight practicality and opportunity. Match tone to buyer.",
      },
      {
        question: "Can I use this for open house or social posts?",
        answer:
          "Yes. Shorten the main description for social or open house blurbs. Keep the hook and one or two key selling points plus CTA.",
      },
    ],
  },
  {
    slug: "quora-answer-assistant-lead-gen",
    categoryId: "seo-marketing",
    title: "Quora Answer Assistant for Lead Gen",
    description: "Draft Quora answers that provide value and support lead generation.",
    seoTitle: "Quora Answer Assistant for Lead Gen (Free) - Growth Hackers",
    seoDescription:
      "Generate Quora answers that educate and support lead generation. Free AI tool for growth marketers and content teams.",
    keywords: ["quora answer", "quora lead gen", "quora marketing", "quora growth"],
    useCases: ["Expert positioning", "Product-aware answers", "Newsletter signups", "Consulting leads"],
    examples: [
      "Short direct answer first. Then: [Context]. [Step-by-step]. [Resource or CTA if relevant].",
      "Avoid hard sell. Add value first; mention tool/resource only when it fits.",
    ],
    whoFor: ["Growth marketers", "Content marketers", "Founders building authority"],
    commonMistakes: ["Overtly promotional", "Generic answers", "No clear value before any CTA"],
    faqs: [
      {
        question: "How do I use Quora for lead generation?",
        answer:
          "Answer questions in your niche with genuine value. When relevant, mention a free resource, tool, or newsletter. Keep the answer helpful; the CTA subtle.",
      },
      {
        question: "What makes a good Quora answer?",
        answer:
          "Direct answer first, then context or steps. Use structure (bullets, paragraphs). Be specific and cite sources when possible. Avoid fluff.",
      },
      {
        question: "Should I link in every Quora answer?",
        answer:
          "No. Link only when it adds value (e.g., a tool or guide). Overlinking can look spammy and get collapsed. Focus on earning upvotes and trust first.",
      },
      {
        question: "How do I find the right questions to answer?",
        answer:
          "Search keywords related to your product or expertise. Choose questions with recent activity and enough views. Prioritize questions you can answer better than others.",
      },
      {
        question: "Can Quora drive qualified leads?",
        answer:
          "Yes, when you consistently provide useful answers in your niche. Over time, profile views and link clicks can turn into signups or demos. Track which topics convert.",
      },
    ],
  },
  {
    slug: "medium-article-subtitle-hook-creator",
    categoryId: "business-writing",
    title: "Medium Article Subtitle & Hook Creator",
    description: "Create subtitles and opening hooks for Medium articles and long-form content.",
    seoTitle: "Medium Article Subtitle & Hook Creator (Free) - Writers",
    seoDescription:
      "Generate Medium subtitles and opening hooks for articles. Free AI tool for writers and content creators.",
    keywords: ["medium subtitle", "article hook", "medium hook", "long form hook"],
    useCases: ["Essay openings", "How-to articles", "Personal stories", "Opinion pieces"],
    examples: [
      "Subtitle: [One line that expands the title and promises the takeaway]",
      "Hook: [Question, stat, or bold claim] that pulls the reader into the first paragraph.",
    ],
    whoFor: ["Medium writers", "Bloggers", "Long-form content creators"],
    commonMistakes: ["Subtitle repeats the title", "Hook is vague or slow", "No clear promise in first line"],
    faqs: [
      {
        question: "What is a Medium subtitle?",
        answer:
          "The line under the headline that appears in previews and on the article. It should expand on the title and promise what the reader will learn or feel.",
      },
      {
        question: "How long should a Medium subtitle be?",
        answer:
          "Often one sentence, 10–20 words. Make it specific and benefit-led. It’s the second thing people see after the title.",
      },
      {
        question: "What makes a strong article hook?",
        answer:
          "A question, surprising stat, bold claim, or short story that creates curiosity or tension. The reader should want to know what comes next.",
      },
      {
        question: "Should the hook be in the first sentence or first paragraph?",
        answer:
          "Ideally the first sentence. If you need one line of setup, keep it short. The hook should appear within the first 1–2 sentences.",
      },
      {
        question: "Can I use the same formula for different articles?",
        answer:
          "Yes. Use a consistent structure (e.g., question hook, then subtitle that promises the answer). Vary the topic and angle for each piece.",
      },
    ],
  },
  {
    slug: "user-persona-generator-marketing",
    categoryId: "seo-marketing",
    title: "User Persona Generator for Marketing",
    description: "Generate user personas with demographics, goals, and pain points for targeting.",
    seoTitle: "User Persona Generator for Marketing (Free) - Founders",
    seoDescription:
      "Generate marketing user personas: demographics, goals, pain points, and messaging angles. Free AI tool for founders and marketers.",
    keywords: ["user persona generator", "marketing persona", "buyer persona", "customer persona"],
    useCases: ["Ad targeting", "Content strategy", "Product messaging", "Sales enablement"],
    examples: [
      "[Name] – [Role], [Age range]. Goals: [X]. Pain points: [Y]. Message angle: [Z].",
      "Demographics, goals, frustrations, where they spend time, sample messaging.",
    ],
    whoFor: ["Founders", "Marketing teams", "Product and growth teams"],
    commonMistakes: ["Too many personas", "Vague pain points", "Personas not tied to messaging or channels"],
    faqs: [
      {
        question: "What is a marketing user persona?",
        answer:
          "A semi-fictional profile of an ideal customer: demographics, goals, pain points, and behaviors. Used to align messaging, content, and ads.",
      },
      {
        question: "How many personas should I create?",
        answer:
          "Start with 1–3. One primary and one or two secondary. Too many dilutes focus. Merge similar segments until you have distinct, actionable profiles.",
      },
      {
        question: "What should a persona include?",
        answer:
          "Name/alias, role, goals, pain points, objections, where they get information, and 1–2 sample message angles. Keep it to one page.",
      },
      {
        question: "How do I use personas for ads?",
        answer:
          "Use demographics and interests for targeting. Use pain points and goals for ad copy and landing page messaging. Test one persona per campaign when possible.",
      },
      {
        question: "Should personas be based on real data?",
        answer:
          "Yes. Use interviews, surveys, and analytics. Avoid making up details. Update personas when you learn more about your customers.",
      },
    ],
  },
  {
    slug: "tiktok-spark-ads-caption-writer",
    categoryId: "tiktok",
    title: "TikTok Spark Ads Caption Writer",
    description: "Write captions for TikTok Spark Ads (organic-style paid posts) for paid media buyers.",
    seoTitle: "TikTok Spark Ads Caption Writer (Free) - Paid Media Buyers",
    seoDescription:
      "Generate captions for TikTok Spark Ads that feel native and drive action. Free AI tool for paid media and performance teams.",
    keywords: ["tiktok spark ads", "spark ads caption", "tiktok paid ads", "spark ads copy"],
    useCases: ["Spark Ads from UGC", "In-feed ads", "Awareness and conversion campaigns"],
    examples: [
      "Caption: [Hook]. [Benefit or CTA]. [Hashtags if allowed].",
      "Keep it short. Match the tone of the creative. Clear CTA.",
    ],
    whoFor: ["Paid media buyers", "TikTok advertisers", "Brands running Spark Ads"],
    commonMistakes: ["Too salesy or off-brand tone", "Long captions", "No clear CTA"],
    faqs: [
      {
        question: "What are TikTok Spark Ads?",
        answer:
          "Spark Ads boost existing organic TikTok posts (yours or creators’). They look like native content and often perform well because they’re authentic creative.",
      },
      {
        question: "How long should a Spark Ad caption be?",
        answer:
          "Keep it short and native. One to three lines often work. Match the tone of the video. Include a clear CTA when the platform allows.",
      },
      {
        question: "What should the caption do?",
        answer:
          "Support the video: add context, reinforce the hook, or state the CTA. Avoid repeating the script word-for-word. Sound like the creator or brand voice.",
      },
      {
        question: "Can I use hashtags in Spark Ad captions?",
        answer:
          "Follow TikTok’s current policy for ads. When allowed, use 1–3 relevant hashtags. Don’t stuff; keep the caption clean and on-brand.",
      },
      {
        question: "How do I test Spark Ad performance?",
        answer:
          "Test different creatives and captions. Hold one variable constant (e.g., same video, different caption). Track CTR, conversion, and cost per result.",
      },
    ],
  },
  {
    slug: "meta-description-bulk-optimizer",
    categoryId: "seo-marketing",
    title: "Meta Description Bulk Optimizer",
    description: "Generate and optimize meta descriptions at scale for SEO agencies and site owners.",
    seoTitle: "Meta Description Bulk Optimizer (Free) - SEO Agencies",
    seoDescription:
      "Generate meta descriptions for multiple pages at once. Free AI tool for SEO agencies and in-house teams.",
    keywords: ["meta description generator", "bulk meta description", "seo meta", "meta description optimizer"],
    useCases: ["Site audits", "New site launches", "Template-based descriptions", "Refreshing old pages"],
    examples: [
      "[Primary keyword]: [Benefit or CTA] in [number] words. [Optional CTA].",
      "Template: [Topic] – [Key point]. [Proof or offer]. Learn more.",
    ],
    whoFor: ["SEO agencies", "In-house SEO teams", "Content managers with many pages"],
    commonMistakes: ["Duplicate or near-duplicate descriptions", "Over 160 characters", "No CTA or differentiation"],
    faqs: [
      {
        question: "How long should a meta description be?",
        answer:
          "Typically 150–160 characters so it doesn’t get truncated in search results. Some SERPs show more; aim for under 160 to be safe.",
      },
      {
        question: "Do meta descriptions affect ranking?",
        answer:
          "They don’t directly affect ranking but influence click-through rate. A clear, benefit-led description can improve CTR from search results.",
      },
      {
        question: "Should every page have a unique meta description?",
        answer:
          "Yes. Unique descriptions help CTR and avoid duplicate content signals. Use templates (e.g., “[Topic] – [Key point]”) and customize per page.",
      },
      {
        question: "What should a meta description include?",
        answer:
          "Primary keyword, clear benefit or summary, and a call to action or reason to click when space allows. Match search intent.",
      },
      {
        question: "How do I bulk-optimize meta descriptions?",
        answer:
          "Use a consistent template (e.g., [Topic]: [Benefit]. [CTA].). Pull page title or focus keyword per URL. Generate, then review for uniqueness and length.",
      },
    ],
  },
  {
    slug: "lead-magnet-idea-generator",
    categoryId: "seo-marketing",
    title: "Lead Magnet Idea Generator",
    description: "Generate lead magnet ideas (eBooks, checklists, templates) for list builders.",
    seoTitle: "Lead Magnet Idea Generator (Free) - List Builders",
    seoDescription:
      "Generate lead magnet ideas and angles for email list building. Free AI tool for marketers and list builders.",
    keywords: ["lead magnet ideas", "lead magnet generator", "list building", "email lead magnet"],
    useCases: ["Newsletter growth", "Product launch lists", "B2B lead gen", "Course waitlists"],
    examples: [
      "[Format]: [Topic] for [Audience] – e.g. Checklist: 10 Pre-Launch Steps for SaaS Founders",
      "eBook, checklist, template, webinar, mini-course, swipe file.",
    ],
    whoFor: ["List builders", "Content marketers", "Course creators and coaches"],
    commonMistakes: ["Ideas that don’t match audience pain", "Too broad or generic", "No clear delivery or follow-up"],
    faqs: [
      {
        question: "What is a lead magnet?",
        answer:
          "A free resource (eBook, checklist, template, etc.) offered in exchange for an email address. It should solve a specific problem and align with your offer.",
      },
      {
        question: "What formats work best for lead magnets?",
        answer:
          "Checklists, templates, and short guides often convert well because they’re easy to consume. Webinars and courses work for higher-consideration offers.",
      },
      {
        question: "How do I choose a lead magnet topic?",
        answer:
          "Match your audience’s biggest pain or goal. The lead magnet should be a natural step before your paid product (e.g., checklist before a course).",
      },
      {
        question: "Should I create one or many lead magnets?",
        answer:
          "Start with one strong lead magnet per audience or funnel. Test and optimize. Add more (e.g., by topic or stage) once the first performs.",
      },
      {
        question: "How do I promote a lead magnet?",
        answer:
          "Use landing pages, paid ads, content (blogs, videos), and social. Mention it in relevant content and in your bio or footer. Track signup and conversion by source.",
      },
    ],
  },
  {
    slug: "cold-outreach-linkedin-dm-script",
    categoryId: "business-writing",
    title: "Cold Outreach LinkedIn DM Script",
    description: "Generate cold LinkedIn DM scripts for sales teams and SDRs.",
    seoTitle: "Cold Outreach LinkedIn DM Script (Free) - Sales Teams",
    seoDescription:
      "Generate cold LinkedIn DM scripts for outreach and sales. Free AI tool for SDRs and sales teams.",
    keywords: ["linkedin cold message", "linkedin dm script", "cold outreach linkedin", "sales dm script"],
    useCases: ["B2B prospecting", "Recruiting", "Partnership outreach", "Event or webinar invites"],
    examples: [
      "Opener: [Personalized line]. [Reason for reaching out]. [One clear ask]. [Soft CTA].",
      "Keep first message under 300 characters. No long paragraphs.",
    ],
    whoFor: ["Sales development reps (SDRs)", "Sales teams", "Recruiters and partnership managers"],
    commonMistakes: ["Too long", "Generic copy-paste", "No personalization or clear ask"],
    faqs: [
      {
        question: "How long should a cold LinkedIn DM be?",
        answer:
          "Keep the first message short: often 75–150 words. One or two short paragraphs. Lead with relevance, then one clear ask.",
      },
      {
        question: "What should I include in a cold LinkedIn message?",
        answer:
          "A personalized opener (e.g., their role, company, or post), why you’re reaching out, and one specific ask (call, reply, resource). No lengthy pitch in the first message.",
      },
      {
        question: "How do I personalize at scale?",
        answer:
          "Use variables: name, company, role, recent post or news. Avoid obvious templates. One or two genuine personalization points per message.",
      },
      {
        question: "Should I follow up?",
        answer:
          "Yes. Send 1–2 follow-ups if no reply. Space them 3–5 days apart. Add value (e.g., a resource or new angle), don’t just repeat the first message.",
      },
      {
        question: "What’s the best way to avoid sounding spammy?",
        answer:
          "Write like a human: short, specific, and relevant. No hype or excessive punctuation. Reference something real about them or their company.",
      },
    ],
  },
  // ---- 10 traffic-focused tools ----
  {
    slug: "youtube-shorts-title-description-generator",
    categoryId: "youtube",
    title: "YouTube Shorts Title & Description Generator",
    description: "Generate titles and descriptions for YouTube Shorts to boost reach and CTR.",
    seoTitle: "YouTube Shorts Title & Description Generator (Free) - Viral Shorts Copy",
    seoDescription:
      "Generate 5 YouTube Shorts titles and descriptions in seconds. Free AI tool for Shorts creators and vertical video.",
    keywords: ["youtube shorts title", "shorts description", "youtube shorts description", "shorts title generator"],
    useCases: ["Vertical clips", "Shorts series", "Repurposed content", "Trending sound hooks"],
    examples: [
      "Title: [Hook] in [number] seconds",
      "Description: [One-line context]. [CTA: Like, Subscribe, Comment]",
      "Keep title under 60 chars for mobile; description 1–2 sentences.",
    ],
    whoFor: ["Shorts creators", "Channels testing vertical content", "Creators repurposing Reels/TikTok"],
    commonMistakes: ["Long titles that get cut off", "Empty or generic descriptions", "No CTA in description"],
    faqs: [
      { question: "How long should a YouTube Shorts title be?", answer: "Aim for under 60 characters so it doesn't get truncated on mobile. Lead with a hook or curiosity; avoid filler words." },
      { question: "Does the Shorts description affect reach?", answer: "Descriptions help context and search. Use 1–2 sentences with relevant keywords and a clear CTA. Avoid stuffing." },
      { question: "What's the difference from long-form YouTube titles?", answer: "Shorts titles are shorter and often more punchy or question-based. Focus on scroll-stopping clarity rather than full SEO sentences." },
      { question: "Should I use hashtags in Shorts descriptions?", answer: "You can use 2–3 relevant hashtags. Don't overdo it. Focus on one strong hook in the title first." },
      { question: "Can I use the same title for Shorts and TikTok/Reels?", answer: "You can test the same hook across platforms. Adjust length per platform (e.g., shorter for TikTok) and localize if needed." },
    ],
  },
  {
    slug: "instagram-carousel-caption-writer",
    categoryId: "instagram",
    title: "Instagram Carousel Caption Writer",
    description: "Write captions for Instagram carousel posts that drive saves and shares.",
    seoTitle: "Instagram Carousel Caption Writer (Free) - Save-Worthy Carousel Copy",
    seoDescription: "Generate carousel captions with hooks and CTAs. Free AI tool for Instagram carousel posts and slide decks.",
    keywords: ["instagram carousel caption", "carousel post caption", "carousel caption ideas", "instagram slides caption"],
    useCases: ["How-to carousels", "List posts", "Tips and quotes", "Before/after slides"],
    examples: ["Hook: Save this if you want [outcome]. Swipe for [number] steps.", "Slide 1: Hook | Slides 2–N: One tip per slide | Last: CTA (Save, Share, Follow)", "End with: Which tip will you try first? Comment below."],
    whoFor: ["Instagram creators", "Educators and coaches", "Brands using carousels for engagement"],
    commonMistakes: ["No hook in first line", "Too much text per slide", "Missing CTA to save or share"],
    faqs: [
      { question: "What makes a carousel caption perform well?", answer: "A strong first line that promises value (e.g., Save this for…), clear structure, and a CTA to save, share, or comment. Keep the opener under 125 characters for preview." },
      { question: "How long should a carousel caption be?", answer: "Lead with a short hook (1–2 lines). You can add more context below the fold. Many users only see the first line before more." },
      { question: "Should I tease the slides in the caption?", answer: "Yes. A quick Swipe for 5 tips or Slide 2 is the game-changer can increase swipes. Don't give everything away in the caption." },
      { question: "How do I get more saves on carousels?", answer: "Use Save this or Bookmark this in the hook or CTA. Make the content clearly useful (checklists, steps, templates)." },
      { question: "Can I use the same format for every carousel?", answer: "Yes. A consistent format (e.g., hook + Swipe for X tips + CTA) helps your audience know what to expect and can improve engagement over time." },
    ],
  },
  {
    slug: "reddit-post-title-hook-generator",
    categoryId: "business-writing",
    title: "Reddit Post Title & Hook Generator",
    description: "Generate Reddit post titles and opening hooks that get upvotes and discussion.",
    seoTitle: "Reddit Post Title & Hook Generator (Free) - Viral Reddit Titles",
    seoDescription: "Generate Reddit post titles and hooks for more upvotes and comments. Free AI tool for Reddit marketers and community builders.",
    keywords: ["reddit post title", "viral reddit title", "reddit title generator", "reddit hook"],
    useCases: ["AMA-style posts", "Story posts", "Tips and advice", "Question threads"],
    examples: ["Title: [Unexpected angle] – [Proof or number]. [Question or twist].", "Avoid: ALL CAPS, clickbait without delivery. Use: specific, genuine, discussion-friendly.", "Hook: First 1–2 sentences that deliver value or intrigue so people click See more."],
    whoFor: ["Reddit marketers", "Community managers", "Creators building authority on Reddit"],
    commonMistakes: ["Clickbait that doesn't deliver", "Too promotional", "Ignoring subreddit rules and tone"],
    faqs: [
      { question: "What makes a Reddit post title get upvotes?", answer: "Specificity, authenticity, and a clear reason to click (story, tip, or question). Match the subreddit's tone and rules. Avoid obvious self-promotion." },
      { question: "How long should a Reddit title be?", answer: "Depends on the sub. Many successful posts use 50–100 characters. Some subs allow longer. Be clear and avoid filler." },
      { question: "Should I use questions in Reddit titles?", answer: "Questions work well in discussion-focused subs. Make them specific so people want to answer. Avoid yes/no questions that don't spark conversation." },
      { question: "How do I avoid getting downvoted for self-promotion?", answer: "Lead with value: share a story, tip, or insight first. If you mention your product or link, make it helpful and relevant. Follow each sub's self-promo rules." },
      { question: "Can I reuse the same title format across subs?", answer: "You can use a similar structure, but customize for each sub's culture and rules. Copy-pasting the same title everywhere often gets removed or downvoted." },
    ],
  },
  {
    slug: "landing-page-headline-subheadline-generator",
    categoryId: "business-writing",
    title: "Landing Page Headline & Subheadline Generator",
    description: "Generate hero headlines and subheadlines for landing pages that convert.",
    seoTitle: "Landing Page Headline & Subheadline Generator (Free) - High-Converting Headlines",
    seoDescription: "Generate landing page headlines and subheadlines for higher conversion. Free AI tool for marketers and founders.",
    keywords: ["landing page headline", "hero headline generator", "landing page copy", "headline subheadline"],
    useCases: ["Product pages", "Lead gen landing pages", "Pricing pages", "Webinar signup"],
    examples: ["Headline: [Outcome] in [Timeframe] – Without [Objection]", "Subheadline: [One sentence benefit]. [Proof or differentiator]. [CTA hint].", "Keep headline under 10 words; subheadline 1–2 sentences."],
    whoFor: ["Growth and conversion teams", "Founders launching pages", "Agencies running paid traffic"],
    commonMistakes: ["Vague or feature-led headlines", "Subheadline repeating the headline", "No clear outcome or audience"],
    faqs: [
      { question: "What makes a high-converting landing page headline?", answer: "A clear outcome or benefit, audience relevance, and minimal friction. Use active language and address a main objection or desire." },
      { question: "How long should the hero headline be?", answer: "Often 5–10 words. It should be scannable in under 3 seconds. Use the subheadline to expand on the promise." },
      { question: "Should headline and subheadline say the same thing?", answer: "No. Headline = main promise or hook. Subheadline = brief proof, benefit, or next step. They should complement, not repeat." },
      { question: "How do I test landing page headlines?", answer: "A/B test one variable at a time (headline vs headline, or subheadline vs subheadline). Use the same traffic source and audience for valid comparison." },
      { question: "Should I include the product name in the headline?", answer: "Only if the brand is well known or the name itself conveys benefit. Otherwise lead with outcome or benefit; mention the product in the subheadline or body." },
    ],
  },
  {
    slug: "substack-newsletter-title-teaser-generator",
    categoryId: "business-writing",
    title: "Substack Newsletter Title & Teaser Generator",
    description: "Generate Substack post titles and preview teasers for more opens and clicks.",
    seoTitle: "Substack Newsletter Title & Teaser Generator (Free) - More Opens",
    seoDescription: "Generate Substack newsletter titles and preview teasers. Free AI tool for newsletter writers and creators.",
    keywords: ["substack title", "newsletter title generator", "substack teaser", "newsletter preview"],
    useCases: ["Weekly digests", "Essay-style posts", "Launch announcements", "Series installments"],
    examples: ["Title: [Curiosity or benefit]. [Specificity]. [Optional number or hook].", "Teaser: 1–2 sentences for email preview. Don't give away the punchline; create click-through.", "Match tone to your brand: serious, conversational, or punchy."],
    whoFor: ["Substack writers", "Newsletter creators", "Authors and thought leaders"],
    commonMistakes: ["Vague titles", "Teaser that repeats the title", "No curiosity or benefit in preview"],
    faqs: [
      { question: "What should a Substack post title do?", answer: "It should promise a clear takeaway or story and work in both the inbox and the Substack feed. Avoid clickbait that doesn't deliver." },
      { question: "How long should the preview teaser be?", answer: "Usually 1–2 sentences (around 100–150 characters for many email clients). Make it complement the title and drive opens." },
      { question: "Do Substack titles affect SEO?", answer: "Yes. Substack posts can rank in search. Use clear, descriptive titles and avoid cryptic or purely clever phrasing if you want discovery." },
      { question: "Should I use the same title format every week?", answer: "A consistent format (e.g., Issue #X: [Topic]) can build recognition. Vary the topic and angle so each title feels fresh." },
      { question: "How do I get more opens with the teaser?", answer: "Create curiosity or state a benefit. Don't repeat the title word-for-word. Tease a key insight or question that's answered in the post." },
    ],
  },
  {
    slug: "threads-meta-post-hook-generator",
    categoryId: "instagram",
    title: "Threads (Meta) Post Hook Generator",
    description: "Generate hooks and opening lines for Threads posts to stop the scroll.",
    seoTitle: "Threads Post Hook Generator (Free) - Meta Threads Hooks",
    seoDescription: "Generate Threads (Meta) post hooks and opening lines. Free AI tool for Threads creators and brands.",
    keywords: ["threads post hook", "threads app post", "meta threads", "threads caption"],
    useCases: ["Hot takes", "Quick tips", "Conversation starters", "Product or update drops"],
    examples: ["Hook: [Bold claim or question]. [One-line context].", "Threads favor short, conversational copy. First line = hook.", "End with a question or CTA to boost replies."],
    whoFor: ["Threads creators", "Brands testing Meta's text-first platform", "Creators repurposing from Twitter/X"],
    commonMistakes: ["Long intros", "Generic openers", "No reason to reply or share"],
    faqs: [
      { question: "What is Threads (Meta)?", answer: "Threads is Meta's text-based app linked to Instagram. Posts are short and conversational; hooks and first lines matter for engagement." },
      { question: "How long should a Threads post be?", answer: "Short posts often perform well. Lead with a strong first line (hook). You can use multiple lines, but keep the opener punchy." },
      { question: "What kind of hooks work on Threads?", answer: "Questions, hot takes, and quick tips tend to get replies. Match the casual, conversational tone of the platform." },
      { question: "Can I reuse Twitter/X hooks on Threads?", answer: "You can test the same angles. Adjust for tone if needed; Threads can feel slightly more casual. Test and see what gets more engagement." },
      { question: "How do I get more replies on Threads?", answer: "End with a clear question or invite to share an opinion. Keep the post easy to respond to in one sentence." },
    ],
  },
  {
    slug: "linkedin-carousel-text-generator",
    categoryId: "business-writing",
    title: "LinkedIn Carousel Text Generator",
    description: "Generate slide-by-slide text for LinkedIn carousels that get reach and engagement.",
    seoTitle: "LinkedIn Carousel Text Generator (Free) - Slide Copy for Carousels",
    seoDescription: "Generate LinkedIn carousel slide text with hooks and structure. Free AI tool for LinkedIn creators and B2B marketers.",
    keywords: ["linkedin carousel", "linkedin carousel text", "carousel slide copy", "linkedin slides"],
    useCases: ["Framework carousels", "List posts", "Tips and lessons", "Before/after or case studies"],
    examples: ["Slide 1: Hook + Swipe for X steps | Slides 2–N: One idea per slide, short lines | Last: CTA (Comment, Save, Follow)", "Use numbers and bullets. Keep each slide to 1–3 lines.", "Title slide: [Outcome] in [Number] Steps / Tips"],
    whoFor: ["LinkedIn creators", "B2B marketers", "Coaches and consultants"],
    commonMistakes: ["Too much text per slide", "Weak first slide", "No CTA on last slide"],
    faqs: [
      { question: "What makes a LinkedIn carousel perform well?", answer: "A strong first slide that promises value, one clear idea per slide, and a final slide with a CTA (comment, save, follow). Keep text minimal and scannable." },
      { question: "How many slides should a LinkedIn carousel have?", answer: "Often 5–10. Enough to deliver value, not so many that people drop off. Test what your audience finishes." },
      { question: "Should every slide have a headline?", answer: "A short headline or number per slide helps. It creates rhythm and makes the carousel easy to follow." },
      { question: "How do I get more saves on LinkedIn carousels?", answer: "Make it clearly useful (framework, checklist, steps). Use Save this or Bookmark in the first or last slide. Deliver what the hook promises." },
      { question: "Can I use the same format for different topics?", answer: "Yes. A repeatable format (e.g., X lessons from Y) builds recognition. Swap the topic and examples for each new carousel." },
    ],
  },
  {
    slug: "blog-outline-section-headings-generator",
    categoryId: "seo-marketing",
    title: "Blog Outline & Section Headings Generator",
    description: "Generate blog outlines and section headings for SEO and readability.",
    seoTitle: "Blog Outline & Section Headings Generator (Free) - SEO Article Structure",
    seoDescription: "Generate blog outlines and H2/H3 headings for articles. Free AI tool for content marketers and SEO.",
    keywords: ["blog outline generator", "article outline", "blog structure", "section headings seo"],
    useCases: ["Pillar pages", "How-to guides", "List posts", "Comparison articles"],
    examples: ["Outline: Intro → [H2] → [H2] → [H2] → Conclusion / CTA", "Each H2: clear, keyword-aware, scannable. H3s under each for sub-points.", "Match structure to intent: steps for how-to, pros/cons for comparison."],
    whoFor: ["Content marketers", "SEO teams", "Bloggers and writers"],
    commonMistakes: ["Vague headings", "Too many top-level sections", "Structure that doesn't match search intent"],
    faqs: [
      { question: "Why does blog structure matter for SEO?", answer: "Clear H2/H3 structure helps Google understand the page and can support featured snippets. It also improves readability and time on page." },
      { question: "How many H2 sections should a blog post have?", answer: "Depends on length. Often 3–6 H2s for a 1,500-word post. Each H2 should cover one main idea; use H3s for sub-points." },
      { question: "Should headings include keywords?", answer: "Include target keywords naturally in 1–2 headings. Prioritize clarity and match to search intent. Don't stuff every heading." },
      { question: "What's a good outline for a how-to article?", answer: "Intro (problem + promise) → Prerequisites (if needed) → Step 1, 2, 3… → Tips or common mistakes → Conclusion / next steps." },
      { question: "Can I use the same outline for similar topics?", answer: "Yes. Use a template (e.g., What is X, Why it matters, How to do it, Examples, FAQ) and customize headings per topic." },
    ],
  },
  {
    slug: "testimonial-review-request-email-generator",
    categoryId: "business-writing",
    title: "Testimonial & Review Request Email Generator",
    description: "Generate emails to request testimonials and reviews from customers.",
    seoTitle: "Testimonial & Review Request Email Generator (Free) - Get More Reviews",
    seoDescription: "Generate testimonial and review request emails that get responses. Free AI tool for B2B, e-commerce, and service businesses.",
    keywords: ["testimonial request email", "review request template", "ask for review email", "testimonial email"],
    useCases: ["Post-purchase reviews", "B2B case study requests", "Google/review site asks", "LinkedIn recommendations"],
    examples: ["Subject: Quick favor? [Outcome they got] in [timeframe]", "Body: Thank them → One specific ask (1–2 sentences) → Easy yes (link or one question) → Thank again.", "Keep under 100 words. One clear CTA."],
    whoFor: ["E-commerce brands", "B2B sales and customer success", "Agencies and freelancers"],
    commonMistakes: ["Long emails", "Asking for too much", "No clear next step or link"],
    faqs: [
      { question: "When should I send a testimonial request?", answer: "After a positive outcome: post-delivery, after a win, or when they've expressed satisfaction. Timing matters more than volume." },
      { question: "How long should a review request email be?", answer: "Short: 50–100 words. Thank them, state one ask (review, quote, or recommendation), and add a direct link or one question." },
      { question: "What if they don't reply?", answer: "Send one polite follow-up after 5–7 days. Offer to make it easier (e.g., answer 2 questions by email). Don't over-follow-up." },
      { question: "Should I offer an incentive for reviews?", answer: "Only if it's allowed by the platform (e.g., Google's policy). For testimonials, a thank-you or small gesture is fine; avoid pay-for-review." },
      { question: "Can I use the same email for B2B and e-commerce?", answer: "Use a template and customize: B2B might ask for a case study or quote; e-commerce often asks for a star rating and short review. Tone and ask should match the relationship." },
    ],
  },
  {
    slug: "instagram-tiktok-hashtag-set-generator",
    categoryId: "tiktok",
    title: "Instagram & TikTok Hashtag Set Generator",
    description: "Generate hashtag sets for Instagram and TikTok to improve discoverability.",
    seoTitle: "Instagram & TikTok Hashtag Generator (Free) - Hashtag Sets for Reach",
    seoDescription: "Generate hashtag sets for Instagram and TikTok posts. Free AI tool for creators and social media managers.",
    keywords: ["instagram hashtags", "tiktok hashtags", "hashtag generator", "hashtag set"],
    useCases: ["Niche content", "Trending topics", "Branded hashtags", "Campaign tags"],
    examples: ["Mix: 2–3 broad (#fyp, #viral) + 3–5 niche (#[topic]tips, #[audience]) + 1–2 branded", "Instagram: up to 30; TikTok: 3–5 often enough. Prioritize relevance over volume.", "Avoid banned or suppressed tags; check platform guidelines."],
    whoFor: ["Instagram and TikTok creators", "Social media managers", "Brands running hashtag campaigns"],
    commonMistakes: ["Only using huge generic tags", "Irrelevant hashtags", "Using banned or broken hashtags"],
    faqs: [
      { question: "How many hashtags should I use on Instagram?", answer: "You can use up to 30. Many accounts use 5–15. Mix niche (relevant to content) with a few broader tags. Test what works for your audience." },
      { question: "How many hashtags for TikTok?", answer: "Often 3–5 focused hashtags work. TikTok relies heavily on sounds and trends; hashtags support discovery but aren't the only lever." },
      { question: "Should I use the same hashtags every time?", answer: "Use a core set for your niche and add 2–3 per post that are specific to the content. Avoid copying the exact same block on every post if the platform may treat it as spam." },
      { question: "Do hashtags still work in 2025?", answer: "Yes, but impact varies by platform. Instagram uses them for explore and search; TikTok uses them for trends and topics. Focus on relevant, active tags." },
      { question: "How do I find good niche hashtags?", answer: "Search your topic in the app, check what similar creators use, and look at related or suggested tags. Prefer tags with steady posts, not only millions or only a handful." },
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
