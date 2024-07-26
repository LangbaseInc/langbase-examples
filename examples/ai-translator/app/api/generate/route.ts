import { OpenAIStream, StreamingTextResponse } from 'ai';
import zod from 'zod';

export const runtime = 'edge';

type Message = { role: string; content: string };
type Variable = { name: string; value: string };

type RequestBody = {
	messages: Message[];
	variables: Variable[];
};

export async function POST(req: Request) {
	const requestBodySchema = zod.object({
		messages: zod.array(
			zod.object({
				role: zod.string(),
				content: zod.string()
			})
		),
		variables: zod.array(
			zod.object({
				name: zod.string(),
				value: zod.string()
			})
		)
	});

	try {
		if (!process.env.NEXT_LB_PIPE_API_KEY) {
			throw new Error(
				'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
			);
		}

		const endpointUrl = 'https://api.langbase.com/beta/generate';
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
		};

		const body: RequestBody = await req.json();

		// Validate request body
		const { messages, variables } = requestBodySchema.parse(body);

		const requestBody = {
			messages,
			variables
		};

		const response = await fetch(endpointUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			const res = await response.json();
			throw new Error(`Error ${res.error.status}: ${res.error.message}`);
		}

		// Handle Langbase response. It is in OpenAI streaming format.
		const stream = OpenAIStream(response);
		// Respond with a text stream
		return new StreamingTextResponse(stream, {
			headers: response.headers
		});
	} catch (error: any) {
		// console.error('API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
