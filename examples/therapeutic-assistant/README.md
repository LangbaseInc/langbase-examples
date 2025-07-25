![Therapeutic Assistant by ⌘ Langbase][cover]

![License: MIT][mit]

## Build an AI Therapeutic Assistant — ⌘ Langbase

An AI-powered therapeutic support tool that provides personalized mental health guidance and evidence-based therapeutic interventions. Get professional-grade therapeutic support through CBT techniques, mindfulness exercises, crisis resources, and compassionate conversation—available anytime you need it.

This Therapeutic Assistant app is built using **Langbase AI Primitives** like [Agent](https://langbase.com/docs/agent) that work with 400+ LLMs from OpenAI, Gemini, Mistral, Llama, Gemma, etc.

Check out the live demo [here][demo].

## Features

- 🧠 **Intelligent Therapeutic Routing** — Built with Langbase AI Primitives that analyze user input to determine the most appropriate therapeutic approach
- 💬 **Multi-Modal Therapy Support** – Specialized agents for crisis intervention, anxiety management, depression support, CBT, relationship counseling, and exploratory therapy
- ⚡️ **Real-time Streaming** – Watch therapeutic responses generate in real-time with streamed responses for immediate support
- 🆘 **Crisis Resources Integration** – Built-in access to emergency mental health resources and hotlines
- 🎯 **Evidence-Based Techniques** – Incorporates CBT, mindfulness, grounding techniques, and other proven therapeutic methods

## Learn more

1. Read the [source code on GitHub][gh] for this example
2. Learn more about [AI Primitives & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Download and setup the project

The following commands:

   1. Download the example project folder from [here][download]
   2. Rename the folder to `therapeutic-assistant`
   3. Change the directory to the project folder
   4. Copy the `.env.example` file to `.env.local` in the project folder

```sh
npx degit LangbaseInc/langbase-examples/examples/therapeutic-assistant therapeutic-assistant &&
cd therapeutic-assistant &&
cp .env.example .env.local
```

2. Add the values of these environment variables to the `.env.local` file:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"

# OpenAI API key to work with gpt-4.1-mini
# https://platform.openai.com/api-keys
OPENAI_API_KEY=""
```

3. Install dependencies:

```sh
pnpm install

# OR
npm install

# OR
yarn install
```

4. Now execute the following commands in your terminal to run the project:

```sh
pnpm run dev

# OR
npm run dev

# OR
yarn dev
```

Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Saad Irfan ([@MrSaadIrfan][xsi]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Build, deploy, and scale serverless AI agents with tools and memory (RAG)_**

[demo]: https://therapeutic-assistant.langbase.dev
[lb]: https://langbase.com
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/therapeutic-assistant
[cover]: https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/therapeutic-assistant/cover.jpg
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/therapeutic-assistant
[signup]: https://langbase.fyi/io
[docs]: https://langbase.com/docs
[xsi]:https://x.com/mrsaadirfan
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
