'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function Providers({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute='class' defaultTheme='system' forcedTheme='dark'>
			{children}
		</NextThemesProvider>
	);
}
