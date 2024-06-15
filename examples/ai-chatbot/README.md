![AI Chatbot by ⌘ Langbase][cover]

## Build an AI Chatbot with Pipes — ⌘ Langbase

An AI Chatbot example to help you create chatbots for any use case. This chatbot is built by using an AI Pipe on Langbase, it works with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Check out the live demo [here][demo].

## Features

- 💬 [AI Chatbot][demo] — Built with an [AI Pipe on ⌘ Langbase][pipe]
- ⚡️ Streaming — Real-time chat experience with streamed responses
- 🗣️ Q/A — Ask questions and get pre-defined answers with your preferred AI model and tone
- 🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [AI Chatbot Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [AI Chatbot][pipe] Pipe on ⌘ Langbase.
2. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
3. Download the example project folder from [here][download] or clone the reppository.
4. `cd` into the project directory and open it in your code editor.
5. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
6. Add the following environment variables:

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

**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**


[demo]: https://ai-chatbot.langbase.dev
[lb]: https://langbase.com
[pipe]: https://beta.langbase.com/examples/ai-chatbot
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-chatbot
[cover]:https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/ai-chatbot/ai-chatbot-langbase.png
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ai-chatbot
[signup]: https://langbase.fyi/io
[qs]:https://langbase.com/docs/pipe/quickstart
[docs]:https://langbase.com/docs
[xaa]:https://x.com/MrAhmadAwais
[xab]:https://x.com/AhmadBilalDev
[local]:http://localhost:3000
