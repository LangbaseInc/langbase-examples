'use client';

import { Streamdown } from 'streamdown';
import cn from 'mxcn';

type PromptMessage = {
	id: string;
	role: string;
	content: string;
};

const Message = ({
	message,
	size
}: {
	message: PromptMessage;
	data?: any;
	size?: string;
}) => {
	return (
		<div className="mt-1 px-2 py-4 w-full">
			<Streamdown>{message.content}</Streamdown>
		</div>
	);
};

export default Message;
