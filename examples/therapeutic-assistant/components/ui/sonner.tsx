'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			richColors
			offset={40}
			duration={4000}
			visibleToasts={9}
			closeButton={true}
			position="bottom-right"
			className="toaster group "
			theme={theme as ToasterProps['theme']}
			toastOptions={{
				classNames: {
					toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
					title: 'group-[.toast]:text-black',
					description: 'group-[.toast]:text-black',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
					error: '!border-destructive/50 !bg-destructive !xtext-destructive-foreground',
					success:
						'!border-green-600/50 !bg-green-500 dark:!bg-green-400 !text-black',
					warning:
						'!border-warning/50 !bg-warning !text-warning-foreground',
					info: '!border-blue-400/50 !bg-blue-500 !text-black',
					// TODO: sonner@1.4.41 has this fix but has description issues, uncomment after updating
					// @ts-ignore false ts error
					loading:
						'!border-border/50 !bg-muted-foreground !text-muted',
					closeButton: 'left-[99.5%] bg-muted-foreground text-black'
				}
			}}
			{...props}
		/>
	);
};

export { Toaster };
