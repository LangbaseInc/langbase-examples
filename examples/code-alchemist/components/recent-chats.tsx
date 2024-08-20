import cn from 'mxcn';
import { IconChat } from './ui/iconists/icon-chat';
import dayjs from 'dayjs';
import { RecentChat } from './alchemist-page';

const RecentChats = ({
	recentChats,
	handleOnClick
}: {
	recentChats: RecentChat[];
	handleOnClick: (chat: RecentChat) => void;
}) => {
	if (!recentChats.length) {
		return <></>;
	}

	/**
	 * Calculates the time difference between the given timestamp and the current time.
	 *
	 * @param t - The timestamp to calculate the time difference from.
	 * @returns The time difference in a human-readable format.
	 */
	function getTimeDiff(t: string) {
		const time = dayjs(t);
		const hoursAgo = dayjs().diff(time, 'hours');
		const minutesAgo = dayjs().diff(time, 'minutes');

		let timeAgo = '';
		if (hoursAgo >= 24) {
			const daysAgo = Math.floor(hoursAgo / 24);
			timeAgo = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
		} else if (hoursAgo > 0) {
			timeAgo = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
		} else {
			timeAgo = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
		}

		return timeAgo;
	}

	return (
		<div className="md:w-[640px] space-y-4 text-sm">
			<p className="font-semibold">Your recent chats</p>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{recentChats.map((chat, i) => {
					return (
						<div
							key={i}
							onClick={() => handleOnClick(chat)}
							className={cn(
								'rounded-md border border-muted-foreground/20 p-4 space-y-3 cursor-pointer',
								'transition-all hover:bg-background'
							)}
						>
							<IconChat
								className="text-muted-foreground/50 size-3"
								aria-hidden="true"
							/>
							<p className="font-light leading-6 line-clamp-2">
								{chat.prompt}
							</p>
							<p className="text-muted-foreground font-light text-xs">
								{getTimeDiff(chat.time)}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RecentChats;
