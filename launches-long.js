// Realistic-volume daily digest used for the dense / long-form layout.
// Schema mirrors what a scraping + summarization agent would emit.
window.LAUNCH_DATA_LONG = {
  date: "Sunday, May 24, 2026",
  dateShort: "May 24",
  generator: "OpenClaw",
  stats: { builders: 30, posts: 101, github: 79, hn: 49, qualified: 10 },
  sections: [
    {
      id: "launches",
      icon: "🚀",
      title: "Product Launches",
      items: [
        {
          who: "@tibo_maker",
          subject: "Revid Auto-Mode",
          body: "Watches a YouTube/TikTok channel nightly, detects new videos, and generates similar content with changes.",
          link: "revid.ai/automations",
        },
        {
          who: "@jocarrasqueira",
          subject: "Gemini App Video",
          body: "New \"talking pet\" feature — a talking John clip on Hawaiian shores.",
          link: "nitter.net/jocarrasqueira",
        },
      ],
    },
    {
      id: "tools",
      icon: "🛠",
      title: "New Tools & Repositories",
      items: [
        {
          who: "@petergyang",
          subject: "Solo-startup ops with AI agents",
          body: "Podcast featuring OpenClaw as AI chief of staff, plus Codex / Devin as AI engineers.",
          link: "podcast.peterg.ai",
        },
        {
          who: "@jasonlk",
          subject: "Anthropic sales-rep onboarding",
          body: "SaaStr deep-dive: bootcamp, an MCP connector sales plug-in, and 5 encoded Claude skills.",
          link: "saastr.com/anthropic",
        },
      ],
    },
    {
      id: "workflows",
      icon: "⚙️",
      title: "Development Workflows",
      items: [
        {
          who: "@levelsio",
          body: "Corrected a billing mistake — sub revenue is $12,485/mo, down from the previously believed $13,707/mo.",
        },
        {
          who: "@marclou",
          body: "Closed Startup Acquisition #92 on TrustMRR — AI startup analyzing TikTok videos to predict virality. 11 days including escrow.",
          link: "trustmrr.com/92",
        },
        {
          who: "@marclou",
          body: "Avery Technology, LLC now hot on TrustMRR — 3 interested buyers, $150k asking price.",
          link: "trustmrr.com/avery",
        },
        {
          who: "@rauchg",
          body: "Processed 1,400 replies to \"show me the thing you've built with AI you're most proud of.\" Codex mentioned more than Claude Code; Anthropic still leads by model mentions.",
          link: "nitter.net/rauchg",
        },
        {
          who: "@lennysan",
          body: "Event hit 2,000+ applications for 1,000 spots in 36 hours — up from 1,500 in 24 hours before speakers were announced.",
          link: "nitter.net/lennysan",
        },
      ],
    },
    {
      id: "signals-1",
      icon: "📡",
      title: "Signals & Trends",
      items: [
        {
          subject: "Builders naming concrete tools",
          body: "@rauchg's 1,400-reply prompt shows Codex now surfaces more than Claude Code in builder mentions — even as Anthropic still leads on model mentions.",
        },
        {
          subject: "Speaker announcements move event demand",
          body: "@lennysan's curve went from 1,500 applications in 24h to 2,000+ in 36h — announced speakers still materially accelerate signup velocity.",
        },
      ],
    },
    {
      id: "products",
      icon: "🆕",
      title: "New Products Worth Watching",
      items: [
        {
          subject: "Deepseek-v4-Pro-App",
          body: "Windows desktop app + chat client around DeepSeek's model, with a setup guide for running locally or via free API. Lowers the barrier to trying a capable AI assistant in a desktop workflow — where many product teams test real usage.",
          link: "github.com/mikaeldengale-cloud/Deepseek-v4-Pro-App",
          source: "GitHub",
        },
      ],
    },
    {
      id: "repos",
      icon: "🔧",
      title: "New Repos & Open-Source Tools",
      items: [
        {
          subject: "study8677/awesome-architecture",
          stars: "21",
          body: "Visual architecture guide — 21 system-design maps covering AI gateways, RAG, agents, vector DBs, model serving. Useful for PMs: shows how builders are thinking about the plumbing.",
          link: "github.com/study8677/awesome-architecture",
          source: "GitHub",
        },
        {
          subject: "SaroirCommunity/Spiderbrain-V3",
          stars: "40",
          body: "Skill framework for Claude, Cursor, and similar tools to use fewer tokens and make fewer mistakes. Cost + reliability are becoming product differentiators.",
          link: "github.com/SaroirCommunity/Spiderbrain-V3",
          source: "GitHub",
        },
        {
          subject: "norika1207-lab/mercury-mcp",
          stars: "24",
          body: "Database of LLM architecture knowledge exposed as tools for coding agents to query mid-task. Points to a \"reference layer\" category for AI systems.",
          link: "github.com/norika1207-lab/mercury-mcp",
          source: "GitHub",
        },
        {
          subject: "bryanyzhu/agentic-ai-system-course",
          stars: "97",
          body: "Course on designing, building, and running production AI agents using an agent-to-learn-agent approach. Market still needs education turning demos into reliable systems.",
          link: "github.com/bryanyzhu/agentic-ai-system-course",
          source: "GitHub",
        },
      ],
    },
    {
      id: "builders",
      icon: "🚀",
      title: "Builder Launches & Experiments",
      items: [
        {
          subject: "Kanban CLI",
          body: "Terminal-based task manager designed for a local-first, agent-first workflow — AI tools and humans share a lightweight project board. The shift from \"chat with AI\" to \"AI manages work in the same system people use.\"",
          link: "codeberg.org/hydrafog/kanban",
          source: "Codeberg",
        },
      ],
    },
    {
      id: "signals-2",
      icon: "📡",
      title: "Signals & Trends",
      items: [
        {
          subject: "Constraint Decay",
          body: "AI coding tools still drift off-spec as backend tasks get longer — explains why buyers care as much about guardrails and verification as raw generation quality.",
          link: "arxiv.org/abs/2605.06445",
        },
        {
          subject: "Google Antigravity CLI",
          body: "Terminal-first agent workflows mainstream enough that big brands now package them directly. \"Run coding agents from the command line\" is moving from niche to product category.",
          link: "producthunt.com/products/google-antigravity",
        },
      ],
    },
  ],
};
