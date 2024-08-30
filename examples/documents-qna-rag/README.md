![Ask Documents QnA RAG by ⌘ Langbase](https://github.com/user-attachments/assets/b1ee5e56-1e86-4cc8-825f-ad4e78208c2d)

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe]

## Build RAG Application for QnA with Documents — ⌘ Langbase

A RAG application example to help you create a powerful QnA system for your documents. This application is built by using a RAG Pipe on Langbase, it works with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Follow [step-by-step instructions](https://langbase.com/docs/guides/rag) to build your own RAG application with Langbase. Check out the live demo [here][demo].

## Features

-   **🤔 Question & Answer**: Ask questions from the content of your files.
-   **🔗 Langbase Integration**: Utilize Langbase's powerful Pipes and Memory services
-   **⚡️ Streaming** — Get real-time answers with streamed responses
-   **🧩 Customizable**: Easily extend and modify the application to fit your needs.

## Learn more

1. Check the [Documents QnA Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [Documents QnA][pipe] Pipe on ⌘ Langbase.
2. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
3. Download the example project folder from [here][download] or clone the repository.
4. `cd` into the project directory and open it in your code editor.
5. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
6. Add the following environment variables:

```sh
# Replace `LANGBASE_PIPE_API_KEY` with the copied API key.
LANGBASE_PIPE_API_KEY="LANGBASE_PIPE_API_KEY"

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

-   Saqib Ameen ([@saqibameen][xsa]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**

[demo]: https://documents-qna-rag.langbase.dev
[lb]: https://langbase.com
[pipe]: https://langbase.com/examples/documents-qna-rag
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/documents-qna-rag
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/documents-qna-rag
[signup]: https://langbase.fyi/io
[qs]: https://langbase.com/docs/pipe/quickstart
[docs]: https://langbase.com/docs
[xsa]: https://x.com/saqibameen
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
