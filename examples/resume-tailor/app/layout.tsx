import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './provider';
import Scripts from '@/components/scripts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AI resume tailor ',
	description: 'Optimize your resume with AI',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<Toaster />
					<Scripts />
					{children}
				</Providers>
			</body>
		</html>
	);
}
