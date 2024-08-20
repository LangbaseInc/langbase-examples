import { langbase } from '@/utils/langbase';
import { getPipeApiKeys } from '@/utils/get-pipe-api-keys';
import { validateRequestBody } from '@/utils/validate-request-body';

export const runtime = 'edge';

/**
 * Handles the POST request for the specified route.
 *
 * @param req - The request object.
 * @returns A response object.
 */
export async function POST(req: Request) {
	try {
		const keys = getPipeApiKeys();

		const { prompt, error } = await validateRequestBody(req);

		if (error || !prompt) {
			return new Response(JSON.stringify(error), { status: 400 });
		}

		const { stream, pipe } = await langbase({
			keys,
			prompt
		});

		if (stream) {
			return new Response(stream.toReadableStream(), {
				headers: {
					pipe
				}
			});
		}

		return new Response(JSON.stringify({ error: 'No stream' }), {
			status: 500
		});
	} catch (error: any) {
		console.error('Uncaught API Error:', error.message);
		return new Response(JSON.stringify(error.message), { status: 500 });
	}
}
