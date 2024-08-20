// import {Pipe} from 'langbase';
import {Pipe} from 'langbase';

import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
	const {prompt} = await req.json();

	// 1. Initiate the Pipe.
	const pipe = new Pipe({
		apiKey: process.env.LANGBASE_PIPE_LESS_WORDY!,
	});

	// 2. Generate a stream by asking a question
	const stream = await pipe.streamText({
		messages: [{role: 'user', content: prompt}],
	});

	// 3. Done, return the stream in a readable stream format.
	return new Response(stream.toReadableStream());
}
