import { MAX_FILE_SIZE } from '@/components/types';

export const runtime = 'edge';

export async function POST(request: Request) {
	try {
		// Get audio file from FormData
		const requestFormData = await request.formData();
		const file = requestFormData.get('audio');

		if (!file || typeof file === 'string') {
			return new Response('No audio file provided', { status: 400 });
		}

		// Cast to File-like object for better compatibility
		const audioFile = file as File;

		// Check file type
		if (!audioFile.type || !audioFile.type.startsWith('audio/')) {
			return new Response(
				'Please upload an audio file (MP3, WAV, M4A, etc.)',
				{
					status: 400
				}
			);
		}

		// Check file size (limit to 1MB)
		if (!audioFile.size || audioFile.size > MAX_FILE_SIZE) {
			return new Response('File size must be less than 1MB', {
				status: 400
			});
		}

		// Convert audio file to text using OpenAI's Whisper model
		const formData = new FormData();
		formData.append('file', audioFile);
		formData.append('model', 'whisper-1');
		const response = await fetch(
			'https://api.openai.com/v1/audio/transcriptions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`
				},
				body: formData
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Error processing audio:', errorText);
			return new Response(`Failed to process audio`, {
				status: response.status
			});
		}

		const body = await response.json();

		return new Response(
			JSON.stringify({
				transcript: body.text
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		console.error('Unexpected error:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
