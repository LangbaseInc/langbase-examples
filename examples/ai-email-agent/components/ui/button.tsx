import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import cn from 'mxcn';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-muted-foreground/25 focus:ring-1 focus:ring-muted-foreground/25 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer gap-2 group',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90 border border-transparent',
				muted: 'bg-muted text-muted-foreground shadow hover:bg-muted/90 border border-transparent',
				warn: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				'destructive-hover':
					'bg-muted border-input text-destructive font-bold shadow-sm hover:bg-destructive hover:text-destructive-foreground border border-input',
				'outline-background':
					'border border-input bg-background text-foreground shadow-sm hover:bg-foreground hover:text-background transition-colors',
				'outline-inverse':
					'border border-input bg-muted-foreground text-muted shadow-sm hover:bg-foreground hover:text-background',
				outline:
					'border border-input bg-transparent shadow-sm hover:bg-foreground hover:text-background',
				'outline-muted':
					'border border-input bg-muted text-foreground shadow-sm hover:bg-foreground hover:text-background',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				green: 'bg-green-500 hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-800 text-primary shadow-sm rounded-lg',
				'green-lite':
					'bg-green-800 hover:bg-green-400 dark:bg-green-900/20 dark:hover:bg-green-800 text-primary shadow-sm rounded-lg'
			},
			size: {
				default: 'h-9 px-4 py-2',
				xs: 'h-6 rounded-lg px-2 text-xs',
				sm: 'h-8 rounded-lg px-3 text-xs',
				lg: 'h-10 rounded-lg px-8',
				xl: 'h-14 rounded-lg px-10',
				icon: 'h-9 w-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
