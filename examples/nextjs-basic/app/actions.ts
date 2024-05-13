'use server';

export async function generateCompletion(topic: string) {
	const url = 'https://api.langbase.com/beta/generate';
	const apiKey = process.env.NEXT_LB_PIPE_API_KEY;

	const data = {
		messages: [{ role: 'user', content: 'Hello!' }],
		variables: [{ name: 'topic', value: topic }],
	};

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify(data),
	});

	const resText = await response.text();
	return resText;
}
