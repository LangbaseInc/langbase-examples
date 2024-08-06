import { Pipe } from 'langbase';
import zod from 'zod';

export const runtime = 'edge';

export async function POST(req: Request) {
	const requestBodySchema = zod.object({
		prompt: zod.string(),
		inputLanguage: zod.string(),
		translationLanguage: zod.string()
	});

	try {
		if (!process.env.NEXT_LB_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
			);
		}

		// Initialize Pipe
		const pipe = new Pipe({ apiKey: process.env.NEXT_LB_PIPE_API_KEY });

		// Parse request body
		const body = await req.json();

		// Validate request body
		const { prompt, inputLanguage, translationLanguage } =
			requestBodySchema.parse(body);

		// User prompt message.
		const userPrompt = `## Language Inputs:
Input language: ${inputLanguage}
Translated language: ${translationLanguage}

## Translation Sentence:
${prompt}`;

		// Stream completion
		const stream = await pipe.streamText({
			messages: [{ role: 'user', content: userPrompt }]
		});

		return new Response(stream.toReadableStream());
	} catch (error: any) {
		// console.error('API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
