![AI Email Agent by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][agent-pipes]

## Build an AI Email Agent with Pipes — ⌘ Langbase

An AI powered email agent to help you analyze sentiment, summarize content, decides whether a response is needed or not, and generates replies for your emails. This agent is built by using multiple AI Pipes on Langbase which work with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Check out the live demo [here][demo].

## Features

-   📧 AI Email Agent — Built with multiple AI Pipes on ⌘ Langbase
    -   [Email Sentiment][email-sentiment] – A pipe to analyze the sentiment of the incoming email
    -   [Summarizer][summarizer] – Summarizes the content of the email and make it less wordy for you
    -   [Email Decision Maker][decision-maker] – A pipe that decides whether the email needs a response or not, and also the category and priority of the response
    -   [Pick Email Writer][pick-email-writer] – A pipe that picks the tone for writing an email
    -   [Email Writer][email-writer] – A pipe that writes a response email as a reply to your email
-   ⚡️ Streaming — Real-time experience with streamed responses
-   🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [AI Email Agent Pipes on ⌘ Langbase][agent-pipes]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the following pipes on ⌘ Langbase.
    1. [Email Sentiment][email-sentiment]
    2. [Summarizer][summarizer]
    3. [Email Decision Maker][decision-maker]
    4. [Pick Email Writer][pick-email-writer]
    5. [Email Writer][email-writer]

### Download and run the project

The following command

1. Downloads the example project folder from [here][download]
2. Renames the folder to `example-composable-email-agent`
3. Changes the directory to the project folder
4. Copies the `.env.example` file to `.env.local` in the project folder

```sh
npx degit LangbaseInc/langbase-examples/examples/ai-email-agent example-composable-email-agent &&
cd example-composable-email-agent &&
cp .env.example .env.local
```

3. Add the values of these environment variables to the `.env.local` file:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"
```

4. Now execute the following commands in your terminal to run the project:

```sh
# Install the dependencies using the following command:
pnpm install

# OR
npm install

# Run the project using the following command:
npm run dev
```

Your app template should now be running on [localhost:3000][local]

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

---

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

-   Ashar Irfan ([@MrAsharIrfan][xai]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship composable AI agents with hyper-personalized memory (RAG)!_**

[demo]: https://ai-email-agent.langbase.dev
[lb]: https://langbase.com
[agent-pipes]: https://langbase.com/examples?q=label:ai-email-agent
[email-sentiment]: https://langbase.com/examples/email-sentiment
[summarizer]: https://langbase.com/examples/summarizer
[decision-maker]: https://langbase.com/examples/decision-maker
[pick-email-writer]: https://langbase.com/examples/pick-email-writer
[email-writer]: https://langbase.com/examples/email-writer
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-email-agent
[cover]: https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/ai-email-agent/ai-email-agent.jpg
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-email-agent
[signup]: https://langbase.fyi/io
[qs]: https://langbase.com/docs/pipe/quickstart
[docs]: https://langbase.com/docs
[xai]: https://x.com/MrAsharIrfan
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
