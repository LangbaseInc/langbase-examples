![Ask My Docs by ⌘ Langbase][cover]

![License: MIT][mit] [![Fork to ⌘ Langbase][fork]][pipe]

## Ask My Docs RAG Chatbot Example — ⌘ Langbase

Ask or generate anything from your Documentation, taking advantage of Langbase Memory and Pipes. [Follow this guide](https://langbase.com/docs/guides/rag-on-docs) to upload your documentation files into Memory and create a RAG Chatbot on it.

Check out the live demo [here][demo], which is a RAG Chatbot on Langbase's documentation.

## Features

- 💬 [RAG Chatbot app][demo] — Built with an [AI Pipe on ⌘ Langbase][pipe]
- ⚡️ Streaming — Real-time chat experience with streamed responses
- 🗣️ Q/A — Ask questions and get pre-defined answers with your preferred AI model and tone
- 🔋 Responsive and open source — Works on all devices and platforms

## Running the project

[Follow this guide](https://langbase.com/docs/guides/rag-on-docs) to upload and set up a RAG on your documentation using Langbase Memory and Pipes.

Once you have followed the guide, and setup your Memory and Pipe you can run this app locally:

1. `cd` into the project directory and open it in your code editor.

2. Duplicate the `.env.example` file in this project and rename it to `.env.local`.

3. Add the following environment variables:

	```sh
	# Replace `PIPE_API_KEY` with the copied API key.
	LANGBASE_PIPE_API_KEY="YOUR_PIPE_API_KEY"
	```

4. Install the dependencies using the following command:

```sh
npm install
```

5. Run the project using the following command:

```sh
npm run dev
```

Your app template should now be running on [localhost:3000][local].

> NOTE:
> This is a Next.js project, so you can build and deploy it to any platform of your choice, like Vercel, Netlify, Cloudflare, etc.

## Learn more

1. Check the [AI Chatbot Pipe on ⌘ Langbase][pipe]
2. Read the [source code on GitHub][gh] for this example
3. Go through Documentaion: [Pipe Quick Start][qs]
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs]

---

## Authors

This project is created by [Langbase][lb] team members, with contributions from:

- Ahmad Bilal ([@AhmadBilalDev][xab]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship hyper-personalized AI assistants with memory!_**

[demo]: https://ask-langbase-docs.langbase.dev
[lb]: https://langbase.com
[pipe]: https://langbase.com/examples/ask-my-docs
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ask-docs-rag
[cover]: https://github.com/LangbaseInc/langbase/blob/main/examples/ask-docs-rag/public/chatbot.jpg
[download]:https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ask-docs-rag
[signup]: https://langbase.fyi/io
[qs]:https://langbase.com/docs/pipe/quickstart
[docs]:https://langbase.com/docs
[xaa]:https://x.com/MrAhmadAwais
[xab]:https://x.com/AhmadBilalDev
[local]:http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
[fork]: https://img.shields.io/badge/FORK%20ON-%E2%8C%98%20Langbase-000000.svg?style=for-the-badge&logo=%E2%8C%98%20Langbase&logoColor=000000
