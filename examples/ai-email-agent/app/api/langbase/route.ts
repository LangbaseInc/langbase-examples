import { Langbase } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		// Get request body from the client.
		const body = await req.json();
		const { stream } = body;

		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!
		});

		// STREAM!
		if (stream) {
			const { stream } = await langbase.pipe.run({
				...body,
				stream: true
			});

			return new Response(stream, { status: 200 });
		}

		// NOT STREAMING!
		// @ts-ignore - Property 'completion' does exist on type 'RunResponseStream'.
		// Reported the issue to the Langbase team.
		const { completion } = await langbase.pipe.run(body);

		// Parse JSON response from Langbase
		const response: JSON = JSON.parse(completion);

		return Response.json(response);
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
