# slack-insight-agent Agent App

This is the app for the AI agent project created by Command.new

## Project Structure
```
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
# Get API key from: https://command.new/examples/slack-insight-agent?tab=api
LANGBASE_API_KEY=your_langbase_api_key_here

# Your OpenAI API key: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Add any other required environment variables
```

## Usage

To run the application, use:

```bash
pnpm dev
```

## Support

For questions or issues, please refer to the [Langbase documentation](https://langbase.com/docs).
