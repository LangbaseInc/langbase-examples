'use server'

import {NextRequest} from 'next/server';
import { Pipe } from '@baseai/core';
import pipeDocsAgent from '@/baseai/pipes/docs-agent';
import { RunOptionsStream } from '@baseai/core';

export async function POST(req: NextRequest) {
	const runOptions = await req.json() as RunOptionsStream;;

	// 1. Initiate the Pipe.
	const pipe = new Pipe(pipeDocsAgent());

	// 2. Run the Pipe.
	const {stream, threadId} = await pipe.run(runOptions);
	console.log(`threadid: ${threadId}`)
	// 3. Return the ReadableStream directly.
	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? '',
		},
	});
}