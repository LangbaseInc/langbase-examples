import { Langbase } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.LANGBASE_AI_PIPE_SENTIMENT_API_KEY) {
			throw new Error(
				'Please set LANGBASE_AI_PIPE_SENTIMENT_API_KEY in your environment variables.'
			);
		}

		// Get email from the client.
		const body = await req.json();
		const { email } = body;

		const langbase = new Langbase();

		const sentiment = await langbase.pipe.run({
			apiKey: process.env.LANGBASE_AI_PIPE_SENTIMENT_API_KEY,
			messages: [],
			variables: [
				{
					name: 'email',
					value: email
				}
			]
		});

		// Parse JSON response from Langbase
		const response: JSON = JSON.parse(sentiment.completion);

		return Response.json(response);
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
