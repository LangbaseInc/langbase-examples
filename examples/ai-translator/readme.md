![Translator AI by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe]

## Build an AI Translator with Pipes — ⌘ Langbase

A translator example to help you translate text from one language to another. This translator is built by using an AI Pipe on Langbase.

Check out the live demo [here][demo].

## Features

-   💬 [AI Translator][demo] — Built with an [AI Pipe on ⌘ Langbase][pipe]
-   ⚡️ Streaming — Real-time streamed translations
-   🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [AI Translator Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [AI Translator][pipe] Pipe on ⌘ Langbase.
2. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
3. Download the example project folder from [here][download] or clone the repository.
4. `cd` into the project directory and open it in your code editor.
5. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
6. Add the following environment variables:

```sh
# Replace `PIPE_API_KEY` with the copied API key.
LANGBASE_AI_PIPE_API_KEY="PIPE_API_KEY"

# Install the dependencies using the following command:
npm install

# Run the project using the following command:
npm run dev
```

Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

---

**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**

[demo]: https://ai-translator.langbase.dev
[lb]: https://langbase.com
[pipe]: https://langbase.com/examples/ai-translator
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-translator
[cover]: https://raw.githubusercontent.com/LangbaseInc/langbase-examples/main/examples/ai-translator/public/ai-translator.jpg
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-translator
[signup]: https://langbase.fyi/io
[qs]: https://langbase.com/docs/pipe/quickstart
[docs]: https://langbase.com/docs
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
