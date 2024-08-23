'use client';

import { Button } from './ui/button';
import Textarea from 'react-textarea-autosize';
import { IconChat, IconSpinner } from './ui/icons';
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
									<h3>Email</h3>
								</div>

								<div className="flex items-center justify-center gap-2 md:justify-start">
									{/* Send button */}
									<Button
										type="submit"
										disabled={isLoading || email === ''}
									>
										{isLoading && <IconSpinner />}
										Send Email
										<span className="sr-only">
											Send message
										</span>
									</Button>
								</div>
							</label>
						</div>
						<Textarea
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
