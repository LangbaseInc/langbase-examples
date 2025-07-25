import { Langbase } from 'langbase';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
	try {
		const { analysis, resumeContent, jobDescription } = await req.json();
		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		const input = `Resume Content:${resumeContent}
Job Description:${jobDescription}`;

		const { stream } = await langbase.agent.run({
			model: 'openai:gpt-4.1-mini',
			apiKey: process.env.OPENAI_API_KEY!,
			instructions: `You are an expert resume writer specializing in ATS optimization. Based on the analysis provided, create an optimized version of the resume that:

1. **Incorporates relevant keywords** naturally throughout the content
2. **Aligns experience descriptions** with job requirements
3. **Highlights relevant skills** prominently
4. **Uses ATS-friendly formatting** (clear headings, bullet points, standard sections)
5. **Maintains authenticity** while optimizing for the target role
6. **Improves action verbs** and quantifies achievements where possible
7. **Structures content** in standard resume sections (Summary, Experience, Skills, Education, etc.)

Format the optimized resume in clean Markdown with:
- Clear section headers (## for main sections)
- Bullet points for experience and achievements
- Bold text for emphasis on key terms
- Proper spacing and structure

Restrictions:
- Do not wrap the optimized resume in \`\`\`markdown\`\`\` blocks

Previous Analysis: ${analysis}

Original Input: ${input}`,
			input: [
				{
					role: 'user',
					content:
						'Please create the optimized resume based on the analysis and original content provided in the instructions.',
				},
			],
			stream: true,
		});

		if (!stream) {
			console.error('Stream is undefined or null');
			return new Response(
				JSON.stringify({
					error: 'Failed to generate the optimized resume. Please try again later.',
				}),
				{ status: 500 }
			);
		}

		return new Response(stream, {
			status: 200,
		});
	} catch (error: any) {
		console.error('Error in agent generation:', error);
		return new Response(
			JSON.stringify({
				error: error.message || 'An unexpected error occurred. Please try again later.',
			}),
			{ status: 500 }
		);
	}
}
