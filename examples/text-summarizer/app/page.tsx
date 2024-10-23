'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import Message from './components/message';
import { DEFAULT_CONTENT } from './data';

export default function Home() {
	const [content, setContent] = useState(DEFAULT_CONTENT);
	const [error, setError] = useState('');

	const body = {
		content
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setMessages([]);
		setError('');
		append({
			role: 'user',
			content: ''
		});
	};

	const { messages, setMessages, isLoading, append } = useChat({
		api: `/api/generate-summary`,
		body,
		onResponse: async (response: any) => {
			// Error handling
			if (!response.ok) {
				const res = await response.json();
				// Set error state if error message exists
				if (!res.success && res.error?.message) {
					setError(res.error.message);
				} else {
					setError(
						'Internal server error. Refresh to try again. Or contact support.'
					);
				}
			}
		}
	});

	return (
		<main className="md:space-y-12">
			<div className="md:grid md:grid-cols-3">
				<div className="relative col-span-1 md:min-h-screen flex flex-col justify-between px-8 pt-16 md:p-20">
					<div className="space-y-16">
						<header className="flex flex-col justify-center space-y-4">
							<h1 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight uppercase">
								AI Text Summarizer
							</h1>
							<p className="text-muted-foreground">
								Summarize any text into a less wordy version
							</p>
						</header>
						<div className="flex flex-col justify-center space-y-4">
							<form
								onSubmit={handleSubmitForm}
								className="space-y-8"
							>
								<div className="space-y-4">
									<label
										htmlFor="content"
										className="block text-sm font-medium leading-6 text-foreground"
									>
										Content
									</label>
									<textarea
										required
										value={content}
										onChange={e => {
											setContent(e.target.value);
										}}
										tabIndex={1}
										placeholder="Paste your content here..."
										rows={12}
										maxLength={5000}
										name="content"
										id="content"
										className="block bg-muted w-full rounded-lg border-0 py-1.5 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 px-4"
									/>
								</div>
								<div className="flex gap-x-4">
									<button
										type="submit"
										className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 space-x-2"
									>
										{isLoading && (
											<svg
												className="size-4 animate-spin mr-2"
												viewBox="0 0 24 24"
												fill="none"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													stroke-width="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
										)}
										{isLoading ? 'Generating' : 'Generate'}
									</button>
								</div>
							</form>
						</div>
					</div>
					<footer className="mt-12 hidden md:block">
						<p className="text-xs text-muted-foreground uppercase">
							Powered by{' '}
							<a
								href="https://langbase.com/langbase/text-summarizer"
								className="underline"
							>
								Langbase
							</a>
							, Next.js and Tailwind CSS
						</p>
					</footer>
				</div>
				<div className="col-span-2">
					<div className="h-[calc(100vh-20px)] flex flex-col border mt-5 p-1 pr-0 border-r-0 rounded-tl-[calc(var(--radius)+2px)] rounded-bl-[calc(var(--radius)+2px)]">
						<div className="py-5 px-4 sm:px-6 lg:px-6 md:flex md:items-center md:justify-between bg-background">
							<div className="min-w-0 flex-1 flex gap-2 items-center">
								<h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
									Summary
								</h2>
							</div>
						</div>
						<div className="h-full overflow-scroll bg-muted border border-border-muted rounded-tl-lg rounded-bl-lg aspect-video shadow p-4 sm:p-2 lg:p-4">
							{error && (
								<div className="text-red-500 italic">
									{error}
								</div>
							)}
							{messages.length > 0 &&
								messages
									.filter(m => m.role !== 'user')
									.slice(-1)
									.map((m, index) => (
										<Message key={index} message={m} />
									))}
							{isLoading &&
								!error.length &&
								messages.length < 2 && (
									<div className="text-muted-foreground italic">
										AI is thinking...
									</div>
								)}
							{messages.length === 0 && !error && (
								<div className="text-muted-foreground italic">
									No content yet. Generate a summary to see
									the preview.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
