import { Pipe } from 'langbase';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Generate response and stream from Langbase Pipe.
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
	try {
		if (!process.env.LANGBASE_PIPE_API_KEY) {
			throw new Error(
				'Please set LANGBASE_PIPE_API_KEY in your environment variables.'
			);
		}

		const { prompt } = await req.json();

		// 1. Initiate the Pipe.
		const pipe = new Pipe({
			apiKey: process.env.LANGBASE_PIPE_API_KEY
		});

		// 2. Generate a stream by asking a question
		const stream = await pipe.streamText({
			messages: [{ role: 'user', content: prompt }]
		});

		// 3. Done, return the stream in a readable stream format.
		return new Response(stream.toReadableStream());
	} catch (error: any) {
		return new Response(error.message, { status: 500 });
	}
}
