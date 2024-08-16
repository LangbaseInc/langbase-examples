'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import Textarea from 'react-textarea-autosize';
import { IconChat } from './ui/iconists/icon-chat';
import { IconCommand, IconSpinner } from './ui/icons';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';

export const EmailInput = ({
	email,
	setEmail,
	isLoading,
	sendEmail
}: {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	isLoading: boolean;
	sendEmail: (email: string) => void;
}) => {
	const { formRef, onKeyDown } = useEnterSubmit();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await sendEmail(email);
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit} ref={formRef}>
				{/* <div className="mx-auto py-4 w-full max-w-3xl rounded-lg">
					<div className="rounded-lg rounded-b-none border px-2 py-2">
						<label htmlFor="prompt-input" className="sr-only">
							Enter your email
						</label>
						<textarea
							id="prompt-input"
							rows={4}
							className="w-full border-0 px-0 text-base dark:bg-transparent focus:shadow-transparent"
							placeholder="Enter your email"
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
						></textarea>
					</div>
					<div className="flex items-center justify-end px-2 py-2">
						<Button type="submit">
							Send Email
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								></path>
								<path d="M10 14l11 -11"></path>
								<path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
							</svg>
						</Button>
					</div>
				</div> */}
				<div className="max-w-3xl sm:max-w-4xl mx-auto py-4">
					<div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden px-2 pb-2 sm:rounded-2xl sm:border">
						<div className="flex w-full flex-col">
							<label
								htmlFor="playground"
								className="text-config text-foreground flex justify-between gap-y-4 rounded-xl px-3 py-4 font-medium leading-6 md:flex-row md:items-center md:gap-y-0"
							>
								<div className="flex items-center gap-x-2">
									<IconChat
										className="text-muted-foreground/50 h-5 w-5"
										aria-hidden="true"
									/>
									<h3>Email Agent</h3>
								</div>

								<div className="flex items-center justify-center gap-2 md:justify-start">
									{/* Reset chat */}
									<Button
										variant="ghost"
										className="max-w-xs"
										onClick={e => {
											e.preventDefault();
											location.reload();
										}}
									>
										Reset
									</Button>
									{/* Send button */}
									<Button
										type="submit"
										disabled={isLoading || email === ''}
									>
										{isLoading ? (
											<IconSpinner />
										) : (
											<IconCommand className="size-4" />
										)}
										Send Email
										<span className="sr-only">
											Send message
										</span>
									</Button>
								</div>
							</label>
						</div>
						<Textarea
							//   ref={inputRef}
							tabIndex={0}
							onKeyDown={onKeyDown}
							rows={1}
							maxRows={10}
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Enter your email..."
							spellCheck={false}
							className="bg-muted border-none min-h-[60px] w-full resize-none rounded-lg px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
