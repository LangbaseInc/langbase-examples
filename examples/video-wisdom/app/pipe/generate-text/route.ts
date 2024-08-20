import {Pipe} from 'langbase';

export async function POST(req: Request) {
	// 0. Take out user prompt.
	const {prompt} = await req.json();

	// 1. Initiate the Pipe.
	const pipe = new Pipe({apiKey: process.env.LANGBASE_PIPE_LESS_WORDY!});

	// 3. Generate the text by asking a question.
	const result = await pipe.generateText({
		// Add user question prompt here to generate completion.
		messages: [{role: 'user', content: prompt}],
	});

	// 4. Done: You got the generated completion on result.completion.
	return Response.json(result);
}
