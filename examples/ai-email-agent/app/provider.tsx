'use client';

import {
	ThemeProvider as NextThemesProvider,
	ThemeProviderProps
} from 'next-themes';

export function Providers({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="system">
			{children}
		</NextThemesProvider>
	);
}
