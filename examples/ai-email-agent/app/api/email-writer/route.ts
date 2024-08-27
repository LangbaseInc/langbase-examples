import { Pipe } from 'langbase';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		if (!process.env.NEXT_LB_EMAIL_WRITER_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_EMAIL_WRITER_PIPE_API_KEY in your environment variables.'
			);
		}

		// Get writer and email summary from the client.
		const body = await req.json();
		const { writer, emailSummary } = body;

		const pipe = new Pipe({
			apiKey: process.env.NEXT_LB_EMAIL_WRITER_PIPE_API_KEY
		});

		const emailReply = await pipe.streamText({
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

		return new Response(emailReply.toReadableStream(), { status: 200 });
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
