# newsGPT - AI-Powered News Summary Generator

An AI-powered newsletter generator that turns long-form news and articles into concise, engaging TL;DR digests. Built with Langbase, it helps you stay up to date on tech and AI without the noise.

## Live Demo

Explore the live application at: [newsGPT.langbase.dev](https://newsGPT.langbase.dev/)

## What newsGPT can do

newsGPT simplifies how you consume news by generating structured newsletters:

- TL;DR Generation: Summarize long articles into short, scannable digests
- Newsletter Creation: Generate daily or weekly AI/tech newsletters instantly
- Context-Aware Summaries: Preserve important details while cutting the fluff
- Smart Highlights: Extract key points, quotes, and insights from articles
- Prompt Shortcuts: Pre-written prompts for quick newsletter creation

## How it works

newsGPT combines cutting-edge AI technologies to deliver relevant and accurate news summaries:

1. **Web Search**: Uses the Exa API to search for the latest news articles based on your input query
2. **AI Processing**: Leverages OpenAI's GPT-4.1-mini model to analyze and summarize the articles
3. **Structured Output**: Returns structured JSON with article summaries, sources, and URLs
4. **Frontend Display**: Beautifully formatted UI to present the news summary in an easy-to-scan format

## Architecture Overview

This project demonstrates how to build a production-ready AI news tool using:

- Frontend: React + TypeScript for a clean, modern UI
- Backend: Cloudflare Workers for lightweight, serverless execution
- AI Layer: Langbase workflows for structured summarization and newsletter generation

### Frontend (React + TypeScript)

- Built with React 19 and TypeScript
- Styled with Tailwind CSS and custom UI components
- Uses Hono for HTTP server middleware
- Implements error boundaries and toast notifications

### Backend (Cloudflare Workers)
- Built with Hono.js framework
- Deployed as Cloudflare Workers for global distribution
- Uses Langbase SDK to orchestrate AI workflows
- Integrates with Exa API for web search and OpenAI for summarization

## How Langbase powers newsGPT

Langbase is the backbone of newsGPT's AI capabilities.

### 1. Agent workflow setup

First, it defines workflow primitive to keep things structured:

```typescript
// worker/agent.ts
import { Langbase } from "langbase"

const workflow = langbase.workflow();
const { step } = workflow;
```

### 2. Langbase web search tool

It uses Exa search capability with Langbase web search to search news articles.

```typescript
// worker/agent.ts
const searchResults = await step({
  id: "search_ai_news",
  run: async () => {
    return await langbase.tools.webSearch({
      service: 'exa',
      query: query,
      totalResults: 5,
      apiKey: env.EXA_API_KEY!
    });
  }
});
```

### 3. AI agent with structured outputs
```typescript
// worker/agent.ts
const response = await langbase.agent.run({
  model: "openai:gpt-4.1-mini",
  apiKey: env.OPENAI_API_KEY!,
  instructions: "You are an AI news analyst specializing in technology trends...",
  input: [...],
  stream: false,
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "NewsletterItems",
      schema: jsonSchema,
      strict: true,
    },
  },
});
```

### 4. Structured outputs

Uses structured outputs to enforce consistent results from LLM.

```typescript
// worker/agent.ts
const newsItemSchema = z.object({
  summary: z.string(),
  url: z.string(),
  source: z.string(),
});

const newsItemsSchema = z.object({
  newsItems: z.array(newsItemSchema)
});
```

## Quick Start Guide

### Prerequisites
- Node.js 21+
- A [Langbase account](https://langbase.com) and API key
- OpenAI API key
- [EXA](https://exa.ai) API key

1. **Clone and install:**
```bash
npx degit LangbaseInc/langbase-examples/examples/newsgpt newsgpt && cd newsgpt
cd newsgpt
npm install
```

2. **Environment setup**

Copy the environment template:

```bash
cp .env.example .env
```

Add your API keys to `.env`:

```env
LANGBASE_API_KEY="your_langbase_api_key"
OPENAI_API_KEY="your_openai_api_key"
EXA_API_KEY="your_exa_api_key
```
### 3. **Run Development Server**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to start using newsGPT!

## Example Use Cases

- Summarize today's AI news with citations
- TL;DR the top 5 market stories for busy executives
- Brief me on climate policy updates this week
- Explain 3 biggest sports headlines like I'm 12

## Deployment

### **Deploy to Cloudflare Workers**

1. **Build the project:**
```bash
npm run build
```

2. **Deploy with Wrangler:**
```bash
npm run deploy
```

3. **Set environment variables in Cloudflare:**
```bash
wrangler secret put LANGBASE_API_KEY
wrangler secret put OPENAI_API_KEY  
wrangler secret put SLACK_BOT_TOKEN
```

Your agent will be live at `https://your-worker.your-subdomain.workers.dev`

## Testing

Run the test suite:

```bash
npm test
```

The project includes Cloudflare Workers testing setup with Vitest.

## Project Structure

```
newsGPT/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   └── newsGPT/        # newsGPT-specific components
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── worker/                # Cloudflare Worker backend
│   ├── index.ts           # Main worker entry point
│   ├── agent.ts           # Langbase workflow implementation
│   └── langbase.ts        # Langbase endpoint registration
├── public/                # Static assets
├── package.json          # Dependencies and scripts
├── wrangler.jsonc        # Cloudflare Workers configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # This file
```

## Key Langbase Features Used

1. **Workflow primitive**: Orchestrates multi-step agent operations
2. **MCP Integration**: Connects to Slack through standardized protocol  
3. **Agent Runtime**: Handles LLM interactions with context management
4. **Step Functions**: Breaks complex operations into manageable steps

## 🛡️ Security & Best Practices

- Environment variables for sensitive API keys
- CORS and security headers configured
- Input validation and sanitization
- Secure token storage and transmission

## 📚 Learn More

- **[Langbase Documentation](https://langbase.com/docs)** - Complete platform guide
- **[MCP Servers](https://langbase.com/docs/mcp-servers)** - Available integrations  
- **[API Reference](https://langbase.com/docs/api-reference)** - Detailed API docs
- **[Langbase Web Search](https://langbase.com/docs/examples/tools/web-search)** - Langbase Web Search integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using [Langbase](https://langbase.com) - The AI infrastructure for developers**