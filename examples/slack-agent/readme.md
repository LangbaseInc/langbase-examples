# 🤖 Slack Agent with Langbase

A powerful AI-powered Slack agent built with Langbase that lets you interact with your Slack workspace using natural language. Ask questions, get insights, and manage your Slack workspace through an intelligent conversational interface.

**🚀 [Live Demo](https://slack-agent.langbase.dev/)**

## ✨ What This Agent Can Do

This Slack agent provides comprehensive workspace management through AI:

- **👥 User Management**: Get member lists, profiles, and status information
- **💬 Message Operations**: Post messages, reply to threads, and react with emojis  
- **📋 Channel Discovery**: List channels, get channel info, and browse conversations
- **🔍 Smart Search**: Find messages, conversations, and topics across your workspace
- **📊 Insights**: Generate summaries and digests from channel conversations
- **⏰ History Access**: Retrieve message history and thread conversations

## 🏗️ Architecture Overview

This project demonstrates how to build a production-ready AI agent using:

- **Frontend**: React + TypeScript with modern UI components
- **Backend**: Cloudflare Workers for serverless deployment
- **AI Layer**: Langbase for agent orchestration and Slack integration
- **MCP Integration**: Slack MCP server for workspace connectivity

## 🛠️ How Langbase Powers This Agent

### 1. **Agent Workflow Setup**

The core agent logic uses Langbase's workflow system:

```typescript
// worker/agent.ts
import { Langbase } from "langbase"

export async function slackAgentWorkflow({ input, env }) {
  const langbase = new Langbase({ apiKey: env.LANGBASE_API_KEY });
  
  const workflow = langbase.workflow();
  const { step } = workflow;

  const slackResponse = await step({
    id: "query_slack",
    run: async () => {
      const { output } = await langbase.agent.run({
        model: "openai:gpt-4.1-mini",
        apiKey: env.OPENAI_API_KEY,
        instructions: `You are a Slack assistant...`,
        input: [{ role: "user", content: input }],
        mcp_servers: [
          {
            type: "url",
            name: "slack",
            url: "https://slack.mcp.langbase.com/sse",
            authorization_token: env.SLACK_BOT_TOKEN,
          },
        ],
      });
      return output;
    },
  });

  return slackResponse;
}
```

### 2. **MCP Server Integration**

Langbase connects to Slack through MCP (Model Context Protocol):

```typescript
mcp_servers: [
  {
    type: "url",
    name: "slack",
    url: "https://slack.mcp.langbase.com/sse",
    authorization_token: env.SLACK_BOT_TOKEN,
  },
]
```

This gives the agent access to Slack's full API through natural language.

### 3. **API Endpoint Setup**

The Cloudflare Worker exposes the agent through a simple API:

```typescript
// worker/langbase.ts
export const registerLangbaseEndpoint = (app) => {
  app.post("/api/langbase", async (c) => {
    const { input } = await c.req.json();
    
    const output = await slackAgentWorkflow({
      input,
      env: c.env, // Cloudflare environment variables
    });

    return c.json({ output });
  });
};
```

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 21+ 
- A [Langbase account](https://langbase.com) and API key
- OpenAI API key
- Slack Bot Token ([setup guide](https://langbase.com/docs/mcp-servers/popular-mcp-servers#authentication))

### 1. **Clone and Install**

```bash
npx degit LangbaseInc/langbase-examples/examples/slack-agent slack-agent && cd slack-agent
npm install
cp .env.example .env
```

### 2. **Environment Setup**

Copy the environment template:

```bash
cp .env.example .env
```

Add your API keys to `.env`:

```env
# Get from: https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="your_langbase_api_key"

# Get from: https://platform.openai.com/api-keys  
OPENAI_API_KEY="your_openai_api_key"

# Get from: https://langbase.com/docs/mcp-servers/popular-mcp-servers#authentication
SLACK_BOT_TOKEN="xoxb-your-slack-bot-token"
```

### 3. **Run Development Server**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to start using your Slack agent!

## 📝 Example Queries

Try these natural language queries with your agent:

### **User & Profile Management**
```
"Show me all users with their status and role"
"Get my full profile — email, title, and timezone"
"Who are the admins in this workspace?"
```

### **Channel Operations**
```
"List all public channels sorted by activity"
"What channels am I not a member of?"
"Create a summary of #general from the last week"
```

### **Messaging & Engagement**
```
"Post 'Meeting in 5 minutes!' to #team-standup"
"Add 🚀 reaction to the last message in #launch"
"Reply 'Great work!' to the thread about the new feature"
```

### **Search & History**
```
"Get the last 10 messages from #support"
"Show all replies in the 'Q3 Goals' thread"
"Find conversations about the database migration"
```

## 🔧 Key Components Explained

### **Frontend (React)**

The UI is built with modern React patterns:

```typescript
// src/components/agent.tsx
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
  
  // UI renders example queries and response
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

### **Agent Instructions**

The agent is configured with comprehensive Slack knowledge:

```typescript
instructions: `You are a Slack assistant that can help users with their Slack workspace queries.

You have access to Slack through MCP tools. You can:
- Search for messages in channels
- Get channel information  
- Retrieve message history
- Find conversations about specific topics
- Get user information by user ID

When fetching messages, always include the sender's name along with their message...`
```

## 🚀 Deployment

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

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes Cloudflare Workers testing setup with Vitest.

## 📁 Project Structure

```
slack-agent/
├── src/                    # React frontend
│   ├── components/         # UI components
│   │   ├── agent.tsx      # Main agent interface
│   │   └── landing.tsx    # Landing page
│   └── App.tsx            # Root component
├── worker/                 # Cloudflare Worker backend  
│   ├── agent.ts           # Langbase agent workflow
│   ├── langbase.ts        # API endpoint handler
│   └── index.ts           # Worker entry point
├── test/                   # Test files
├── wrangler.jsonc         # Cloudflare Workers config
└── package.json           # Dependencies and scripts
```

## 🔑 Key Langbase Features Used

1. **Workflow System**: Orchestrates multi-step agent operations
2. **MCP Integration**: Connects to Slack through standardized protocol  
3. **Agent Runtime**: Handles LLM interactions with context management
4. **Step Functions**: Breaks complex operations into manageable steps

## 🛡️ Security & Best Practices

- Environment variables for sensitive API keys
- CORS and security headers configured
- Error boundaries for graceful failure handling
- Input validation and sanitization
- Secure token storage and transmission

## 📚 Learn More

- **[Langbase Documentation](https://langbase.com/docs)** - Complete platform guide
- **[MCP Servers](https://langbase.com/docs/mcp-servers)** - Available integrations  
- **[API Reference](https://langbase.com/docs/api-reference)** - Detailed API docs
- **[Slack MCP Setup](https://langbase.com/docs/mcp-servers/popular-mcp-servers#authentication)** - Slack integration guide

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