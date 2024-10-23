import cn from 'mxcn';
import React from 'react';

export default function Badge({
	children,
	className
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div>
			<span
				className={cn(
					'inline-flex min-w-[92px] items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border',
					className
				)}
			>
				{children}
			</span>
		</div>
	);
}
