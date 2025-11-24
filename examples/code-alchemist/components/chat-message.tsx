
import cn from 'mxcn';
import { Streamdown } from 'streamdown';
import { IconSparkle } from './ui/iconists/icon-sparkle';

export interface ChatMessageProps {
	message: string;
	showSandbox: boolean;
}

export function ChatMessage({
	message,
	showSandbox,
	...props
}: ChatMessageProps) {
	if (showSandbox || !message.length) return <></>;

	return (
		<div className="w-full md:w-[550px]">
			<div
				className={cn('group relative mb-4 flex items-start md:-ml-12')}
				{...props}
			>
				<div
					className={cn(
						'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl border shadow',
						'bg-primary text-primary-foreground'
					)}
				>
					<IconSparkle className="size-3" />
				</div>
				<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
					<Streamdown>{message}</Streamdown>
				</div>
			</div>
		</div>
	);
}
