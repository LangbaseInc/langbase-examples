import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import cn from 'mxcn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Onboarding Email Generator - Langbase',
	description: 'Langbase Example: Onboarding Email Generator',
	keywords: ['AI', 'Marketing', 'Onboarding', 'Email', 'Writer', 'langbase']
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
