import { Pipe } from 'langbase';
import { Env } from '.';

/**
 * Get a response from Langbase based on the prompt.
 * @param prompt The prompt to send to Langbase.
 * @returns The response from Langbase.
 */
export async function getLangbaseResponse({
  prompt,
  env,
}: {
  prompt: string;
  env: Env;
}) {
  // 1. Initiate the Pipe. Add your Langbase Pipe's API key as env variable.
  const pipe = new Pipe({
    apiKey: env.LANGBASE_PIPE_KEY,
  });

  // 2. Call the generateText method to get the response from Langbase.
  const pipeResponse = await pipe.generateText({
    messages: [{ role: 'user', content: prompt }],
  });
  console.log('== ✨ Langbase pipe response', pipeResponse);

  // 3. Return the completion from the response.
  return pipeResponse.completion;
}
