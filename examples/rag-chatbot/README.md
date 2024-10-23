![RAG Chatbot by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe]

## Build a RAG Chatbot with Pipes — ⌘ Langbase

A RAG Chatbot example to help you build and deploy a chatbot to talk to your documents. This chatbot is built by using an AI Pipe and Memory on Langbase, it works with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Check out the live demo [here][demo].

## Features

- 💬 Built with a [Memory and Pipe on ⌘ Langbase][pipe]
- ⚡️ Streaming — Real-time chat experience with streamed responses
- 🗣️ Q/A — Ask questions and get answers from the document that you uploaded
- 🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [RAG Chatbot Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
3. Go through Documentaion: [Memory Quick Start][qsmem]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [RAG Chatbot][pipe] Pipe on ⌘ Langbase.
2. Create a [Memory][qsmem] on Langbase, upload the document you want to talk to, and [attach](https://langbase.com/docs/memory/quickstart) it to the Pipe you just forked.
3. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
4. Download the example project folder from [here][download] or clone the repository.
5. `cd` into the project directory and open it in your code editor.
6. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
7. Add the following environment variables:

```sh
# Replace `PIPE_API_KEY` with the copied API key.
NEXT_LB_PIPE_API_KEY="PIPE_API_KEY"

# Install the dependencies using the following command:
npm install

# Run the project using the following command:
npm run dev
```

Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

---

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Ahmad Awais ([@MrAhmadAwais][xaa]) - Founder & CEO, [Langbase][lb]
- Ahmad Bilal ([@AhmadBilalDev][xab]) - Founding Engineer, [Langbase][lb]
- Saqib Ameen ([@SaqibAmeen][xsa]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**


[demo]: https://rag-chatbot.langbase.dev
[lb]: https://langbase.com
[pipe]: https://langbase.com/examples/rag-chatbot
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/rag-chatbot
[cover]:https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/rag-chatbot/rag-chatbot.jpg
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/rag-chatbot
[signup]: https://langbase.fyi/io
[qs]:https://langbase.com/docs/pipe/quickstart
[qsmem]:https://langbase.com/docs/memory/quickstart
[docs]:https://langbase.com/docs
[xaa]:https://x.com/MrAhmadAwais
[xab]:https://x.com/AhmadBilalDev
[xsa]:https://x.com/SaqibAmeen
[local]:http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
