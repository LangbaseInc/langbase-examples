import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
	try {
		// Parse the request body
		const body = await request.json();
		const { videoId } = body;

		const res = await YoutubeTranscript.fetchTranscript(videoId, {
			lang: 'en'
		});

		// Join the transcript into a single string
		const transcript = res.map(line => line.text).join(' ');

		return NextResponse.json({ transcript });
	} catch (error) {
		console.error('Error fetching transcript:', error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ error: 'An unknown error occurred' },
			{ status: 500 }
		);
	}
}
