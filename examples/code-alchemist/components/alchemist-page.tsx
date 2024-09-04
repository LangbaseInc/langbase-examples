'use client';

import cn from 'mxcn';
import Sandbox from './sandbox';
import Welcome from './welcome';
import useLangbase from '@/hooks/use-langbase';
import { ChatMessage } from './chat-message';
import Footer from './footer';

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
		showSwitch,
		showWelcome,
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
				'flex min-h-screen flex-col items-center justify-between gap-y-8 sm:gap-y-4 p-4 sm:p-8 sm:pb-5',
				'min-h-[calc(100vh-100px)]'
			)}
		>
			<div className='flex flex-col gap-y-8 w-full'>
				<Welcome
					prompt={prompt}
					isLoading={loading}
					onSubmit={callLLMs}
					setPrompt={setPrompt}
					showSwitch={showSwitch}
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
			</div>
			<Footer />
		</main>
	);
};

export default AlchemistPage;
