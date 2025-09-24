![newsGPT by ⌘ Langbase][cover]
# newsGPT - AI-Powered News

An AI-powered newsletter generator that turns long-form news into concise, engaging TL;DR digests. Built with Langbase, it helps you stay up to date on tech and AI without the noise.

🚀 [Live Demo](https://newsGPT.langbase.dev/)

## What newsGPT can do

newsGPT simplifies how you consume news by generating newsletters based on prompt:

- **TL;DR Generation**: Summarize long articles into short, scannable digests
- **Newsletter Creation**: Generate daily or weekly AI/tech newsletters instantly
- **Context-Aware Summaries**: Preserve important details while cutting the fluff
- **Prompt Shortcuts**: Pre-written prompts for quick newsletter creation

## Architecture Overview

This project demonstrates how to build a production-ready AI news tool using:

- **Frontend**: React + TypeScript for a clean, modern UI
- **Backend**: Cloudflare Workers for lightweight, serverless execution
- **AI Layer**: Langbase workflows for structured summarization and newsletter generation
- **Langbase Web Search**: Crawling web for relevant news articles

## How Langbase powers newsGPT

Langbase is the backbone of newsGPT's AI capabilities.

### 1. Agent workflow setup

First, it defines workflow primitive to keep things structured:

```typescript
// worker/agent.ts
import { Langbase } from "langbase"

export async function newsGPT({ input, env }: newsGPTParams) {
  const langbase = new Langbase({ apiKey: env.LANGBASE_API_KEY });

  const workflow = langbase.workflow();
  const { step } = workflow;

  const processResult = await step({
    id: "process_news",
    run: async () => {
      const response = await langbase.agent.run({
        model: "openai:gpt-4.1-mini",
        apiKey: env.OPENAI_API_KEY!,
        instructions: `
        You are an AI news analyst specializing in technology trends...
      `,
        input: [
          {
            role: "user",
            content: `Here are the latest AI news articles.
            Please analyze them and create newsletter items:\n\n${searchResults.map(result => `URL: ${result.url}\nContent: ${result.content}`).join('\n\n')
              }`
          }
        ],
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

      const parsed = JSON.parse(response.output);
      return parsed;
    }
  });
  
  return processResult
}
```

### 2. Langbase Web Search tool

It uses Exa search capability with Langbase Web Search.

```typescript
// worker/agent.ts
const searchResults = await step({
  id: "search_ai_news",
  run: async () => {
    const query = input;

    return await langbase.tools.webSearch({
      service: 'exa',
      query: query,
      totalResults: 5,
      apiKey: env.EXA_API_KEY!
    });
  }
});
```
### 3. Structured outputs

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

const jsonSchema = zodToJsonSchema(newsItemsSchema, { target: 'openAi' });
```

### 4. API endpoint setup

This is the API endpoint that handles the request:

```typescript
// worker/langbase.ts
export const registerLangbaseEndpoint = (app) => {
  app.post("/api/langbase", async (c) => {
    const { input } = await c.req.json();
    
    const output = await newsgpt({
      input,
      env: c.env, // Cloudflare environment variables
    });

    return c.json({ output });
  });
};
```

## Quick Start Guide

### Prerequisites
- Node.js 21+
- A [Langbase account](https://langbase.com) and API key
- OpenAI API key
- [EXA](https://exa.ai) API key

### 1. **Clone and install:**
```bash
npx degit LangbaseInc/langbase-examples/examples/newsgpt newsgpt && cd newsgpt
cd newsgpt
npm install
```

### 2. **Environment setup**

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

## Example prompts

- Summarize today's AI news with citations
- TL;DR the top 5 market stories for busy executives
- Brief me on climate policy updates this week
- Explain 3 biggest sports headlines like I'm 12

## Key Components Explained

### **Frontend (React)**

The UI is built with modern React patterns:

```typescript
// src/components/App.tsx
export function Agent() {
  const handleSubmit = async (e) => {
    const response = await fetch("/api/langbase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: input.trim() })
    });
    
    const data = await response.json();
    setResponse(data.output);
  };
}
```

### **Worker Backend (Hono)**

Cloudflare Workers handle the serverless backend:

```typescript
// worker/index.ts
import { Hono } from 'hono';
import { registerLangbaseEndpoint } from './langbase';

const app = new Hono();
app.use('*', cors());

// Register the Langbase agent endpoint
registerLangbaseEndpoint(app);

export default {
  fetch(request, env, ctx) {
    return app.fetch(request, env, ctx)
  }
}
```

### **Agent instructions**

The agent is configured with special instructions:

```typescript
instructions: `You are an AI news analyst specializing in technology trends.
Create a newsletter with summaries for each AI news article.
For each article:
1. One-liner summary
2. Include the source website name
3. Include the full URL

Return a structured JSON with an array of news items.`
```

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
wrangler secret put EXA_API_KEY
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
newsgpt/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   └── newsgpt/        # UI components
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
└── vite.config.ts        # Vite build configuration
```

## Key Langbase Features Used

1. **Workflow primitive**: Orchestrates multi-step agent operations
2. **Langbase Web Search**: Langbase-hosted web search tool
3. **Agent Runtime**: Handles LLM interactions with context management
4. **Step Functions**: Breaks complex operations into manageable steps

## Learn More

- **[Langbase Documentation](https://langbase.com/docs)** - Complete platform guide
- **[Langbase Web Search](https://langbase.com/docs/examples/tools/web-search)** - Langbase Web Search integration
- **[MCP Servers](https://langbase.com/docs/mcp-servers)** - Available integrations  
- **[API Reference](https://langbase.com/docs/api-reference)** - Detailed API docs

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

[cover]: https://github.com/LangbaseInc/docs-images/blob/main/examples/newsgpt/newsgpt.png?raw=true