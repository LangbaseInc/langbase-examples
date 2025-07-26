import { z } from 'zod';
import { Langbase } from 'langbase';

export const runtime = 'edge';

const summaryRequestSchema = z.object({
	notes: z.string().min(1)
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const result = summaryRequestSchema.safeParse(body);

		if (!result.success) {
			return new Response(JSON.stringify({ error: result.error }), {
				status: 400
			});
		}

		const { notes } = result.data;

		// Generate the summary using the Langbase workflow
		const summary = await generateNotes({ notes });

		// Process the valid request data
		return new Response(summary, {
			status: 200
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify({ error }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		console.error('Unexpected error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

const generateNotes = async ({ notes }: { notes: string }) => {
	const langbase = new Langbase({
		apiKey: process.env.LANGBASE_API_KEY!
	});

	const workflow = langbase.workflow({
		debug: true
	});

	const { step } = workflow;

	try {
		const meetingNotes = await step({
			id: 'generate_structured_notes',
			run: async () => {
				const { stream } = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are an expert meeting notes generator. Analyze the meeting transcript and extract structured information.

Guidelines:
- Create a concise but comprehensive summary
- Identify all key discussion points mentioned
- Extract specific action items with assignees and due dates (use "TBD" if not specified)
- List all decisions that were made during the meeting
- Outline clear next steps
- Identify all meeting participants mentioned

Be thorough but concise. Focus on actionable items and important decisions.`,
					input: [
						{
							role: 'user',
							content: `Please analyze this meeting transcript and generate structured notes:\n\n${notes}`
						}
					],
					stream: true
				});

				return stream;
			}
		});

		return meetingNotes;
	} catch (error) {
		console.error('Error generating summary:', error);
		throw new Error('Failed to generate summary');
	}
};
