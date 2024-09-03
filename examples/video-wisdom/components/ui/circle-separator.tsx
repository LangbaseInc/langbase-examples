import cn from 'mxcn';

export default function CircleSeparator({
	className = ''
}: {
	className?: string;
}) {
	return (
		<svg
			viewBox="0 0 2 2"
			className={cn(
				'h-0.5 w-0.5 flex-none fill-muted-foreground',
				className
			)}
		>
			<circle cx={1} cy={1} r={1} />
		</svg>
	);
}
