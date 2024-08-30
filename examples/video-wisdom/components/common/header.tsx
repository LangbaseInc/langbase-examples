import { buttonVariants } from '@/components/ui/button'
import cn from 'mxcn'
import Link from 'next/link'
import { IconFork } from './../ui/iconists/icon-fork'
import { IconGitHub } from './../ui/iconists/icon-github'
import { Anchor } from '../ui/anchor'
import { IconDocs } from '../ui/iconists/icon-docs'

export async function Header() {
    return (
        <header className="bg-background flex h-16 w-full items-center justify-between px-10 placeholder:backdrop:before:sm:px-80 py-10">
            <div className="flex h-16 shrink-0 items-center">
                <h1>
                    <Link href="/" className="font-bold">
                        <span
                            aria-hidden="true"
                            className="border-muted-foreground/10 bg-muted mr-1 select-none rounded-lg border px-[0.2rem] py-[0.1rem] text-sm font-bold shadow-2xl"
                        >
                            ⌘
                        </span>
                        Langbase
                    </Link>
                </h1>
            </div>

            <div className="flex items-center justify-end space-x-2">

                <Anchor
                    variant="ghost"
                    className="font-normal text-sm text-muted-foreground flex items-center"
                    href="https://langbase.com/docs/guides/video-wisdom-extractor"
                    target="_blank"
                >
                    <IconDocs className="size-4 text-muted-foreground/40" />
                    <span className='hidden sm:flex'>Guide: Build yourself</span>
                </Anchor>


                <a
                    target="_blank"
                    href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/video-wisdom"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    <IconGitHub />
                    <span className="hidden md:flex">GitHub</span>
                </a>

                <a
                    target="_blank"
                    href="https://langbase.com/examples?q=label:video-wisdom"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'default' }))}
                >
                    <IconFork />
                    <span className="hidden md:flex gap-1">
                        Fork on <span className="font-bold">Langbase</span>
                    </span>
                </a>


            </div>
        </header>
    )
}