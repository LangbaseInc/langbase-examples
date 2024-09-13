import cn from 'mxcn';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AI Translator - Langbase',
	description: 'Effortless translations with AI pipes on Langbase',
	keywords: ['AI', 'Translator', 'tranlation', 'langbase']
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'dark bg-background')}>
				<div className="flex min-h-screen flex-col px-3 pr-0 pt-6">
					<div className="rounded-l-[calc(var(--radius)+2px)] border border-r-0 pb-1 pl-1">
						<Header />
						<main className="rounded-l-[calc(var(--radius)+2px)] bg-muted">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
