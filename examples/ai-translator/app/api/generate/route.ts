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
		if (!process.env.LANGBASE_AI_PIPE_API_KEY) {
			throw new Error(
				'Please set LANGBASE_AI_PIPE_API_KEY in your environment variables.'
			);
		}

		// Parse request body
		const body = await req.json();

		// Validate request body
		const { prompt, inputLanguage, translationLanguage } =
			requestBodySchema.parse(body);

		// Initialize the `ai-translator` pipe
		const pipe = new Pipe({ apiKey: process.env.LANGBASE_AI_PIPE_API_KEY });

		// Stream completion
		const { stream: translation } = await pipe.streamText({
			messages: [{ role: 'user', content: '' }],
			variables: [
				{ name: 'sentence', value: prompt },
				{ name: 'inputLanguage', value: inputLanguage },
				{ name: 'translationLanguage', value: translationLanguage }
			]
		});

		return new Response(translation.toReadableStream(), { status: 200 });
	} catch (error: any) {
		// console.error('API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
