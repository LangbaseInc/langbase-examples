'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fromReadableStream } from 'langbase';
import { useState } from 'react';

export default function DocsQnA() {
	const [prompt, setPrompt] = useState(''); // User input
	const [completion, setCompletion] = useState(''); // AI response
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(''); // Error state

	const handleSubmit = async (e: React.FormEvent) => {
		// Prevent form submission
		e.preventDefault();

		// Prevent empty prompt or loading state
		if (!prompt.trim() || loading) return;

		// Change loading state
		setLoading(true);
		setCompletion('');
		setError('');

		try {
			// Fetch response from the server
			const response = await fetch('/api/generate', {
				method: 'POST',
				body: JSON.stringify({ prompt }),
				headers: { 'Content-Type': 'text/plain' },
			});

			// If response is not successful, throw an error
			if (response.status !== 200) {
				const errorData = await response.text();
				throw new Error(errorData);
			}

			// Parse response stream
			if (response.body) {
				// Stream the response body
				const stream = fromReadableStream(response.body);

				// Iterate over the stream
				for await (const chunk of stream) {
					const content = chunk?.choices[0]?.delta?.content;
					content && setCompletion(prev => prev + content);
				}
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-neutral-200 rounded-md p-4 flex flex-col gap-2 w-full">
			<div className="flex flex-col gap-2 w-full">
				<p className="text-muted-foreground">
					Ask a question about your documents.
				</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-full items-center gap-2"
			>
				<Input
					type="text"
					placeholder="Ask a question..."
					onChange={e => setPrompt(e.target.value)}
					value={prompt}
					required
				/>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? 'AI is thinking...' : 'Ask AI'}
				</Button>
			</form>
			{
				error && (
					<p className="text-red-500 text-sm mt-4">
						<strong>Error:</strong> {error}
					</p>
				)
			}
			{completion && (
				<p className="mt-4">
					<strong>Response:</strong> {completion}
				</p>
			)}
		</div>
	);
}
