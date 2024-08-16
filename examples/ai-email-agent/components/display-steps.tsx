import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';
import { IconSpinner } from './ui/icons';

export const DisplaySteps = ({
	email,
	completedSteps
}: {
	email: string;
	completedSteps: any;
}) => {
	return (
		<div className="max-w-4xl mx-auto">
			{completedSteps?.email && (
				<StepEmail email={completedSteps.email.content} />
			)}
			{completedSteps?.sentiment && (
				<StepSentiment sentiment={completedSteps.sentiment} />
			)}
			{completedSteps?.summary && (
				<StepSummary summary={completedSteps.summary} />
			)}
			{completedSteps?.respond && (
				<StepDecision respond={completedSteps.respond} />
			)}
			{completedSteps?.tone && (
				<StepEmailWriter tone={completedSteps.tone} />
			)}
			{completedSteps?.emailReply && (
				<StepEmailReply emailReply={completedSteps.emailReply} />
			)}
		</div>
	);
};

const StepEmail = ({ email }: { email: string }) => {
	return (
		<div className="relative pb-10">
			<div
				aria-hidden="true"
				className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
						<CheckIcon
							aria-hidden="true"
							className="h-5 w-5 text-white"
						/>
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">Incoming Email</span>
					<span className="text-sm text-gray-500 mt-2">{email}</span>
				</span>
			</span>
		</div>
	);
};

const StepSentiment = ({ sentiment }: { sentiment: any }) => {
	return (
		<div className="relative pb-10">
			<div
				aria-hidden="true"
				className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
						{sentiment.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{sentiment.status === 'current' && (
							<IconSpinner
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
					</span>
				</span>
				<span className="ml-4 flex min-w-0 flex-col">
					<span className="text-sm font-medium">
						Sentiment Analysis
					</span>
					<span className="text-sm text-gray-500 mt-2">
						{sentiment?.content}
					</span>
				</span>
			</span>
		</div>
	);
};

const StepSummary = ({ summary }: { summary: any }) => {
	return (
		<div className="relative pb-10">
			<div
				aria-hidden="true"
				className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
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
				</span>
			</span>
		</div>
	);
};

const StepDecision = ({ respond }: { respond: any }) => {
	return (
		<div className="relative pb-10">
			{respond?.content?.respond !== false && (
				<div
					aria-hidden="true"
					className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
				/>
			)}
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
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
								Decision:{' '}
								{respond.content.respond ? 'Yes' : 'No'}
								<br />
								Category: {respond.content.category}
							</>
						)}
					</span>
				</span>
			</span>
		</div>
	);
};

const StepEmailWriter = ({ tone }: { tone: any }) => {
	return (
		<div className="relative pb-10">
			<div
				aria-hidden="true"
				className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
			/>
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
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
					<span
						className="text-sm text-gray-500 mt-2"
						dangerouslySetInnerHTML={{ __html: tone?.content }}
					/>
				</span>
			</span>
		</div>
	);
};

const StepEmailReply = ({ emailReply }: { emailReply: any }) => {
	return (
		<div className="relative pb-10">
			<span className="group relative flex items-start">
				<span className="flex h-9 items-center">
					<span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
						{emailReply.status === 'complete' && (
							<CheckIcon
								aria-hidden="true"
								className="h-5 w-5 text-white"
							/>
						)}
						{emailReply.status === 'current' && (
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
						{emailReply?.content}
					</span>
				</span>
			</span>
		</div>
	);
};
