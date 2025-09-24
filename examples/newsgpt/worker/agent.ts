import { Langbase } from "langbase"
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

interface NewsGPTEnv {
  LANGBASE_API_KEY: string;
  OPENAI_API_KEY: string;
  EXA_API_KEY: string;
  [key: string]: string | undefined;
}

interface newsGPTParams {
  input: string;
  env: NewsGPTEnv;
}

export async function newsGPT({ input, env }: newsGPTParams) {
  const langbase = new Langbase({ apiKey: env.LANGBASE_API_KEY });

  const workflow = langbase.workflow();
  const { step } = workflow;

  const newsItemSchema = z.object({
    summary: z.string(),
    url: z.string(),
    source: z.string(),
  });

  const newsItemsSchema = z.object({
    newsItems: z.array(newsItemSchema)
  });

  const jsonSchema = zodToJsonSchema(newsItemsSchema, { target: 'openAi' });

  try {
    const searchResults = await step({
      id: "search_ai_news",
      run: async () => {
        // const domains = ['techcrunch.com'];
        const query = input;

        return await langbase.tools.webSearch({
          service: 'exa',
          query: query,
          totalResults: 5,
          // domains: domains,
          apiKey: env.EXA_API_KEY!
        });
      }
    });

    const processResult = await step({
      id: "process_news",
      run: async () => {
        const response = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY!,
          instructions: `
          You are an AI news analyst specializing in technology trends.
          Create a newsletter with summaries for each AI news article.
          For each article:
          1. One-liner summary
          2. Include the source website name
          3. Include the full URL
          
          Return a structured JSON with an array of news items.
        `,
          input: [
            {
              role: "user",
              content: `Here are the latest AI news articles. Please analyze them and create newsletter items:\n\n${searchResults.map(result => `URL: ${result.url}\nContent: ${result.content}`).join('\n\n')
                }`
            }
          ],
          stream: false,
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "NewsletterItems",
              schema: jsonSchema,
              strict: true,
            },
          },
        });

        const parsed = JSON.parse(response.output);
        return parsed;
      }
    });
    
    return processResult

  } finally {
    await workflow.end();
  }
}
