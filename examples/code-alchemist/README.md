![CodeAlchemist by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][codealchemist]

## Build an AI Code Alchemist with Pipes — ⌘ Langbase

An AI powered coding assistant to help you write database schema, queries, and fully functional code snippets. This CodeAlchemist app is built by using multiple AI Pipes on Langbase which work with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Check out the live demo [here][demo].

## Features

- 👨‍💻 CodeAlchemist — Built with multiple AI Pipes on ⌘ Langbase
  - [Code Alchemist Pipe][codealchemist] – A decision maker agent to help understand if user asked a question around code or database
  - [React Copilot Pipe][reactcopilot] – Your personal AI React copilot agent to write code snippets
  - [Database Architect Pipe][databasearchitect] – AI database architect agent to build scalable systems or simply generate SQL queries
- 🗂️ SQL – Generate simple/complex SQL queries or an optimised database schema of a feature
- 🚀 Build apps - Generate fully functional code snippets in React that you can also experiment with in the browser
  - *More frameworks support coming soon.*
- 💻 Improve response — Improve the generated code or SQL by responding back after the query has resolved
- ⚡️ Streaming — Real-time experience with streamed responses
- 🗣️ Q/A — Ask questions and get pre-defined answers with your preferred AI model and tone
- 🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [CodeAlchemist Pipe on ⌘ Langbase][codealchemist]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the the following Pipes on ⌘ Langbase.
   1. [Code Alchemist Pipe][codealchemist]
   2. [React Copilot Pipe][reactcopilot]
   3. [Database Architect Pipe][databasearchitect]
2. Download and setup the project

The following command

   1. Downloads the example project folder from [here][download]
   2. Renames the folder to `example-composable-email-agent-node`
   3. Changes the directory to the project folder
   4. Copies the `.env.example` file to `.env` in the project folder

```sh
npx degit LangbaseInc/langbase-examples/examples/code-alchemist code-alchemist &&
cd code-alchemist &&
cp .env.example .env
```

3. Add the values of these environment variables to the `.env` file:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"
```

4. Install dependencies:

```sh
pnpm install

# OR
npm install
```

5. Now execute the following commands in your terminal to run the project:

```sh
pnpm run dev

# OR
npm run dev
```

Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

---

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Saad Irfan ([@MrSaadIrfan][xsi]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship composable AI pipe agents with hyper-personalized memory (RAG)!_**


[demo]: https://code-alchemist.langbase.dev
[lb]: https://langbase.com
[codealchemist]: https://langbase.com/examples/code-alchemist
[reactcopilot]: https://langbase.com/examples/react-copilot
[databasearchitect]: https://langbase.com/examples/database-architect
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/code-alchemist
[cover]:https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/code-alchemist/demo.jpg
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/code-alchemist
[signup]: https://langbase.fyi/io
[qs]:https://langbase.com/docs/pipe/quickstart
[docs]:https://langbase.com/docs
[xsi]:https://x.com/mrsaadirfan
[local]:http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
