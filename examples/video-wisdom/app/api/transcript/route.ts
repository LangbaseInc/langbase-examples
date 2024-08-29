import { fetchYouTubeCaptions } from '@/lib/transcript';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * Handles the POST request for the transcript route.
 *
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the transcript or an error message.
 */
export async function POST(request: NextRequest) {
	try {
		// Parse the request body
		const body = await request.json();

		// Extract the video ID from the request body
		const { videoId } = body;

		// Fetch the transcript
		const transcript = await fetchYouTubeCaptions(videoId);

		return NextResponse.json({ transcript });
	} catch (error) {
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: 'Something went wrong. Please try again later.',
			},
			{ status: 500 }
		);
	}
}
