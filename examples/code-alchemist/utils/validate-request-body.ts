import { z } from 'zod';

const bodySchema = z.object({
	prompt: z.string()
});

/**
 * Validates the request body.
 *
 * @param req - The request object.
 * @returns An object containing the prompt and error, if any.
 */
export async function validateRequestBody(req: Request) {
	const body = await req.json();
	const { success, data } = bodySchema.safeParse(body);

	if (!success) {
		return {
			prompt: null,
			error: 'Invalid request body'
		};
	}

	return {
		prompt: data.prompt,
		error: null
	};
}
