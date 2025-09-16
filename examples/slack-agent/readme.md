# Slack Insight Agent

Get intelligent insights from your Slack workspace with AI-powered analysis

Check out the live demo here.

## 🚀 Features

This Slack Insight Agent provides seamless interaction with your Slack workspace through the following capabilities:

- Retrieve all members along with basic profile details.  
- React to any message with Slack emojis.  
- Get a list of all channels in the workspace.  
- Post new messages directly to a channel.  
- Keep conversations organized by replying inside message threads.  
- Fetch detailed profile information for a specific user.  
- Retrieve all replies from any thread.  
- Access recent messages from a selected channel.  

## Prerequisites

- Node.js 21 or higher
- npm or pnpm package manager
- [Langbase API key](https://langbase.com/docs/api-reference/api-keys)
- [Slack Bot Token](https://langbase.com/docs/mcp-servers/popular-mcp-servers#authentication)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Add your API keys to `.env`:

```env
# Get API key from: https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY=your_langbase_api_key_here

# Your OpenAI API key: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Add any other required environment variables
```

## Usage

The project includes a React-based agent app in the [`src/`](src/) directory with:

- UI components built with modern React patterns
- API integration for agent communication
- Responsive design with Tailwind CSS
- Development server with Vite and Hono

### Installation

1. Install dependencies:

To set up the app, navigate to the [`src/`](src/) directory and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Add your API keys to `.env`:

```env
# Get API key from: https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY=your_langbase_api_key_here

# Your OpenAI API key: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Your Slack Bot Token: https://langbase.com/docs/mcp-servers/popular-mcp-servers#authentication
SLACK_BOT_TOKEN=your_slack_bot_token_here
```

### Usage

To run the application, use:

```bash
npm run dev
```

Your app template should now be running on [localhost:3100](http://localhost:3100). Prompt the agent and manage your Slack workspace.

## Support

For questions or issues, please refer to the [Langbase documentation](https://langbase.com/docs).
