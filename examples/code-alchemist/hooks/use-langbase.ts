import { RecentChat } from '@/components/alchemist-page';
import { getRunner } from 'langbase';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const useLangbase = () => {
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);
	const [completion, setCompletion] = useState('');
	const [lastRanPipeAgent, setLastRanPipeAgent] = useState('');
	const [showWelcome, setShowWelcome] = useState(true);
	const [hasFinishedRun, setHasFinishedRun] = useState(false);
	const [showRecentChats, setShowRecentChats] = useState(false);
	const [recentChats, setRecentChats] = useState<RecentChat[]>([]);

	/**
	 * Executes the Code Alchemist agent with the provided prompt and handles the response stream.
	 *
	 * @param {Object} params - The parameters for running the Code Alchemist agent
	 * @param {FormEvent<HTMLFormElement>} [params.e] - Optional form event to prevent default behavior
	 * @param {string} params.prompt - The prompt to send to the Code Alchemist agent
	 * @param {string} [params.originalPrompt] - Optional original prompt text
	 *
	 * @throws {Error} When the API request fails or returns an error response
	 *
	 * @returns {Promise<void>}
	 */
	async function runCodeAlchemistAgent({
		e,
		prompt,
		originalPrompt
	}: {
		prompt: string;
		e?: FormEvent<HTMLFormElement>;
		originalPrompt?: string;
	}) {
		e && e.preventDefault();

		// if the prompt is empty, return
		if (!prompt.trim()) {
			toast.info('Please enter a prompt first.');
			return;
		}

		try {
			setLoading(true);
			setLastRanPipeAgent('');
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
			setLastRanPipeAgent(lastRanPipe);

			setPrompt('');
			setCompletion('');

			// if the last ran pipe is not code-alchemist, show the welcome screen
			if (lastRanPipe !== 'code-alchemist') {
				setShowWelcome(false);
			}
			setShowRecentChats(false);


			let localCompletion = '';

			// get the response body as a stream
			if (response.body) {
				const runner = getRunner(response.body);
				// const stream = fromReadableStream(response.body);
				runner.on('content', (content) => {
					content && setCompletion(prev => prev + content);
					content && (localCompletion += content);
				});
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

		await runCodeAlchemistAgent({
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
		setLastRanPipeAgent(chat.pipe);
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
	const showSandbox = !showWelcome && lastRanPipeAgent !== 'code-alchemist';

	// show app preview if
	// 1. the last ran pipe is react-copilot
	// 2. the run has finished
	const showPreview = lastRanPipeAgent === 'react-copilot' && hasFinishedRun;

	// Show the opening if
	// 1. The welcome screen is shown
	// 2. The recent chats are not shown
	// 3. The completion is empty
	// 4. The loading state is false
	const showSwitch = showWelcome && !completion.length && !loading;

	return {
		prompt,
		loading,
		setPrompt,
		completion,
		recentChats,
		showSandbox,
		showWelcome,
		improveCode,
		showPreview,
		showSwitch,
		hasFinishedRun,
		showRecentChats,
		lastRanPipeAgent,
		setShowRecentChats,
		handleRecentChatClick,
		runCodeAlchemistAgent
	};
};

export default useLangbase;
