import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { RecentChat } from './alchemist-page';
import cn from 'mxcn';
import Usecases from './use-cases';
import RecentChats from './recent-chats';

export default function Switch({
	onSubmit,
	showSwitch,
	setPrompt,
	recentChats,
	handleOnClick,
	showRecentChats
}: {
	showSwitch: boolean;
	showRecentChats: boolean;
	onSubmit: ({
		e,
		prompt
	}: {
		e?: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
	setPrompt: Dispatch<SetStateAction<string>>;
	recentChats: RecentChat[];
	handleOnClick: (chat: RecentChat) => void;
}) {
	const [showUsecase, setShowUsecase] = useState(true);

	if (!showSwitch) return <></>;

	return (
		<div className="w-full flex flex-col gap-8">
			{showRecentChats && (
				<span className="w-full grid grid-cols-2 rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => setShowUsecase(true)}
						className={cn(
							'min-w-[100px] text-xs sm:text-sm font-semibold uppercase justify-center group relative inline-flex items-center bg-muted px-2 py-2 ring-1 ring-inset transition-colors ring-muted-foreground/5 hover:bg-foreground hover:text-background focus:z-10 rounded-l-md',
							showUsecase
								? 'text-background bg-muted-foreground ring-1'
								: 'text-muted-foreground'
						)}
					>
						Use cases
					</button>
					<button
						type="button"
						onClick={() => setShowUsecase(false)}
						className={cn(
							'min-w-[100px] text-xs sm:text-sm font-semibold uppercase justify-center group relative inline-flex items-center bg-muted px-2 py-2 ring-1 ring-inset transition-colors ring-muted-foreground/5 hover:bg-foreground hover:text-background focus:z-10 rounded-r-md',
							!showUsecase
								? 'text-background bg-muted-foreground ring-1'
								: 'text-muted-foreground'
						)}
					>
						Recent Chats
					</button>
				</span>
			)}

			{showUsecase && (
				<Usecases
					onSubmit={onSubmit}
					setPrompt={setPrompt}
					showTitle={!showRecentChats}
				/>
			)}
			{!showUsecase && (
				<RecentChats
					recentChats={recentChats}
					handleOnClick={handleOnClick}
					showRecentChats={showRecentChats}
				/>
			)}
		</div>
	);
}
