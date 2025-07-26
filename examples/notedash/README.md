![NoteDash by ⌘ Langbase][cover]

![License: MIT][mit]

## Build an AI Meeting Assistant — ⌘ Langbase

An AI-powered meeting assistant that records, transcribes, summarizes, and lets you chat with your meeting content. Upload audio files, record speech in real-time, or input text directly to get comprehensive meeting notes and insights powered by AI.

This NoteDash app is built using **Langbase AI Primitives** like [Agent](https://langbase.com/docs/agent) that work with 400+ LLMs from OpenAI, Gemini, Mistral, Llama, Gemma, etc.

Check out the live demo [here][demo].

## Features

-   🎙️ **Real-time Speech Recording** — Record meetings with live transcription and speech recognition
-   📁 **Audio File Upload** — Upload audio files (MP3, WAV, M4A) for automatic transcription
-   ✍️ **Text Input** — Paste meeting transcripts or notes directly for AI analysis
-   🤖 **AI-Powered Summaries** — Generate comprehensive meeting notes with key insights and action items
-   💬 **Interactive Chat** — Ask questions about your meeting content and get intelligent responses
-   ⚡️ **Real-time Streaming** — Watch your meeting notes generate in real-time with streamed AI responses
-   📋 **Easy Export** — Copy notes to clipboard or save for future reference
-   🎨 **Modern UI** — Beautiful, responsive interface built with Tailwind CSS and Radix UI
-   🌐 **Cross-browser Support** — Works with Chrome, Edge, and Safari for speech recognition

## Learn more

1. Read the [source code on GitHub][gh] for this example
2. Learn more about [AI Primitives & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

### 1. Download and setup the project

The following commands:

1. Download the example project folder from [here][download]
2. Rename the folder to `notedash`
3. Change the directory to the project folder
4. Copy the `.env.example` file to `.env.local` in the project folder

```sh
npx degit LangbaseInc/langbase-examples/examples/notedash notedash &&
cd notedash &&
cp .env.example .env.local
```

### 2. Add the required environment variables

Add the values of these environment variables to the `.env.local` file:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"

# OpenAI API key to work with GPT models for chat functionality
# https://platform.openai.com/api-keys
OPENAI_API_KEY="your_openai_api_key"

# ElevenLabs API key for audio transcription (speech-to-text)
# https://elevenlabs.io/app/speech-to-text
ELEVENLABS_API_KEY="your_elevenlabs_api_key"
```

### 3. Install dependencies

```sh
pnpm install

# OR
npm install

# OR
yarn install
```

### 4. Run the development server

```sh
pnpm run dev

# OR
npm run dev

# OR
yarn dev
```

Your app should now be running on [localhost:3000][local].

> NOTE: This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

-   Ashar Irfan ([@MrAsharIrfan][xai]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Build, deploy, and scale serverless AI agents with tools and memory (RAG)_**

[demo]: https://notedash.langbase.dev
[lb]: https://langbase.com
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/notedash
[cover]: https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/notedash/cover.jpg
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/notedash
[signup]: https://langbase.fyi/io
[docs]: https://langbase.com/docs
[xai]: https://x.com/MrAsharIrfan
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
