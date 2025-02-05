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

		const summary = await langbase.pipe.run({
			name: 'summarizer',
			messages: [],
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
