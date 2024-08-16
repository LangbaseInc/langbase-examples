import { Pipe } from 'langbase';

export async function POST(req: Request) {
	try {
		if (!process.env.NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY in your environment variables.'
			);
		}

		// Get chat prompt messages and threadId from the client.
		const body = await req.json();
		const { summary, sentiment } = body;
		// console.log('Summary:', summary);
		// console.log('Sentiment:', sentiment);

		const pipe = new Pipe({
			apiKey: process.env.NEXT_LB_PICK_EMAIL_WRITER_PIPE_API_KEY
		});

		const result = await pipe.generateText({
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

		// console.log(result.completion);

		// Parse JSON response from Langbase
		const decision: JSON = JSON.parse(result.completion);
		console.log(decision);

		return Response.json(decision);

		// Handle Langbase response, which is a stream in OpenAI format.
		// const stream = OpenAIStream(response)
		// Respond with a text stream.
		// return new StreamingTextResponse(stream, {
		//   headers: response.headers
		// })
	} catch (error: any) {
		console.error('Uncaught API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
