import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './provider';
import { Header } from '@/components/common/header';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Video Wisdom — Langbase',
	description: 'Langbase Demo App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<GoogleAnalytics gaId={process.env.GA_ID || ''} />
			</head>
			<body className={inter.className}>
				<Providers>
					<Header />
					<Toaster />
					{children}
				</Providers>
			</body>
		</html>
	);
}
