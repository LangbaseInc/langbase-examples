import cn from 'mxcn';

export default function Hr({ className }: { className?: string }) {
	return (
		<hr
			className={cn(
				'h-[2px] w-full bg-background border-0 border-border border-b-[1px] my-20',
				className
			)}
		/>
	);
}
