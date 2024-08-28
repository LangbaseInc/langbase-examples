import { cn } from 'mxcn';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/header';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: '⌘ Langbase Starter for Documents QnA RAG App',
	description: 'A starter for creating a docs QnA app with Langbase.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
