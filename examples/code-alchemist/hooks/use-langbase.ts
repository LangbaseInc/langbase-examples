import { RecentChat } from '@/components/alchemist-page';
import { fromReadableStream } from 'langbase';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const useLangbase = () => {
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);
	const [completion, setCompletion] = useState('');
	const [lastRanPipe, setLastRanPipe] = useState('');
	const [showWelcome, setShowWelcome] = useState(true);
	const [hasFinishedRun, setHasFinishedRun] = useState(false);
	const [showRecentChats, setShowRecentChats] = useState(false);
	const [recentChats, setRecentChats] = useState<RecentChat[]>([]);

	/**
	 * Calls the Language Model Microservices (LLMs) API to generate completions based on the provided prompt.
	 *
	 * @param {Object} options - The options for the API call.
	 * @param {string} options.prompt - The prompt for generating completions.
	 * @param {FormEvent<HTMLFormElement>} options.e - The form event triggered by the form submission.
	 * @param {string} [options.originalPrompt] - The original prompt before any modifications.
	 * @returns {void}
	 */
	async function callLLMs({
		e,
		prompt,
		originalPrompt
	}: {
		prompt: string;
		e: FormEvent<HTMLFormElement>;
		originalPrompt?: string;
	}) {
		e.preventDefault();

		// if the prompt is empty, return
		if (!prompt.trim()) {
			toast.info('Please enter a prompt first.');
			return;
		}

		try {
			setLoading(true);
			setLastRanPipe('');
			setHasFinishedRun(false);
			setShowRecentChats(false);

			// make a POST request to the API endpoint to call AI pipes
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt })
			});

			// if the response is not ok, throw an error
			if (!response.ok) {
				const error = await response.json();
				toast.error(error);
				return;
			}

			// get the last called pipe from the response headers
			const lastRanPipe = response.headers.get('pipe') || '';
			setLastRanPipe(lastRanPipe);

			setPrompt('');
			setCompletion('');

			// if the last ran pipe is not code-alchemist, show the welcome screen
			if (lastRanPipe !== 'code-alchemist') {
				setShowWelcome(false);
			}
			setShowRecentChats(false);

			// lastRanPipe !== 'code-alchemist' && setShowWelcome(false);

			let localCompletion = '';

			// get the response body as a stream
			if (response.body) {
				const stream = fromReadableStream(response.body);

				for await (const chunk of stream) {
					const content = chunk?.choices[0]?.delta?.content || '';
					content && setCompletion(prev => prev + content);
					content && (localCompletion += content);
				}
			}

			// save the completion to local storage
			const saveCompletion = lastRanPipe !== 'code-alchemist';

			if (saveCompletion) {
				const history = JSON.parse(
					localStorage.getItem('history') || '[]'
				);

				history.push({
					pipe: lastRanPipe,
					completion: localCompletion,
					time: new Date().toISOString(),
					prompt: originalPrompt || prompt
				});

				localStorage.setItem('history', JSON.stringify(history));
			}
		} catch (error) {
			toast.error('Something went wrong. Please try again later.');
		} finally {
			setLoading(false);
			setHasFinishedRun(true);
		}
	}

	/**
	 * Improve the code by calling the Language Model API with the provided prompt.
	 *
	 * @param e - The form event triggered by submitting the form.
	 * @param prompt - The prompt string to be used for code improvement.
	 * @returns Promise<void>
	 */
	async function improveCode({
		e,
		prompt
	}: {
		e: FormEvent<HTMLFormElement>;
		prompt: string;
	}) {
		e.preventDefault();

		// if the prompt is empty, return
		if (!prompt.trim()) {
			toast.info('Please first enter a prompt');
			return;
		}

		await callLLMs({
			e,
			originalPrompt: prompt,
			prompt: `${completion}\n\n${prompt}` // add the completion to the prompt
		});
	}

	/**
	 * Handles the click event for a recent chat.
	 *
	 * @param chat - The recent chat object.
	 */
	function handleRecentChatClick(chat: RecentChat) {
		setShowWelcome(false);
		setHasFinishedRun(true);
		setShowRecentChats(false);
		setLastRanPipe(chat.pipe);
		setCompletion(chat.completion);
	}

	// load the recent chats from local storage
	useEffect(() => {
		let history = JSON.parse(localStorage.getItem('history') || '[]');
		if (!history.length) return;

		history = history.reverse();
		history = history.slice(0, 6);
		setRecentChats(history);
		setShowRecentChats(true);
	}, []);

	// show sandbox if
	// 1. the welcome screen is not shown
	// 2. the last ran pipe is anything other than code-alchemist
	const showSandbox = !showWelcome && lastRanPipe !== 'code-alchemist';

	// show app preview if
	// 1. the last ran pipe is react-copilot
	// 2. the run has finished
	const showPreview = lastRanPipe === 'react-copilot' && hasFinishedRun;

	// Show the opening if
	// 1. The welcome screen is shown
	// 2. The recent chats are not shown
	// 3. The completion is empty
	// 4. The loading state is false
	const showOpening = showWelcome && !showRecentChats && !completion.length && !loading;

	return {
		prompt,
		loading,
		callLLMs,
		setPrompt,
		completion,
		recentChats,
		showSandbox,
		lastRanPipe,
		showWelcome,
		improveCode,
		showPreview,
		showOpening,
		hasFinishedRun,
		showRecentChats,
		setShowRecentChats,
		handleRecentChatClick
	};
};

export default useLangbase;
