![cover](public/tech-guide-writer.png)

## Tech Guide Writer

A simple LLM API project to help you write technical guides. The tool uses Langbase Pipe API under the hood to integrate 10+ LLM models in the app.

## Create a Langbase Pipe

1. Go to langbase.com and create an [account](https://beta.langbase.com/signup)
2. Add LLM API keyset to your profile [settings](https://beta.langbase.com/settings/profile)
3. Click on Pipes. Create a new pipe. Let's call it "Tech Guide Writer"
4. Select any LLM model. This tool uses `gemma-7b-it` model
5. Add the following System Prompt Instructions:

```
Your task is to embody the role of a professional technical guide writer, emphasizing the creation of SEO-optimized content. You are instructed to craft a concise and engaging tech guide in markdown tailored for a technical audience on the {{topic}}. If the topic requires code snippets, add them. Ensure that you remains approachable through simple English usage, fostering an interactive reader experience.

## SEO Optimization:
  - Develop an SEO-friendly title that captures attention while remaining pertinent to {{topic}}.
  - Create a compelling meta description that succinctly previews your blog's content focus on{{topic}}.

## Limitations

- Max word count of the guide should be {{word_count}} words.
- Each paragraph should be concise, containing max {{sentence_count}} sentences.
```

6. Deploy the Pipe to production
7. Head to API tab and copy the API key

## Local Development

1. Clone this repo, install node modules, and create an `.env.local` file in the root directory
2.  Add the following environment variables:

```
NEXT_LB_PIPE_API_KEY=YOUR_PIPE_API_KEY
```

Replace `YOUR_PIPE_API_KEY` with your Pipe's API key.

3.  Run the project using the following command:

```bash
npm run dev
```

---

***Powered by [Langbase](https://langbase.com/)***
