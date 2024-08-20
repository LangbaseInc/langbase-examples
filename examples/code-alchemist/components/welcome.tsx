import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	FormEvent
} from 'react';
import dayjs from 'dayjs';
import PromptForm from './prompt-form';
import RecentChats from './recent-chats';
import { RecentChat } from './alchemist-page';
import BlurFade from './magicui/blur-fade';
import { IconLangbase } from './ui/icon-langbase';

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
		e: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
	isLoading: boolean;
	showWelcome: boolean;
	showRecentChats: boolean;
	recentChats: RecentChat[];
	setPrompt: Dispatch<SetStateAction<string>>;
	handleOnClick: (chat: RecentChat) => void;
}) => {
	const [timeOfDay, setTimeOfDay] = useState('');

	useEffect(() => {
		const checkTimeOfDay = () => {
			const currentHour = dayjs().hour();

			if (currentHour >= 5 && currentHour < 12) {
				setTimeOfDay('morning');
			} else if (currentHour >= 12 && currentHour < 18) {
				setTimeOfDay('afternoon');
			} else {
				setTimeOfDay('evening');
			}
		};

		showWelcome && checkTimeOfDay();
	}, []);

	if (!showWelcome) return <></>;

	return (
		<BlurFade delay={0.15}>
			<div className="w-full flex flex-col items-center gap-y-8 pt-16 sm:pt-10">
				<h2 className="text-2xl sm:text-5xl font-semibold flex">
					<IconLangbase className="size-8 sm:size-12 mr-2 select-none" />
					{`Good ${timeOfDay}!`}
				</h2>
				<PromptForm
					prompt={prompt}
					onSubmit={onSubmit}
					isLoading={isLoading}
					setPrompt={setPrompt}
				/>
				{showRecentChats && (
					<RecentChats
						recentChats={recentChats}
						handleOnClick={handleOnClick}
					/>
				)}
			</div>
		</BlurFade>
	);
};

export default Welcome;
