export interface ChatMessage {
	id: string;
	type: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

export interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
	resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
	error: string;
	message: string;
}

export type TabType = 'speech' | 'text' | 'audio';
export type ViewType = 'recorder' | 'analysis';
export type SessionSource = 'speech' | 'text' | 'audio';

declare global {
	interface Window {
		SpeechRecognition: any;
		webkitSpeechRecognition: any;
	}
}

export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
export const SUPPORTED_AUDIO_TYPES = ['audio/'];
