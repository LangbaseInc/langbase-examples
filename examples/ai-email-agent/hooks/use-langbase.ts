import { getRunner } from 'langbase';
import { useState } from 'react';
import { toast } from 'sonner';

const useLangbase = () => {
	const [inputEmail, setInputEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [completedSteps, setCompletedSteps] = useState({});
	const [emailReply, setEmailReply] = useState('');

	const analyzeSentiment = async (email: string) => {
		const response = await fetch('/api/sentiment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const sentimentAnalysis = await response.json();
		return sentimentAnalysis;
	};

	const summarizeEmail = async (email: string) => {
		const response = await fetch('/api/summarize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const summarizedEmail = await response.json();
		return summarizedEmail;
	};

	const shouldRespondToEmail = async (summary: string, sentiment: string) => {
		const response = await fetch('/api/respond', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ summary, sentiment })
		});

		const shouldRespond = await response.json();
		return shouldRespond;
	};

	const pickEmailWriter = async (summary: string, sentiment: string) => {
		const response = await fetch('/api/pick-email-writer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ summary, sentiment })
		});

		const writer = await response.json();
		return writer;
	};

	const generateEmailReply = async (writer: string, emailSummary: string) => {
		const response = await fetch('/api/email-writer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ writer, emailSummary })
		});

		if (!response.ok) {
			const error = await response.json();
			toast.error(error);
			return;
		}

		if (response.body) {
			const stream = getRunner(response.body);

			for await (const chunk of stream) {
				const content = chunk?.choices[0]?.delta?.content || '';
				content && setEmailReply(prev => prev + content);
			}
		}

		return emailReply;
	};

	const sendEmailToAgent = async (email: string) => {
		setInputEmail('');
		setIsLoading(true);

		setCompletedSteps({
			email: {
				content: email,
				status: 'complete'
			},
			sentiment: {
				content: 'Analyzing email sentiment...',
				status: 'current'
			},
			summary: {
				content: 'Preparing email summary...',
				status: 'current'
			}
		});

		// Analyze sentiment and summarize email in parallel
		const [sentimentAnalysis, emailSummary] = await Promise.all([
			analyzeSentiment(email),
			summarizeEmail(email)
		]);
		const { sentiment } = sentimentAnalysis;
		const { summary } = emailSummary;

		setCompletedSteps(prev => ({
			...prev,
			sentiment: {
				content: sentiment,
				status: 'complete'
			},
			summary: {
				content: summary,
				status: 'complete'
			},
			respond: {
				content: null,
				status: 'current'
			}
		}));

		// Make a decision about the email response
		const { respond, category, byWhen, priority } =
			await shouldRespondToEmail(summary, sentiment);

		if (!respond) {
			// If no, then stop the pipeline
			setCompletedSteps(prev => ({
				...prev,
				respond: {
					content: { respond, category, byWhen, priority },
					status: 'complete'
				}
			}));

			setIsLoading(false);
			return;
		}

		setCompletedSteps(prev => ({
			...prev,
			respond: {
				content: { respond, category, byWhen, priority },
				status: 'complete'
			},
			tone: {
				content: 'Picking the correct email writer...',
				status: 'current'
			}
		}));

		// If yes, then pick email writer
		const { tone } = await pickEmailWriter(summary, sentiment);

		setCompletedSteps(prev => ({
			...prev,
			tone: {
				content: tone,
				status: 'complete'
			},
			emailReply: {
				content: 'Generating response...',
				status: 'current'
			}
		}));

		// Generate the email response
		const reply = await generateEmailReply(tone, summary);

		setCompletedSteps(prev => ({
			...prev,
			emailReply: {
				content: reply,
				status: 'complete'
			}
		}));

		setIsLoading(false);
	};

	const resetAgent = () => {
		setInputEmail('');
		setCompletedSteps({});
		setEmailReply('');
	};

	return {
		inputEmail,
		setInputEmail,
		isLoading,
		setIsLoading,
		completedSteps,
		setCompletedSteps,
		emailReply,
		setEmailReply,
		sendEmailToAgent,
		resetAgent
	};
};

export default useLangbase;
