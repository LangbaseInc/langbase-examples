import { Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

interface NavBarProps {
	handleBackToRecorder: () => void;
}

// Navbar Component
export const Navbar = ({ handleBackToRecorder }: NavBarProps) => (
	<nav className="bg-background backdrop-blur-xl sticky top-0 z-50">
		<div className="max-w-6xl mx-auto px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Link
						href="/"
						onClick={handleBackToRecorder}
						className="flex items-center gap-2"
					>
						<div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
							<Zap className="w-5 h-5 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
							OpenGranola
						</h1>
					</Link>
				</div>
				<div className="flex items-center gap-1 text-sm text-gray-400">
					<Sparkles className="w-4 h-4" />
					<span>Powered by</span>
					<span className="text-[#9785ff]">
						<Link href="https://langbase.com" target="_blank">
							Langbase
						</Link>
					</span>
				</div>
			</div>
		</div>
	</nav>
);
