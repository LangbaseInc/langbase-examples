import { Langbase } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.LANGBASE_AI_PIPE_EMAIL_WRITER_API_KEY) {
			throw new Error(
				'Please set LANGBASE_AI_PIPE_EMAIL_WRITER_API_KEY in your environment variables.'
			);
		}

		// Get writer and email summary from the client.
		const body = await req.json();
		const { writer, emailSummary } = body;

		const langbase = new Langbase();

		const { stream: emailReply } = await langbase.pipe.run({
			stream: true,
			apiKey: process.env.LANGBASE_AI_PIPE_EMAIL_WRITER_API_KEY,
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
