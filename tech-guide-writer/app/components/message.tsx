'use client';

import { MemoizedReactMarkdown } from './markdown';
import cn from 'mxcn';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { CodeBlock } from './code-block';

type PromptMessage = {
	id: string;
	role: string;
	content: string;
};

const Message = ({
	message,
	size
}: {
	message: PromptMessage;
	data?: any;
	size?: string;
}) => {
	return (
		<div className="mt-1 px-2 py-4 w-full">
			<MemoizedReactMarkdown
				className={cn(
					'prose prose-zinc break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 md:!max-w-[80%]',
					size && `prose-${size}`
				)}
				remarkPlugins={[remarkGfm, remarkMath]}
				components={{
					p({ children }) {
						return <p className="mb-2 last:mb-0">{children}</p>;
					},
					hr: (props: any) => {
						return (
							<hr
								className="h-[3px] w-full bg-background border-0 border-border border-b-[2px] my-10"
								{...props}
							/>
						);
					},
					code({ node, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || '');

						if (!match) {
							return (
								<code className={className} {...props}>
									{children}
								</code>
							);
						}

						return (
							<CodeBlock
								key={Math.random()}
								language={(match && match[1]) || ''}
								value={String(children).replace(/\n$/, '')}
								{...props}
							/>
						);
					}
				}}
			>
				{message.content}
			</MemoizedReactMarkdown>
		</div>
	);
};

export default Message;
