# Slack Insight agent

A simple AI text summarizer app powered by Langbase. This tool uses the gpt-o model to generate a concise summary of any provided content.

Check out the live demo here.

## Features



## Project Structure

```
├── agent.ts                # Main workflow implementation
├── package.json            # Project dependencies and scripts
├── readme.md               # Project readme file
├── .env.example            # Environment variables template
└── app/                    # Agent App
    ├── api/                # API endpoints
    ├── src/                # React components and utilities
    ├── public/             # Static assets
    ├── .env.example        # Environment variables template
    ├── package.json        # Project dependencies and scripts
    ├── readme.md           # App readme file
    └── vite.config.ts      # Vite configuration for the app
```

## Prerequisites

- Node.js 21 or higher
- npm or pnpm package manager
- Langbase API key

## Getting Started

1. Install dependencies:

```bash
pnpm install
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

### Running the Agent

Execute the agent with:

```bash
pnpm run agent
```

This will run the agent with the default test input defined in [`agent.ts`](agent.ts).

### Customizing Input

To test with your own text, modify the input in the IIFE at the bottom of [`agent.ts`](agent.ts):

```typescript
const event = {
	json: async () => ({
		input: `Your custom text to summarize goes here.`
	})
};
```

### Integration

The agent exports a default function that can be integrated into other applications:

```typescript
import agent from './agent.ts';

const event = {
	json: async () => ({ input: 'Text to summarize' })
};

const result = await agent(event, {});
console.log(result.summary);
```

## Agent App

The project includes a React-based agent app in the [`app/`](app/) directory with:

- UI components built with modern React patterns
- API integration for agent communication
- Responsive design with Tailwind CSS
- Development server with Vite and Hono

### Installation

1. Install dependencies:

To set up the app, navigate to the [`app/`](app/) directory and install dependencies:

```bash
cd app
pnpm install
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

### Usage

To run the application, use:

```bash
pnpm dev
```

## Support

For questions or issues, please refer to the [Langbase documentation](https://langbase.com/docs).
