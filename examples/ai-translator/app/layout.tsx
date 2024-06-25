import cn from 'mxcn';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Translator AI - Langbase',
	description: 'Effortless translations with AI',
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
				{children}
			</body>
		</html>
	);
}
