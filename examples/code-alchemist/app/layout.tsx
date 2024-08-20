import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './provider';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Code Alchemist - Write code or design database with AI',
	description: 'Write code or design database with AI',
	keywords: ['AI', 'Code Assistant', 'Langbase']
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Toaster />
					<div className="flex flex-col px-3 pr-0 pt-6">
						<div className="rounded-l-[calc(var(--radius)+2px)] border border-r-0 pb-1 pl-1">
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
