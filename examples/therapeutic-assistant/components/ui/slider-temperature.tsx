'use client';

import { cn } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

type SliderProps = React.ComponentPropsWithoutRef<
	typeof SliderPrimitive.Root
> & {
	bg?: string;
};

const SliderTemperature = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	SliderProps
>(({ className, ...props }, ref) => {
	let value = props.defaultValue ? props.defaultValue[0] : 0.2;
	value = props.value && props.value[0] ? props.value[0] : value;

	const isGreen = value <= 0.25;
	const isYellow = value > 0.25 && value <= 0.5;
	const isOrange = value > 0.5 && value <= 0.75;
	const isRed = value > 0.75 && value <= 1.0;

	const gradientClass = isGreen
		? 'bg-green-700'
		: isYellow
			? 'bg-gradient-to-r from-green-700 to-yellow-700'
			: isOrange
				? 'bg-gradient-to-r from-green-700 to-yellow-700 to-orange-700'
				: 'bg-gradient-to-r from-green-700 to-yellow-700 to-orange-700 to-red-700';

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				'relative cursor-pointer flex w-full touch-none select-none items-center rounded-lg bg-background py-1 px-2',
				className
			)}
			{...props}
		>
			<div className="flex justify-center items-center text-sm absolute w-full m-w-full rounded-full top-4">
				<div
					className={cn(
						'w-1/4 h-10 opacity-30 text-center rounded-bl-lg',
						isGreen && 'opacity-100'
					)}
				/>
				<div
					className={cn(
						'w-1/4 h-10 opacity-30 text-center',
						isYellow && 'opacity-100'
					)}
				/>
				<div
					className={cn(
						'w-1/4 h-10 opacity-30 text-center',
						isOrange && 'opacity-100'
					)}
				/>
				<div
					className={cn(
						'w-1/4 h-10 opacity-30 text-center rounded-br-lg',
						isRed && 'opacity-100'
					)}
				/>
			</div>
			<div className="flex justify-center items-center text-sm absolute w-full m-w-full rounded-full top-6 text-foreground font-light">
				<div
					className={cn(
						'w-1/4 text-center opacity-50',
						isGreen && 'opacity-100 text-green-700'
					)}
				>
					Precise
				</div>
				<div
					className={cn(
						'w-1/4 text-center opacity-50',
						isYellow && 'opacity-100 text-yellow-700'
					)}
				>
					Balanced
				</div>
				<div
					className={cn(
						'w-1/4 text-center opacity-50',
						isOrange && 'opacity-100 text-orange-700'
					)}
				>
					Creative
				</div>
				<div
					className={cn(
						'w-1/4 text-center opacity-50',
						isRed && 'opacity-100 text-red-700'
					)}
				>
					Random
				</div>
			</div>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
				<SliderPrimitive.Range
					className={cn(
						`absolute h-full bg-muted`,
						gradientClass
						// isGreen && 'bg-green-700',
						// isYellow && 'bg-yellow-700',
						// isOrange && 'bg-orange-700',
						// isRed && 'bg-red-700'
					)}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
		</SliderPrimitive.Root>
	);
});
SliderTemperature.displayName = SliderPrimitive.Root.displayName;

export { SliderTemperature };
