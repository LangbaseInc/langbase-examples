import { Pipe } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY in your environment variables.'
			);
		}

		// Get email summary and sentiment from the client.
		const body = await req.json();
		const { summary, sentiment } = body;

		const pipe = new Pipe({
			apiKey: process.env.NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY
		});

		const writer = await pipe.generateText({
			variables: [
				{
					name: 'summary',
					value: summary
				},
				{
					name: 'sentiment',
					value: sentiment
				}
			]
		});

		// Parse JSON response from Langbase
		const decision: JSON = JSON.parse(writer.completion);

		return Response.json(decision);
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
