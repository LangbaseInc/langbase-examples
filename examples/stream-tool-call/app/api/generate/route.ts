import { RunResponseStream, handleResponseStream } from '@baseai/core';
import { NextRequest } from 'next/server';

async function callPipe(req: NextRequest): Promise<RunResponseStream> {
	try {
		const runOptions = await req.json();
		console.log('runOptions:', runOptions);

		const response = await fetch(
			'https://api.langbase.com/beta/pipes/run',
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.LANGBASE_CODE_ALCHEMIST_PIPE!}`
				},
				body: JSON.stringify(runOptions),
				method: 'POST'
			}
		);

		if (!response.ok) {
			console.error('Error:', response.statusText);
		}

		return handleResponseStream({
			response
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function POST(req: NextRequest) {
	const { stream, threadId } = await callPipe(req);

	return new Response(stream, {
		status: 200,
		headers: {
			'lb-thread-id': threadId ?? ''
		}
	});
}
