import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from './markdown';

const MarkdownRender = ({ content }: { content: string }) => {
	return (
		<MemoizedReactMarkdown
			remarkPlugins={[remarkGfm, remarkMath]}
			components={{
				h1: ({ node, ...props }) => (
					<h1
						className="text-sm font-medium text-gray-900 dark:text-white"
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className="text-sm font-medium text-gray-900 dark:text-white"
						{...props}
					/>
				)
			}}
		>
			{content}
		</MemoizedReactMarkdown>
	);
};

export default MarkdownRender;
