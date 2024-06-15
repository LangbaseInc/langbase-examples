![cover](public/chatbot.jpg)

## Chatbot

An AI Chatbot example to help you create chatbots for your use case. It uses the Langbase API under the hood to integrate 10+ LLM models in the app.

Check out the live demo [here](https://ai-chatbot.langbase.dev/).

## Features

- AI Chatbot powered by Langbase API
- Streaming
- Chat Thread Management

## Local Development

1. Fork the [chatbot](https://beta.langbase.com/examples/chatbot) Pipe on Langbase.
2. Copy the Pipe's API key from the API tab in your forked pipe.
3. Duplicate the `.env.example` file in this project and rename it to `.env.local`.
4. Add the following environment variables:

```
NEXT_LB_PIPE_API_KEY=YOUR_PIPE_API_KEY
```

Replace `YOUR_PIPE_API_KEY` with the copied API key.

5. Install the dependencies using the following command:

```bash
npm install
```

6.  Run the project using the following command:

```bash
npm run dev
```

---

**_Powered by [Langbase](https://langbase.com/)_**
