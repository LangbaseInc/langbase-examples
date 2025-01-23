/**
 * Run Langbase Pipe with a dynamically passed LLM key.
 *
 * @throws {Error} Logs an error if the request fails or if there is a network issue.
 */
async function runPipe() {
	try {
		const llmKey = '<YOUR_LLM_KEY>'; // Replace <YOUR_LLM_KEY> with your LLM key

		const response = await fetch('https://api.langbase.com/v1/pipes/run', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.PIPE_API_KEY}`, // Add your Pipe API key here
				'LB-LLM-Key': `${llmKey}`,
			},
			body: JSON.stringify({
				messages: [
					{
						role: 'user',
						content: 'Hello!',
					},
				],
				stream: false,
			}),
		});

		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error:', error);
	}
}

runPipe();
