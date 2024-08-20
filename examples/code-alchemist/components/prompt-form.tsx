import cn from 'mxcn';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Textarea } from './ui/textarea';
import { IconChat } from './ui/iconists/icon-chat';
import { IconCommand } from './ui/iconists/icon-command';
import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react';

export default function PromptForm({
	prompt,
	onSubmit,
	setPrompt,
	isLoading,
	className,
	placeholder = 'Write db schema for a calendar app or build a calendar app...'
}: {
	prompt: string;
	isLoading: boolean;
	className?: string;
	setPrompt: Dispatch<SetStateAction<string>>;
	onSubmit: ({
		e,
		prompt
	}: {
		e: FormEvent<HTMLFormElement>;
		prompt: string;
	}) => Promise<void>;
	placeholder?: string;
}) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				(event.metaKey || event.ctrlKey) &&
				event.key.toLowerCase() === 'enter'
			) {
				event.preventDefault();
				onSubmit({
					prompt,
					e: event as unknown as FormEvent<HTMLFormElement>
				});
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [prompt]);

	return (
		<form
			className={cn('w-full md:w-[650px]', className)}
			onSubmit={e => onSubmit({ e, prompt })}
		>
			<div className="bg-background relative flex w-full grow flex-col overflow-hidden px-2 pb-2 rounded-2xl border">
				<div className="flex w-full flex-col">
					<label
						htmlFor="playground"
						className="text-config text-foreground flex justify-between gap-y-4 rounded-xl px-3 py-4 font-medium leading-6 md:flex-row md:items-center md:gap-y-0"
					>
						<div className="flex items-center gap-x-2">
							<IconChat
								aria-hidden="true"
								className="text-muted-foreground/50 h-5 w-5"
							/>
							<h3>Prompt</h3>
						</div>
						<div className="flex items-center justify-center gap-2 md:justify-start">
							{/* Send button */}
							<Button type="submit" disabled={isLoading}>
								{!isLoading && (
									<IconCommand className="size-4" />
								)}
								<Spinner
									className="size-4"
									loading={isLoading}
								/>
								{isLoading ? 'Generating...' : 'Generate'}
								<span className="sr-only">Generate</span>
							</Button>
						</div>
					</label>
				</div>
				<Textarea
					rows={1}
					autoFocus
					tabIndex={0}
					value={prompt}
					maxLength={500}
					spellCheck={false}
					placeholder={placeholder}
					onChange={e => setPrompt(e.target.value)}
					className={cn(
						'bg-muted h-[100px] min-h-[60px] max-h-[300px] w-full resize-none',
						'rounded-lg px-4 py-[1.3rem] focus-within:outline-none sm:text-sm',
						'text-sm sm:text-md'
					)}
				/>
			</div>
		</form>
	);
}
