# Slack Insight Agent

Get intelligent insights from your Slack workspace with AI-powered analysis

Check out the live demo here.

## 🚀 Features

This Slack Insight Agent provides seamless interaction with your Slack workspace through the following capabilities:

- **List workspace users** → `slack_get_users`  
  Retrieve all members along with basic profile details.  

- **Add emoji reactions** → `slack_add_reaction`  
  React to any message with Slack emojis.  

- **List channels** → `slack_list_channels`  
  Get a list of all channels in the workspace.  

- **Send messages** → `slack_post_message`  
  Post new messages directly to a channel.  

- **Reply to threads** → `slack_reply_to_thread`  
  Keep conversations organized by replying inside message threads.  

- **Get user profile** → `slack_get_user_profile`  
  Fetch detailed profile information for a specific user.  

- **Get thread replies** → `slack_get_thread_replies`  
  Retrieve all replies from any thread.  

- **Get channel history** → `slack_get_channel_history`  
  Access recent messages from a selected channel.  

## Prerequisites

- Node.js 21 or higher
- npm or pnpm package manager
- [Langbase API key](https://langbase.com/docs/api-reference/api-keys)

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
