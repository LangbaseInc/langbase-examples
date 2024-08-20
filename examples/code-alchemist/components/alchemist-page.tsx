'use client';

import cn from 'mxcn';
import Sandbox from './sandbox';
import Welcome from './welcome';
import useLangbase from '@/hooks/use-langbase';
import { ChatMessage } from './chat-message';

export type RecentChat = {
	pipe: string;
	time: string;
	prompt: string;
	completion: string;
};

const AlchemistPage = () => {
	const {
		prompt,
		callLLMs,
		loading,
		setPrompt,
		completion,
		showWelcome,
		showOpening,
		recentChats,
		showSandbox,
		showPreview,
		improveCode,
		showRecentChats,
		handleRecentChatClick
	} = useLangbase();

	return (
		<main
			className={cn(
				'flex min-h-screen flex-col items-center gap-y-8 p-4 sm:p-8',
				'min-h-[calc(100vh-100px)]'
			)}
		>
			<Welcome
				prompt={prompt}
				isLoading={loading}
				onSubmit={callLLMs}
				setPrompt={setPrompt}
				showOpening={showOpening}
				recentChats={recentChats}
				showWelcome={showWelcome}
				showRecentChats={showRecentChats}
				handleOnClick={handleRecentChatClick}
			/>
			<Sandbox
				prompt={prompt}
				loading={loading}
				setPrompt={setPrompt}
				completion={completion}
				showPreview={showPreview}
				showSandbox={showSandbox}
				improveCode={improveCode}
			/>
			<ChatMessage message={completion} showSandbox={showSandbox} />
		</main>
	);
};

export default AlchemistPage;
