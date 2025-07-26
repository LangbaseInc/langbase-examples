'use client';

import { useState, useCallback } from 'react';
import { getRunner } from 'langbase';
import { toast } from 'sonner';
import { ChatMessage } from '../types';

export const useChat = () => {
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [chatInput, setChatInput] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	const initializeChat = useCallback(
		(source: 'speech' | 'text' | 'audio') => {
			const welcomeMessage: ChatMessage = {
				id: 'welcome',
				type: 'assistant',
				content: `🎉 Great! I've processed your ${
					source === 'speech'
						? 'meeting recording'
						: source === 'text'
						? 'text content'
						: 'audio file'
				} and generated insights. You can see the notes on the left and ask me anything about the content here. What would you like to explore first?`,
				timestamp: new Date()
			};
			setChatMessages([welcomeMessage]);
		},
		[]
	);

	const sendMessage = useCallback(
		async (sessionNotes: string) => {
			if (!chatInput.trim()) return;

			const userMessage: ChatMessage = {
				id: Date.now().toString(),
				type: 'user',
				content: chatInput.trim(),
				timestamp: new Date()
			};

			setChatMessages(prev => [...prev, userMessage]);
			const currentInput = chatInput.trim();
			setChatInput('');
			setIsTyping(true);

			try {
				const response = await fetch('/api/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						notes: sessionNotes,
						message: currentInput
					})
				});

				if (!response.ok) {
					toast.error('Failed to send message');
					return;
				}

				if (response.body) {
					const stream = getRunner(response.body);

					for await (const chunk of stream) {
						const content = chunk?.choices[0]?.delta?.content;
						if (content) {
							setChatMessages(prev => {
								const lastMessage = prev[prev.length - 1];
								if (lastMessage.type === 'assistant') {
									const updatedMessage = {
										...lastMessage,
										content: lastMessage.content + content
									};
									return [
										...prev.slice(0, -1),
										updatedMessage
									];
								}
								return [
									...prev,
									{
										type: 'assistant',
										id: (Date.now() + 1).toString(),
										content,
										timestamp: new Date()
									}
								];
							});
						}
					}
				}
			} catch (error) {
				toast.error('Failed to send message');
			} finally {
				setIsTyping(false);
			}
		},
		[chatInput]
	);

	const resetChat = useCallback(() => {
		setChatMessages([]);
		setChatInput('');
		setIsTyping(false);
	}, []);

	return {
		chatMessages,
		chatInput,
		setChatInput,
		isTyping,
		initializeChat,
		sendMessage,
		resetChat
	};
};
