'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

export default function Home() {
	const [topic, setTopic] = useState('REST API Best Practices');
	const [wordCount, setWordCount] = useState(750);
	const [sentenceCount, setSentenceCount] = useState(4);
	const [error, setError] = useState('');

	const body = {
		variables: [
			{
				name: 'topic',
				value: topic,
			},
			{
				name: 'word_count',
				value: wordCount.toString(),
			},
			{
				name: 'sentence_count',
				value: sentenceCount.toString(),
			},
		],
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setMessages([]);
		setError('');
		append({
			role: 'user',
			content: topic,
		});
	};

	const { messages, setMessages, isLoading, append } = useChat({
		api: `/api/generate-blog`,
		body,
		onResponse: async (response: any) => {
			// Error handling
			if (!response.ok) {
				const res = await response.json();
				// Set error state if error message exists
				if (!res.success && res.error?.message) {
					setError(res.error.message);
				} else {
					setError('Internal server error. Refresh to try again. Or contact support.');
				}
			}
		},
	});

	return (
		<main className='space-y-12'>
			<div className='grid grid-cols-3'>
				<div className='relative col-span-1 min-h-screen flex flex-col justify-between p-20'>
					<div className='space-y-16'>
						<header className='flex flex-col justify-center space-y-4'>
							<h1 className='text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight uppercase'>
								AI Tech Blog Writer
							</h1>
							<p className='text-muted-foreground'>
								Craft Your Tech Blogs Effortlessly with AI
							</p>
						</header>
						<div className='flex flex-col justify-center space-y-4'>
							<form onSubmit={handleSubmitForm} className='space-y-8'>
								<div className='space-y-4'>
									<label
										htmlFor='topic'
										className='block text-sm font-medium leading-6 text-foreground'
									>
										Topic
									</label>
									<input
										required
										value={topic}
										onChange={e => {
											setTopic(e.target.value);
										}}
										tabIndex={1}
										type='text'
										name='topic'
										id='topic'
										className='block bg-muted w-full rounded-lg border-0 py-1.5 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 px-4'
									/>
								</div>
								<div className='space-y-4'>
									<label
										htmlFor='word_count'
										className='block text-sm font-medium leading-6 text-foreground'
									>
										Word count
									</label>
									<input
										required
										tabIndex={2}
										value={wordCount}
										onChange={e => setWordCount(parseInt(e.target.value))}
										type='number'
										name='word_count'
										id='word_count'
										className='block bg-muted w-full rounded-lg border-0 py-1.5 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 px-4'
									/>
								</div>
								<div className='space-y-4'>
									<label
										htmlFor='sentence_count'
										className='block text-sm font-medium leading-6 text-foreground'
									>
										Sentences per paragraph
									</label>
									<input
										required
										tabIndex={3}
										value={sentenceCount}
										onChange={e => setSentenceCount(parseInt(e.target.value))}
										type='number'
										name='sentence_count'
										id='sentence_count'
										className='block bg-muted w-full rounded-lg border-0 py-1.5 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 px-4'
									/>
								</div>
								<div className='flex gap-x-4'>
									<button
										type='submit'
										className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'
									>
										{isLoading ? 'Generating...' : 'Generate'}
									</button>
								</div>
							</form>
						</div>
					</div>
					<footer className='mt-12'>
						<p className='text-xs text-muted-foreground uppercase'>
							Powered by{' '}
							<a href='https://langbase.com/' className='underline'>
								Langbase
							</a>
							, Next.js and Tailwind CSS
						</p>
					</footer>
				</div>
				<div className='col-span-2'>
					<div className='h-[calc(100vh-20px)] flex flex-col border mt-5 p-1 pr-0 border-r-0 rounded-tl-[calc(var(--radius)+2px)] rounded-bl-[calc(var(--radius)+2px)]'>
						<div className='py-5 px-4 sm:px-6 lg:px-6 md:flex md:items-center md:justify-between bg-background'>
							<div className='min-w-0 flex-1 flex gap-2 items-center'>
								<h2 className='text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight'>
									Blog Preview
								</h2>
							</div>
						</div>
						<div className='h-full overflow-scroll bg-muted border border-border-muted rounded-tl-lg rounded-bl-lg aspect-video shadow p-4 sm:p-2 lg:p-4'></div>
					</div>
				</div>
			</div>
		</main>
	);
}
