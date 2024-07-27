'use client';

import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { IconCloseSmall } from '@/components/icon-close';
import { IconCopy } from '@/components/icon-copy';
import { LanguageSelector } from '@/components/language';
import Message from '@/components/message';
import { Opening } from '@/components/opening';

export default function Home() {
	const initialSentence = `Pipe is the fastest way to turn ideas into AI. Pipe is like an AI feature. It is a high-level layer to Large Language Models (LLMs) that creates a personalized AI assistant for your queries.`;

	const [sentence, setSentence] = useState(initialSentence);
	const [inputLanguage, setInputLanguage] = useState('english');
	const [translationLanguage, setTranslationLanguage] = useState('urdu');

	const [error, setError] = useState('');

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (!sentence || sentence.length < 3) return;
			handleSubmitForm();
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [sentence, inputLanguage, translationLanguage]);

	const body = {
		variables: [
			{
				name: 'sentence',
				value: sentence
			},
			{
				name: 'inputLanguage',
				value: inputLanguage || 'english'
			},
			{
				name: 'translationLanguage',
				value: translationLanguage || 'urdu'
			}
		]
	};

	const handleSubmitForm = async () => {
		setMessages([]);
		setError('');
		append({
			role: 'user',
			content: ''
		});
	};

	const handleCopy = () => {
		const translation = messages
			.filter(m => m.role !== 'user')
			.slice(-1)
			.map(m => m.content)
			.join('');
		navigator.clipboard.writeText(translation);
	};

	const resetApp = () => {
		setSentence('');
		setMessages([]);
		setError('');
	};

	const { messages, setMessages, isLoading, append } = useChat({
		api: `/api/generate`,
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
			<div className="md:grid md:grid-cols-1 md:min-h-screen">
				<div className="relative col-span-1 flex flex-col justify-between px-8 pt-16 md:p-8">
					<div className="space-y-16">
						<Opening />
						<div className="flex justify-center w-full">
							<div className="w-[600px] mx-4">
								<LanguageSelector
									id="input-language"
									language={inputLanguage}
									setLanguage={setInputLanguage}
								/>
								<div className="relative">
									<Message
										id="sentence"
										message={sentence}
										setMessage={setSentence}
										tabIndex={1}
										autoFocus
									/>
									{sentence.length > 0 && (
										<button onClick={() => resetApp()}>
											<IconCloseSmall className="absolute top-2 right-2" />
										</button>
									)}
								</div>
							</div>
							<div className="w-[600px] mx-4">
								<LanguageSelector
									id="translation-language"
									language={translationLanguage}
									setLanguage={setTranslationLanguage}
								/>
								{messages.length > 0 &&
									messages
										.filter(m => m.role !== 'user')
										.slice(-1)
										.map((m, index) => (
											<div
												className="relative"
												key={index}
											>
												<Message
													id="translation"
													key={`translation-${index}`}
													message={m.content}
													tabIndex={2}
													disabled
												/>
												<button
													key={`copy-${index}`}
													onClick={() => handleCopy()}
												>
													<IconCopy className="absolute top-2 right-2" />
												</button>
											</div>
										))}
								{isLoading &&
									!error.length &&
									messages.length < 2 && (
										<Message
											id="ai-thinking"
											message={`AI is thinking...`}
											tabIndex={2}
											disabled
										/>
									)}
								{messages.length === 0 && !error && (
									<Message
										id="placeholder"
										message={`Translation`}
										tabIndex={2}
										disabled
									/>
								)}
							</div>
						</div>
					</div>
					<footer className="mt-12 hidden md:block">
						<hr className="my-12" />
						<p className="text-xs text-muted-foreground uppercase">
							Powered by{' '}
							<a
								href="https://langbase.com/"
								className="underline"
							>
								Langbase
							</a>
							, Next.js and Tailwind CSS
						</p>
					</footer>
				</div>
			</div>
		</main>
	);
}
