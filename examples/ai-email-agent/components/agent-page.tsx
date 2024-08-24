'use client';

import cn from 'mxcn';
import { EmailInput } from './email-input';
import { useState } from 'react';
import { DisplaySteps } from './display-steps';
import { toast } from 'sonner';
import { fromReadableStream } from 'langbase';
import { Welcome } from './welcome';
import { UseCases } from './use-cases';

export function AgentPage({ className }: React.ComponentProps<'div'>) {
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

		const data = await response.json();
		return data;
	};

	const summarizeEmail = async (email: string) => {
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
		return data;
	};

	const shouldRespondToEmail = async (summary: string, sentiment: string) => {
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
		return data;
	};

	const pickEmailWriter = async (summary: string, sentiment: string) => {
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
		return data;
	};

	const generateEmailReply = async (writer: string, emailSummary: string) => {
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

	const resetAgent = () => {
		setInputEmail('');
		setCompletedSteps({});
		setEmailReply('');
	};

	return (
		<div className="min-h-screen">
			<Welcome />
			<EmailInput
				email={inputEmail}
				setEmail={setInputEmail}
				isLoading={isLoading}
				sendEmail={sendEmail}
				resetAgent={resetAgent}
			/>
			<div className={cn('pb-36 pt-4 md:pt-10', className)}>
				{!isLoading && isEmptyObject(completedSteps) && (
					<UseCases sendEmail={sendEmail} />
				)}
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
