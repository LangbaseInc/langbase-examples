import { useEffect, useState } from 'react';
import { IconCloseSmall } from '@/components/icon-close';
import { IconCopy } from '@/components/icon-copy';
import { LanguageSelector } from '@/components/language';
import Message from '@/components/message';
import { Opening } from '@/components/opening';
import { fromReadableStream } from 'langbase';

export function Translator() {
	const [sentence, setSentence] = useState(
		`Pipe is the fastest way to turn ideas into AI. Pipe is like an AI feature. It is a high-level layer to Large Language Models (LLMs) that creates a personalized AI assistant for your queries.`
	);
	const [inputLanguage, setInputLanguage] = useState('english');
	const [translationLanguage, setTranslationLanguage] = useState('french');
	const [completion, setCompletion] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (!sentence || sentence.length < 3) {
				resetApp();
				return;
			}
			handleSubmitForm();
		}, 1000);

		return () => {
			clearTimeout(debounce);
		};
	}, [sentence, inputLanguage, translationLanguage]);

	const handleSubmitForm = async () => {
		setIsLoading(true);
		setCompletion('');

		try {
			const response = await fetch(`/api/generate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: sentence,
					inputLanguage,
					translationLanguage
				})
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('Error:', error);
				setIsLoading(false);
				return;
			}

			if (response.body) {
				const stream = fromReadableStream(response.body);

				for await (const chunk of stream) {
					const content = chunk?.choices[0]?.delta?.content;
					content && setCompletion(prev => prev + content);
				}
			}
		} catch (error: any) {
			setIsLoading(false);
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(completion);
	};

	const resetApp = () => {
		setSentence('');
		setCompletion('');
	};

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
								{completion.length > 0 && (
									<div className="relative">
										<Message
											id="translation"
											message={completion}
											tabIndex={2}
											disabled
										/>
										<button onClick={() => handleCopy()}>
											<IconCopy className="absolute top-2 right-2" />
										</button>
									</div>
								)}
								{isLoading && completion.length === 0 && (
									<Message
										id="ai-thinking"
										message={`AI is thinking...`}
										tabIndex={2}
										disabled
									/>
								)}
								{!isLoading && completion.length === 0 && (
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
