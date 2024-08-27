import { Pipe } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.NEXT_LB_SENTIMENT_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_SENTIMENT_PIPE_API_KEY in your environment variables.'
			);
		}

		// Get email from the client.
		const body = await req.json();
		const { email } = body;

		const pipe = new Pipe({
			apiKey: process.env.NEXT_LB_SENTIMENT_PIPE_API_KEY
		});

		const sentiment = await pipe.generateText({
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
