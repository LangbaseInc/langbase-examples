import { Pipe } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.LANGBASE_AI_PIPE_SUMMARIZER_API_KEY) {
			throw new Error(
				'Please set LANGBASE_AI_PIPE_SUMMARIZER_API_KEY in your environment variables.'
			);
		}

		// Get email from the client.
		const body = await req.json();
		const { email } = body;

		const pipe = new Pipe({
			apiKey: process.env.LANGBASE_AI_PIPE_SUMMARIZER_API_KEY
		});

		const summary = await pipe.generateText({
			variables: [
				{
					name: 'content',
					value: email
				}
			]
		});

		return new Response(
			JSON.stringify({
				summary: summary.completion
			}),
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
