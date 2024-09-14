import { Button } from './ui/button';
import { IconGitHub } from './ui/iconists/icon-github';
import { IconX } from './ui/iconists/icon-x';

export default function Footer() {
	return (
		<footer className="flex justify-center items-center w-full gap-x-4">
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="cursor-pointer"
				href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/code-alchemist"
			>
				<IconGitHub />
			</a>
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="cursor-pointer"
				href="https://x.com/LangbaseInc"
			>
				<IconX />
			</a>
		</footer>
	);
}
