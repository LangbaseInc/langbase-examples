# Composable Email Agent

An AI-powered composable email agent built in Node.js that analyzes emails and generates appropriate responses using the following agent architectures:

-   Parallelization
-   Prompt chaining

## Features

-   📧 Email Analysis
    -   Sentiment Analysis - Determines the emotional tone of incoming emails
    -   Email Summarization - Creates concise summaries of email content
    -   Response Decision Making - Intelligently decides if an email needs a response
-   ✍️ Smart Response Generation
    -   Writer Style Selection - Picks appropriate tone and style for replies
    -   Contextual Response Generation - Creates relevant, context-aware email responses
-   ⚡️ Real-time Streaming - Get responses with streamed output
-   🔌 Easy Integration - Built with the Langbase SDK

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the following pipes on ⌘ Langbase:

    1. [Email Sentiment][email-sentiment]
    2. [Summarizer][summarizer]
    3. [Email Decision Maker][decision-maker]
    4. [Pick Email Writer][pick-email-writer]
    5. [Email Writer][email-writer]

2. Download and setup the project

```sh
npx degit LangbaseInc/langbase-examples/examples/email-agent-node example-composable-email-agent && cp .env.example .env && cd example-composable-email-agent
```

2. Add your Langbase API key to `.env`:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"
```

3. Install dependencies:

```sh
pnpm install

# OR
npm install
```

4. Run the email agent:

```sh
pnpm run agent

# OR
npm run agent
```

## Project Structure

```
email-agent-node/
├── .env.example   # Environment variables example
├── .gitignore     # Git ignore
├── index.ts       # Email agent implementation
├── package.json   # Node.js package configuration and dependencies
└── README.md      # Project documentation
```

[email-sentiment]: https://langbase.com/examples/email-sentiment
[summarizer]: https://langbase.com/examples/summarizer
[decision-maker]: https://langbase.com/examples/decision-maker
[pick-email-writer]: https://langbase.com/examples/pick-email-writer
[email-writer]: https://langbase.com/examples/email-writer
