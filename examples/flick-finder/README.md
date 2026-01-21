![Flick Finder Chatbot by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe]

## Build an Flick Finder Chatbot with Pipes — ⌘ Langbase

This chatbot is built by using an AI Pipe on Langbase, it works with 30+ LLMs (OpenAI, Gemini, Mistral, Llama, Gemma, etc), any Data (10M+ context with Memory sets), and any Framework (standard web API you can use with any software).

Check out the live demo [here][demo].

## Features

- 💬 [Flick Finder Chatbot][demo] — Built with an [AI Pipe on ⌘ Langbase][pipe]
- ⚡️ Streaming — Real-time chat experience with streamed responses
- 🗣️ Q/A — Ask questions and get pre-defined answers with your preferred AI model and tone
- 🔋 Responsive and open source — Works on all devices and platforms

## Learn more

1. Check the [Flick Finder Chatbot Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the [Flick Finder Chatbot][pipe] Pipe on ⌘ Langbase.
2. Go to the API tab to copy the Pipe's API key (to be used on server-side only).
3. Download the example project folder from [here][download] or clone the reppository.
4. `cd` into the project directory and open it in your code editor.
5. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
6. Add the following environment variables (.env.local):
```
    # Replace `PIPE_API_KEY` with the copied API key.
    NEXT_LB_PIPE_API_KEY="PIPE_API_KEY"
```    

7. Issue the following in your CLI:
```sh
    # Install the dependencies using the following command:
    npm install

    # Run the project using the following command:
    npm run dev
``` 

8. Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

---

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Muhammad-Ali Danish - Software Engineer, [Langbase][lb] <br>
**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**


[demo]: https://flick-finder.langbase.dev
[lb]: https://langbase.com
[pipe]: https://beta.langbase.com/examples/flick-finder
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/flick-finder
[cover]:https://raw.githubusercontent.com/LangbaseInc/docs-images/main/examples/flick-finder/flick-finder.png
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/flick-finder
[signup]: https://langbase.fyi/io
[qs]:https://langbase.com/docs/pipe/quickstart
[docs]:https://langbase.com/docs
[xaa]:https://x.com/MrAhmadAwais
[xab]:https://x.com/AhmadBilalDev
[local]:http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
