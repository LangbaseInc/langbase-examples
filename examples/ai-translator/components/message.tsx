'use client';

const Message = ({
	id,
	message,
	setMessage,
	tabIndex,
	autoFocus,
	disabled
}: {
	id: string;
	message: string;
	setMessage?: (message: string) => void;
	tabIndex: number;
	autoFocus?: boolean;
	disabled?: boolean;
}) => {
	if (setMessage) {
		return (
			<textarea
				tabIndex={tabIndex}
				value={message}
				onChange={e => setMessage(e.target.value)}
				rows={6}
				name={id}
				id={id}
				className="block bg-muted w-full min-h-60 rounded-lg border-0 py-3 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 pl-4 pr-12 mt-4"
				disabled={disabled}
				autoFocus={autoFocus}
			/>
		);
	}

	return (
		<textarea
			tabIndex={tabIndex}
			value={message}
			rows={6}
			name={id}
			id={id}
			className="block bg-muted w-full min-h-60 rounded-lg border-0 py-3 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer shadow-sm ring-1 ring-inset ring-ring/5 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus:ring-ring/50 sm:text-sm sm:leading-6 pl-4 pr-12 mt-4"
			disabled={disabled}
			autoFocus={autoFocus}
		/>
	);
};

export default Message;
