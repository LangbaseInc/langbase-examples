'use client';

import cn from 'mxcn';
import { EmailInput } from './email-input';
import { Opening } from './opening';
import { useState } from 'react';
import { DisplaySteps } from './display-steps';
import { toast } from 'sonner';
import { fromReadableStream } from 'langbase';

export function AgentPage({ className }: React.ComponentProps<'div'>) {
	const [inputEmail, setInputEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [completedSteps, setCompletedSteps] = useState({});
	const [emailReply, setEmailReply] = useState('');

	// Demo data
	// const [summary, setSummary] =
	// 	useState(`Congratulations! You've won a $1,000 Gift Card. Claim it now by clicking the link below, but hurry—this offer is limited!
	// Best,
	// The Rewards Team
	// support@rewards.com`);
	// const [sentiment, setSentiment] = useState('happy');
	// const [decision, setDecision] = useState({
	// 	byWhen: null,
	// 	category: 'spam',
	// 	priority: null,
	// 	respond: false
	// });

	const analyzeSentiment = async (email: string) => {
		// return { sentiment };

		const response = await fetch('/api/sentiment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const data = await response.json();
		// console.log('Sentiment:', data);
		return data;
	};

	const summarizeEmail = async (email: string) => {
		// return { summary };

		// Wait for just over a second due to rate limiting
		await new Promise(resolve => setTimeout(resolve, 1500));

		const response = await fetch('/api/summarize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		const data = await response.json();
		// console.log('Summary:', data);
		return data;
	};

	const shouldRespondToEmail = async (summary: string, sentiment: string) => {
		// return { decision };

		// Wait for just over a second due to rate limiting
		await new Promise(resolve => setTimeout(resolve, 1500));

		const response = await fetch('/api/respond', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ summary, sentiment })
		});

		const data = await response.json();
		console.log('Response:', data);
		return data;
	};

	const pickEmailWriter = async (summary: string, sentiment: string) => {
		// return { tone };

		// Wait for just over a second due to rate limiting
		await new Promise(resolve => setTimeout(resolve, 1500));

		const response = await fetch('/api/pick-email-writer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ summary, sentiment })
		});

		const data = await response.json();
		console.log('Tone:', data);
		return data;
	};

	const generateEmailReply = async (writer: string, emailSummary: string) => {
		// return { emailReply };

		// Wait for just over a second due to rate limiting
		await new Promise(resolve => setTimeout(resolve, 1500));

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
			const stream = fromReadableStream(response.body);

			for await (const chunk of stream) {
				const content = chunk?.choices[0]?.delta?.content || '';
				content && setEmailReply(prev => prev + content);
			}
		}

		// const data = await response.json();
		// console.log('Email Reply:', data);
		return emailReply;
	};

	const sendEmail = async (email: string) => {
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

		// Wait for 2 seconds
		await new Promise(resolve => setTimeout(resolve, 2000));

		const [sentimentAnalysis, emailSummary] = await Promise.all([
			analyzeSentiment(email),
			summarizeEmail(email)
		]);
		const { sentiment } = sentimentAnalysis;
		const { summary } = emailSummary;
		console.log('Sentiment:', sentiment);
		console.log('Summary:', summary);
		// return;

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

		// Wait for 2 seconds
		// await new Promise(resolve => setTimeout(resolve, 2000));

		// Make a decision if we should respond to email or not
		const { respond, category, byWhen, priority } =
			await shouldRespondToEmail(summary, sentiment);

		if (!respond) {
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

		// Generate email reply
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

	return (
		<div className="min-h-screen">
			<EmailInput
				email={inputEmail}
				setEmail={setInputEmail}
				isLoading={isLoading}
				sendEmail={sendEmail}
			/>
			<div className={cn('pb-36 pt-4 md:pt-10', className)}>
				{!isLoading && isEmptyObject(completedSteps) && <Opening />}
				{!isEmptyObject(completedSteps) && (
					<DisplaySteps
						email={inputEmail}
						completedSteps={completedSteps}
						emailReply={emailReply}
					/>
				)}
			</div>
		</div>
	);
}

const isEmptyObject = (obj: object): boolean => {
	return Object.keys(obj).length === 0;
};
