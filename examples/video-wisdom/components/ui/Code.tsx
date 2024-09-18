import cn from 'mxcn';

export default function Code({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<code
			className={cn('bg-background rounded-lg px-2 py-1 mx-1', className)}
		>
			{children}
		</code>
	);
}
