import { Langbase } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		// Get writer and email summary from the client.
		const body = await req.json();
		const { writer, emailSummary } = body;

		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!
		});

		const { stream: emailReply } = await langbase.pipe.run({
			name: 'email-writer',
			stream: true,
			messages: [],
			variables: [
				{
					name: 'writer',
					value: writer
				},
				{
					name: 'user_email_summary',
					value: emailSummary
				}
			]
		});

		return new Response(emailReply, { status: 200 });
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
