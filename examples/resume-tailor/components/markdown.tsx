import { FC, memo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

interface MarkdownProps extends Options {
  className?: string
}

const MarkdownWithClass: FC<MarkdownProps> = ({ className, ...props }) => (
  <div className={className}>
    <ReactMarkdown {...props} />
  </div>
)

export const MemoizedReactMarkdown: FC<MarkdownProps> = memo(
  MarkdownWithClass,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);
