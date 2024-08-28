'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DocsQnA() {
	const [prompt, setPrompt] = useState(''); // User input
	const [completion, setCompletion] = useState(''); // AI response
	const [loading, setLoading] = useState(false); // Loading state
	const [error, setError] = useState(''); // Error state


	return (
		<div className="bg-neutral-200 rounded-md p-4 flex flex-col gap-2 w-full">
			<div className="flex flex-col gap-2 w-full">
				<p className="text-muted-foreground">
					Ask a question about your documents.
				</p>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
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
