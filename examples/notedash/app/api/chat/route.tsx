import { Langbase } from 'langbase';
import z from 'zod';

export const runtime = 'edge';

const chatRequestSchema = z.object({
	message: z.string().min(1),
	notes: z.string().min(1)
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { data, success } = await chatRequestSchema.safeParseAsync(body);

		if (!success) {
			return new Response('Invalid request params. Please try again.', {
				status: 400
			});
		}

		const { message, notes } = data;

		const response = await chatWithNotes({ message, notes });

		return new Response(response, {
			status: 200
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

const chatWithNotes = async ({
	message,
	notes
}: {
	message: string;
	notes: string;
}) => {
	const langbase = new Langbase({
		apiKey: process.env.LANGBASE_API_KEY!
	});

	const workflow = langbase.workflow({
		debug: true
	});

	const { step } = workflow;

	try {
		const chatWithNotes = await step({
			id: 'chat_with_notes',
			run: async () => {
				const { stream } = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are a helpful assistant that can answer questions about meeting notes.

Use the following meeting notes context to answer the user's question:
${notes}

Guidelines:
- Provide accurate information based only on the meeting notes provided
- If the information isn't in the notes, clearly state that
- Be conversational and helpful in your responses
- Include specific details like dates, names, and action items when relevant
- If asked about action items, list them clearly
- If asked about attendees or dates, provide that information
`,
					input: [{ role: 'user', content: message }],
					stream: true
				});

				return stream;
			}
		});

		return chatWithNotes;
	} catch (error) {
		console.error('Error in chatWithNotes workflow:', error);
		throw new Error('Failed to process chat with notes');
	}
};
