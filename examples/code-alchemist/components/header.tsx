'use client';

import { buttonVariants } from '@/components/ui/button';
import cn from 'mxcn';
import Link from 'next/link';
import { IconFork } from './ui/iconists/icon-fork';
import { IconGitHub } from './ui/iconists/icon-github';
import { IconLangbase } from './ui/icon-langbase';

export function Header() {
	return (
		<header className="bg-background sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between px-4">
			<div className="flex h-16 shrink-0 items-center">
				<h1 className='flex items-center gap-2'>
					<IconLangbase className="size-5 select-none" />
					<Link
						href="/"
						className="font-bold"
						onClick={() => {
							window.location.reload();
						}}
					>
						Langbase
					</Link>
				</h1>
			</div>

			<div className="flex items-center justify-end space-x-2">
				<a
					target="_blank"
					href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/code-alchemist"
					rel="noopener noreferrer"
					className={cn(buttonVariants({ variant: 'outline' }))}
				>
					<IconGitHub />
					<span className="hidden md:flex">GitHub</span>
				</a>
				<a
					target="_blank"
					href="https://langbase.com/examples?q=label%3Acode-alchemist"
					rel="noopener noreferrer"
					className={cn(buttonVariants({ variant: 'default' }))}
				>
					<IconFork className="size-4" />
					<span className="hidden md:flex gap-1">
						Fork on <span className="font-bold">Langbase</span>
					</span>
				</a>
			</div>
		</header>
	);
}
