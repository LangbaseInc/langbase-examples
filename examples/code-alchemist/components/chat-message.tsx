
import cn from 'mxcn';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { IconSparkle } from './ui/iconists/icon-sparkle';
import { MemoizedReactMarkdown } from '@/components/markdown';

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
		<div className="w-[550px]">
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
					<MemoizedReactMarkdown
						className="prose rounded-xl dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words prose-pre:rounded-xl"
						remarkPlugins={[remarkGfm, remarkMath]}
						components={{
							p({ children }) {
								return (
									<p className="mb-2 last:mb-0">{children}</p>
								);
							}
						}}
					>
						{message}
					</MemoizedReactMarkdown>
				</div>
			</div>
		</div>
	);
}
