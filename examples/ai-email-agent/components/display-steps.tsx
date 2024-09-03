import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';
import { IconSpinner } from './ui/icons';
import Link from 'next/link';

export const DisplaySteps = ({
	email,
	completedSteps,
	emailReply
}: {
	email: string;
	completedSteps: any;
	emailReply: string;
}) => {
	return (
		<div className="flex flex-col items-end max-w-4xl mx-auto">
			{completedSteps?.email && (
				<StepEmail email={completedSteps.email.content} />
			)}
			<div className="flex justify-between w-full">
				{completedSteps?.sentiment && (
					<StepSentiment sentiment={completedSteps.sentiment} />
				)}
				{completedSteps?.summary && (
					<StepSummary summary={completedSteps.summary} />
				)}
			</div>
			{completedSteps?.respond && (
				<StepDecision respond={completedSteps.respond} />
			)}
			{completedSteps?.tone && (
				<StepEmailWriter tone={completedSteps.tone} />
			)}
			{completedSteps?.emailReply && (
				<StepEmailReply
					step={completedSteps.emailReply}
					reply={emailReply}
				/>
			)}
		</div>
	);
};

const StepEmail = ({ email }: { email: string }) => {
	return (
		<div className="relative pb-10 w-1/2">
			<div
				aria-hidden="true"
				className="absolute left-0 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-500"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 -ml-4">
						<CheckIcon
							aria-hidden="true"
							className="h-5 w-5 text-white"
						/>
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Incoming Email</span>
					<span className="text-sm text-gray-500 mt-2">
						{displayContent(email)}
					</span>
				</span>
			</span>
		</div>
	);
};

const StepSentiment = ({ sentiment }: { sentiment: any }) => {
	return (
		<div className="relative pb-10 w-1/2">
			<span className="group relative flex items-start justify-end">
				<span className="mr-8 flex min-w-0 flex-col text-right">
					<span className="text-sm font-medium">
						Sentiment Analysis
					</span>
					<span className="text-sm text-gray-500 mt-2">
						{sentiment?.content}
					</span>
					<PipeLink
						href="https://langbase.com/examples/email-sentiment"
						text="email-sentiment"
					/>
				</span>
			</span>
		</div>
	);
};

const StepSummary = ({ summary }: { summary: any }) => {
	return (
		<div className="relative pb-10 w-1/2">
			{summary?.content && (
				<div
					aria-hidden="true"
					className="absolute left-0 top-0 -ml-px mt-0.5 h-full w-0.5 bg-indigo-500"
				/>
			)}
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 -ml-4">
						{summary.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{summary.status === 'current' && (
							<IconSpinner
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Email Summary</span>
					<span className="text-sm text-gray-500 mt-2">
						{summary?.content}
					</span>
					<PipeLink
						href="https://langbase.com/examples/summarizer"
						text="summarizer"
					/>
				</span>
			</span>
		</div>
	);
};

const StepDecision = ({ respond }: { respond: any }) => {
	return (
		<div className="relative pb-10 w-1/2">
			{respond?.content?.respond && (
				<div
					aria-hidden="true"
					className="absolute left-0 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-500"
				/>
			)}
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 -ml-4">
						{respond.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{respond.status === 'current' && (
							<IconSpinner
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Should respond?</span>
					<span className="text-sm text-gray-500 mt-2">
						{!respond.content && 'Making a decision...'}
						{respond.content && (
							<>
								Reply: {respond.content.respond ? 'Yes' : 'No'}
								<br />
								Category: {respond.content.category}
							</>
						)}
					</span>
					<PipeLink
						href="https://langbase.com/examples/decision-maker"
						text="decision-maker"
					/>
				</span>
			</span>
		</div>
	);
};

const StepEmailWriter = ({ tone }: { tone: any }) => {
	return (
		<div className="relative pb-10 w-1/2">
			<div
				aria-hidden="true"
				className="absolute left-0 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-500"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 -ml-4">
						{tone.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{tone.status === 'current' && (
							<IconSpinner
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Email Writer</span>
					<span className="text-sm text-gray-500 mt-2">
						{tone?.content}
					</span>
					<PipeLink
						href="https://langbase.com/examples/pick-email-writer"
						text="pick-email-writer"
					/>
				</span>
			</span>
		</div>
	);
};

const StepEmailReply = ({ step, reply }: { step: any; reply: string }) => {
	return (
		<div className="relative pb-10 w-1/2">
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 -ml-4">
						{step.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{step.status === 'current' && (
							<IconSpinner
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Email Reply</span>
					<span className="text-sm text-gray-500 mt-2">
						{!reply && step?.content}
						{reply && displayContent(reply)}
					</span>
					<PipeLink
						href="https://langbase.com/examples/email-writer"
						text="email-writer"
					/>
				</span>
			</span>
		</div>
	);
};

const displayContent = (content: string) => {
	return content.split('\n').map((line, index) => (
		<React.Fragment key={index}>
			{line}
			<br />
		</React.Fragment>
	));
};

const PipeLink = ({ href, text }: { href: string; text: string }) => {
	return (
		<span className="text-sm text-gray-500 mt-2">
			Pipe:{' '}
			<Link
				href={href}
				target="_blank"
				className="text-indigo-400 hover:underline "
			>
				{text}
			</Link>
		</span>
	);
};
