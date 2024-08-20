import React, { Dispatch, SetStateAction, FormEvent, useState } from 'react';
import PromptForm from './prompt-form';
import { RecentChat } from './alchemist-page';
import BlurFade from './magicui/blur-fade';
import Switch from './switch';

const Welcome = ({
	prompt,
	onSubmit,
	isLoading,
	setPrompt,
	recentChats,
	showWelcome,
	handleOnClick,
	showRecentChats
}: {
	prompt: string;
	onSubmit: ({
		e,
		prompt
	}: {
		e?: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
	isLoading: boolean;
	showWelcome: boolean;
	showRecentChats: boolean;
	recentChats: RecentChat[];
	setPrompt: Dispatch<SetStateAction<string>>;
	handleOnClick: (chat: RecentChat) => void;
}) => {
	if (!showWelcome) return <></>;

	return (
		<BlurFade delay={0.15} className="w-full">
			<div className="w-full flex flex-col items-center gap-y-8 pt-16 sm:pt-10">
				<div className="flex flex-col items-center gap-y-4">
					<h2 className="text-2xl sm:text-5xl font-semibold flex">
						Code Alchemist
					</h2>
					<span className="w-full sm:w-2/3 text-center text-muted-foreground leading-7">
						An AI powered coding agent to generate optimized
						database schemas, SQL queries and fully functional code
						snippets
					</span>
				</div>
				<PromptForm
					prompt={prompt}
					onSubmit={onSubmit}
					isLoading={isLoading}
					setPrompt={setPrompt}
				/>
				<Switch
					onSubmit={onSubmit}
					setPrompt={setPrompt}
					isLoading={isLoading}
					recentChats={recentChats}
					handleOnClick={handleOnClick}
					showRecentChats={showRecentChats}
				/>
			</div>
		</BlurFade>
	);
};

export default Welcome;
