import { StreamingTextResponse } from 'ai';
import zod from 'zod';

export const runtime = 'edge';

type RequestBody = {
	messages: { role: string; content: string }[];
	variables: { name: string; value: string }[];
};

const requestBodySchema = zod.object({
	messages: zod.array(
		zod.object({
			role: zod.string(),
			content: zod.string()
		})
	),
	content: zod.string(),
	variables: zod.array(
		zod.object({
			name: zod.string(),
			value: zod.string()
		})
	)
});

export async function POST(req: Request) {
	try {
		const endpointUrl = 'https://api.langbase.com/beta/generate';
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
		};

		const body: RequestBody = await req.json();

		// Validate request body
		const { content, variables } = requestBodySchema.parse(body);

		const wordy = variables.find(
			variable => variable.name === 'wordy'
		)?.value;

		const requestBody = {
			messages: [
				{
					role: 'user',
					content
				}
			],
			variables: [
				{
					name: 'wordy',
					value: wordy
				}
			]
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

		return new StreamingTextResponse(
			response.body as ReadableStream<Uint8Array>
		);
	} catch (error: any) {
		console.error('API Error:', error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
