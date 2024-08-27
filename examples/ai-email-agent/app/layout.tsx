import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './provider';
import cn from 'mxcn';
import { Header } from '@/components/header';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AI Email Agent - Langbase',
	description: 'Build an AI Email Agent with ⌘ Langbase using any LLM model.',
	keywords: ['AI', 'Email', 'Agent', 'Langbase']
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<GoogleAnalytics gaId="G-PNLDS4WV3X" />
			</head>
			<body className={cn(inter.className, 'dark bg-background')}>
				<Providers>
					<div className="flex min-h-screen flex-col px-3 pr-0 pt-6">
						<div className="rounded-l-[calc(var(--radius)+2px)] border border-r-0 pb-1 pl-1">
							<Toaster />
							<Header />
							<main className="rounded-l-[calc(var(--radius)+2px)] bg-muted">
								{children}
							</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
