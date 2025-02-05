import { Langbase } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		// Get email from the client.
		const body = await req.json();
		const { email } = body;

		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!
		});

		const sentiment = await langbase.pipe.run({
			name: 'email-sentiment',
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
