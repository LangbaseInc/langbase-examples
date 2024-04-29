import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import cn from 'mxcn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AI Tech Guide Writer - Langbase',
	description: 'Craft Your Tech Guides Effortlessly with AI',
	keywords: ['AI', 'Tech', 'guide', 'Writer', 'langbase']
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
