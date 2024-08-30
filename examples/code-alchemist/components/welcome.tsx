import React, { Dispatch, SetStateAction, FormEvent } from 'react';
import PromptForm from './prompt-form';
import { RecentChat } from './alchemist-page';
import BlurFade from './magicui/blur-fade';
import Switch from './switch';
import Loading from './loading';

const Welcome = ({
	prompt,
	onSubmit,
	isLoading,
	setPrompt,
	showSwitch,
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
	showSwitch: boolean;
	showWelcome: boolean;
	showRecentChats: boolean;
	recentChats: RecentChat[];
	setPrompt: Dispatch<SetStateAction<string>>;
	handleOnClick: (chat: RecentChat) => void;
}) => {
	if (!showWelcome) return <></>;

	return (
		<BlurFade delay={0.15} className="w-full flex flex-col items-center">
			<div className="w-full md:w-[650px] flex flex-col items-center gap-y-8 pt-16 sm:pt-10">
				<div className="flex flex-col items-center gap-y-4 w-full">
					<h2 className="text-2xl sm:text-5xl font-semibold flex">
						Code Alchemist
					</h2>
					<span className="w-full sm:w-[90%] text-center text-muted-foreground leading-7">
						An AI powered coding agent to generate optimized
						database schemas, SQL queries and fully functional code
						snippets
					</span>
				</div>
				<PromptForm
					title="Prompt"
					prompt={prompt}
					onSubmit={onSubmit}
					isLoading={isLoading}
					setPrompt={setPrompt}
				/>
				<Switch
					onSubmit={onSubmit}
					setPrompt={setPrompt}
					showSwitch={showSwitch}
					recentChats={recentChats}
					handleOnClick={handleOnClick}
					showRecentChats={showRecentChats}
				/>
				<Loading isLoading={isLoading} />
			</div>
		</BlurFade>
	);
};

export default Welcome;
