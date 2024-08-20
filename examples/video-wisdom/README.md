![VideoWisdom by ⌘ Langbase][cover]

![License: MIT][mit] 

## 🧠 VideoWisdom — Summarize and Analyze YouTube Videos with AI

VideoWisdom is an AI-powered tool designed to help you manage content overload by summarizing YouTube videos, answering questions, extracting main ideas, and more. Built using multiple AI Pipes on Langbase, VideoWisdom works with 30+ LLMs (like OpenAI, Gemini, Mistral, Llama, etc.), and any data (10M+ context with Memory sets).

Check out the live demo [here][demo].

## Features

- **🧠 VideoWisdom** — Transform YouTube videos into insights in just a few minutes with AI!
- 💬 **YouTube Videos Q/A** – Get instant answers from any YouTube video.
- 📝 **Summarize YouTube Video** – Get concise summaries of YouTube videos.
- 🧩 **Main Ideas Extractor** – Extract core concepts from YouTube videos.
- 💡 **List Interesting Facts** – Highlight intriguing facts from videos.
- 🎯 **Wow Moments Extractor** – Find and review impactful moments in videos.
- 🐦 **Video Tweets Extractor** – Create tweet ideas from video content.
- 🎥 **Video Recommendations Extractor** – Extract and view video recommendations.
- 🗣️ **List Quotes from Video** – Extract notable quotes from YouTube videos.
- 🚀 **AI-Powered Insights** — Leverage the power of AI to generate insights from videos
- ⚡ **Real-time Processing** — Experience near-instant responses with streaming

## Learn more

1. Explore the VideoWisdom Pipes on ⌘ Langbase.
2. Check out the [source code on GitHub][gh] for this project.
3. Go through the Documentation: [Pipe Quick Start][qs].
4. Learn more about [Pipes & Memory features on ⌘ Langbase][docs].

## Get started

Let's get started with the project:

[Create a free personal account on Langbase.com][signup] and verify your email address.

1. Fork the the following Pipes on ⌘ Langbase.

   - [YouTube Videos Q/A Pipe][chatPipe]
   - [Summarize YouTube Video Pipe][summarize]
   - [Main Ideas Extractor Pipe][getMainIdeas]
   - [List Interesting Facts Pipe][listInterestingFacts]
   - [Wow Moments Extractor Pipe][wowMomentsExtractor]
   - [Video Tweets Extractor Pipe][videoTweetsExtractor]
   - [Video Recommendations Extractor Pipe][videoRecommendations]
   - [List Quotes from Video Pipe][listQuotes]

2. Go to the API tab of each Pipe to copy the Pipe's API key (to be used on server-side only).
3. Clone the respository to your local machine using the following command:

```sh
git clone https://github.com/LangbaseInc/langbase-examples
```

4. `cd` into the project directory in examples folder:

```sh
    cd langbase-examples/examples/video-wisdom
```

5. Duplicate the `.env.local.example` file in this project and rename it to `.env.local`.
6. Add the following environment variables:

```sh
# Fork https://langbase.com/examples/youtube-video-summarizer
# Replace `LB_SUMMARIZE_PIPE_KEY` with your API from the forked Pipe
LB_SUMMARIZE_PIPE_KEY=""
# Fork https://langbase.com/examples/you-tube-videos-qn-a
# Replace `LB_GENERATE_PIPE_KEY` with your API from the forked Pipe
LB_GENERATE_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-main-ideas-extractor
# Replace `LB_MAIN_IDEAS_PIPE_KEY` with your API from the forked Pipe
LB_MAIN_IDEAS_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-interesting-facts-extractor
# Replace `LB_FACTS_PIPE_KEY` with your API from the forked Pipe
LB_FACTS_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-wow-moments
# Replace `LB_WOW_PIPE_KEY` with your API from the forked Pipe
LB_WOW_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-tweets-extractor
# Replace `LB_TWEETS_PIPE_KEY` with your API from the forked Pipe
LB_TWEETS_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-recommendations-extractor
# Replace `LB_RECOMMENDATION_PIPE_KEY` with your API from the forked Pipe
LB_RECOMMENDATION_PIPE_KEY=""
# Fork https://langbase.com/examples/youtube-video-quotes-extractor
# Replace `LB_QUOTES_PIPE_KEY` with your API from the forked Pipe
LB_QUOTES_PIPE_KEY=""

```

7. Now execute the following commands in your terminal to run the project:

```sh
# Install the dependencies using the following command:
pnpm install

# OR if you are using npm, run the following command:
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

- Saqib Ameen ([@saqibameen][xsa]) - Founding Engineer, [Langbase][lb]

**_Built by ⌘ [Langbase.com][lb] — Ship composable AI pipe agents with hyper-personalized memory (RAG)!_**

[demo]: https://videowisdom.langbase.dev
[lb]: https://langbase.com
[summarize]: https://langbase.com/examples/youtube-video-summarizer
[chatPipe]: https://langbase.com/examples/you-tube-videos-qn-a
[getMainIdeas]: https://langbase.com/examples/youtube-video-main-ideas-extractor
[videoTweetsExtractor]: https://langbase.com/examples/youtube-video-tweets-extractor
[wowMomentsExtractor]: https://langbase.com/examples/youtube-video-wow-moments
[listInterestingFacts]: https://langbase.com/examples/youtube-video-interesting-facts-extractor
[videoRecommendations]: https://langbase.com/examples/youtube-video-recommendations-extractor
[listQuotes]: https://langbase.com/examples/youtube-video-quotes-extractor
[gh]: https://github.com/LangbaseInc/langbase-examples/tree/main/examples/video-wisdom
[cover]: https://raw.githubusercontent.com/LangbaseInc/docs-images/8f8f28e6e6dcff487892ea94acf3c9ebc5a16034/examples/ai-video-wisdom/ai-video-wisdom.jpg
[signup]: https://langbase.fyi/io
[qs]: https://langbase.com/docs/pipe/quickstart
[docs]: https://langbase.com/docs
[xsa]: https://x.com/saqibameen
[local]: http://localhost:3000
[mit]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=%23000000
