'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	FileText,
	AlertCircle,
	Send,
	ArrowLeft,
	Bot,
	User,
	Mic,
	Type,
	Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { getRunner } from 'langbase';

import { Navbar } from './navbar';
import { useSpeechRecognition } from './hooks/use-speech-recognition';
import { useChat } from './hooks/use-chat';
import { useAudioUpload } from './hooks/use-audio-upload';
import { useCopyToClipboard } from './hooks/use-copy-to-clipboard';
import { RecordingInterface } from './ui/recording-interface';
import { TextInputInterface } from './ui/text-input-interface';
import { AudioUploadInterface } from './ui/audio-upload-interface';
import MarkdownRender from './markdown-render';
import { IconCopy } from './ui/iconists/icon-copy';
import { IconCheck } from './ui/iconists/icon-check';

import type { TabType, ViewType, SessionSource } from './types';

export const MeetingRecorder = () => {
	// View and navigation state
	const [currentView, setCurrentView] = useState<ViewType>('recorder');
	const [activeTab, setActiveTab] = useState<TabType>('speech');

	// Session data
	const [sessionTitle, setSessionTitle] = useState('');
	const [sessionTranscript, setSessionTranscript] = useState('');
	const [sessionNotes, setSessionNotes] = useState('');
	const [sessionSource, setSessionSource] = useState<SessionSource>('speech');
	const [sessionDuration, setSessionDuration] = useState('');

	// Recording state
	const [isRecording, setIsRecording] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [recordingTime, setRecordingTime] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// Text input state
	const [textInput, setTextInput] = useState('');
	const [meetingTitle, setMeetingTitle] = useState('');

	// Speech recognition support
	const [speechSupported, setSpeechSupported] = useState(true);

	// Custom hooks
	const speechRecognition = useSpeechRecognition();
	const chat = useChat();
	const audioUpload = useAudioUpload();
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

	// Check for speech recognition support
	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			setSpeechSupported(false);
		}
	}, []);

	// Timer effect
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRecording && !isPaused) {
			interval = setInterval(() => {
				setRecordingTime(prev => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isRecording, isPaused]);

	// Utility functions
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	const processContent = async (
		transcript: string,
		source: SessionSource,
		title?: string
	) => {
		// Set session data
		setSessionTitle(
			title || `Meeting - ${new Date().toLocaleDateString()}`
		);
		setSessionTranscript(transcript);
		setSessionSource(source);
		setSessionDuration(
			source === 'speech' ? formatTime(recordingTime) : 'N/A'
		);

		// Initialize chat and generate notes
		chat.initializeChat(source);
		setCurrentView('analysis');

		// Generate AI notes
		toast.loading('Generating meeting notes...');
		setIsLoading(true);

		try {
			const response = await fetch('/api/summary', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					notes: transcript
				})
			});

			if (!response.ok) {
				toast.error('Failed to generate summary');
				return;
			}

			if (response.body) {
				const stream = getRunner(response.body);
				for await (const chunk of stream) {
					const content = chunk?.choices[0]?.delta?.content;
					content && setSessionNotes(prev => prev + content);
				}
				toast.success('Meeting notes generated successfully!');
			}
		} catch (error) {
			toast.error('Failed to generate notes');
		} finally {
			setIsLoading(false);
			toast.dismiss();
		}
	};

	// Speech recording handlers
	const handleStartRecording = async () => {
		if (!speechSupported) {
			speechRecognition.setError(
				'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
			);
			toast.error(
				'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
			);
			return;
		}

		try {
			setIsRecording(true);
			setIsPaused(false);
			setRecordingTime(0);
			speechRecognition.resetTranscripts();
			speechRecognition.setError('');

			await speechRecognition.startRecognition(isRecording, isPaused);
		} catch (err) {
			setIsRecording(false);
		}
	};

	const handlePauseRecording = () => {
		setIsPaused(!isPaused);

		if (!isPaused) {
			speechRecognition.pauseRecognition();
		} else {
			speechRecognition.resumeRecognition();
		}
	};

	const handleStopRecording = async () => {
		setIsRecording(false);
		setIsPaused(false);
		speechRecognition.stopRecognition();

		const fullTranscript = speechRecognition.getFullTranscript();

		if (!fullTranscript.trim()) {
			speechRecognition.setError('No speech detected. Please try again.');
			toast.error('No speech detected. Please try again.');
			setRecordingTime(0);
			speechRecognition.resetTranscripts();
			return;
		}

		await processContent(fullTranscript, 'speech');

		// Reset recording state
		setRecordingTime(0);
		speechRecognition.resetTranscripts();
	};

	// Text input handlers
	const handleProcessTextInput = async () => {
		if (!textInput.trim()) {
			toast.error('Please enter some text content to process.');
			return;
		}

		await processContent(
			textInput.trim(),
			'text',
			meetingTitle.trim() || undefined
		);

		// Reset text input
		setTextInput('');
		setMeetingTitle('');
	};

	// Audio upload handlers
	const handleAudioTranscriptReceived = async (
		transcript: string,
		fileName: string
	) => {
		await processContent(transcript, 'audio', fileName);
		audioUpload.resetAudioUpload();
	};

	// Chat handlers
	const handleSendMessage = () => {
		chat.sendMessage(sessionNotes);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	// Navigation handlers
	const handleBackToRecorder = () => {
		setCurrentView('recorder');
		chat.resetChat();
		// Reset session data
		setSessionTitle('');
		setSessionTranscript('');
		setSessionNotes('');
		setSessionSource('speech');
		setSessionDuration('');
	};

	const copyNotesToClipboard = () => {
		if (isCopied) return;
		copyToClipboard(sessionNotes);
		toast.success('Notes copied to clipboard!');
	};

	// Browser not supported view
	if (!speechSupported && currentView === 'recorder') {
		return (
			<div className="min-h-screen bg-black">
				<Navbar handleBackToRecorder={handleBackToRecorder} />
				<div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
					<div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 max-w-md">
						<div className="flex items-center gap-3 text-red-400 mb-3">
							<AlertCircle className="h-5 w-5" />
							<h3 className="font-semibold">
								Browser Not Supported
							</h3>
						</div>
						<p className="text-gray-300 text-sm leading-relaxed">
							Speech recognition is not supported in this browser.
							Please use Chrome, Edge, or Safari for the best
							experience with NoteDash.
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Analysis view (Notes + Chat)
	if (currentView === 'analysis') {
		return (
			<div className="min-h-screen bg-black text-white">
				<Navbar handleBackToRecorder={handleBackToRecorder} />
				<div className="flex h-[calc(100vh-80px)]">
					{/* Notes Sidebar */}
					<div className="w-96 border-r border-gray-800 bg-gray-900/30 backdrop-blur-xl flex flex-col">
						{/* Sidebar Header */}
						<div className="p-4 border-b border-gray-800">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
									<FileText className="w-4 h-4 text-white" />
								</div>
								<div>
									<h3 className="font-semibold text-white">
										Meeting Notes
									</h3>
									<p className="text-gray-400 truncate">
										{sessionTitle}
									</p>
								</div>
							</div>
						</div>

						{/* Sidebar Content */}
						<ScrollArea className="flex-1 p-4">
							<div className="space-y-6">
								{/* Meeting Info */}
								<div className="space-y-3">
									<h4 className="font-medium text-gray-300">
										Session Information
									</h4>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-gray-400">
												Date:
											</span>
											<span className="text-gray-200">
												{
													new Date()
														.toISOString()
														.split('T')[0]
												}
											</span>
										</div>
										{sessionSource === 'speech' && (
											<div className="flex justify-between">
												<span className="text-gray-400">
													Duration:
												</span>
												<span className="text-gray-200">
													{sessionDuration}
												</span>
											</div>
										)}
										<div className="flex justify-between">
											<span className="text-gray-400">
												Source:
											</span>
											<span className="text-gray-200">
												{sessionSource === 'speech'
													? 'Recording'
													: sessionSource === 'text'
														? 'Text'
														: 'Audio'}
											</span>
										</div>
									</div>
								</div>

								<Separator className="bg-gray-700" />

								{/* AI Notes */}
								<div className="space-y-3">
									<h4 className="font-medium text-gray-300">
										AI-Generated Notes
									</h4>
									<div className="bg-gray-800/30 rounded-xl p-3">
										<div className="text-gray-200 max-w-full p-2 rounded-2xl sm:prose prose-sm prose-zinc !text-sm break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:rounded-2xl prose-pre:ring-1 prose-pre:ring-border prose-pre:overflow-hidden overflow-hidden">
											<MarkdownRender
												content={
													sessionNotes ||
													'No notes generated.'
												}
											/>
										</div>
									</div>
								</div>

								<Separator className="bg-gray-700" />

								{/* Transcript Preview */}
								<div className="space-y-3">
									<h4 className="text-sm font-medium text-gray-300">
										Transcript
									</h4>
									<div className="bg-gray-800/30 rounded-xl p-3 overflow-y-auto">
										<div className="text-gray-400">
											{sessionTranscript
												? sessionTranscript.substring(
														0,
														200
													) + '...'
												: 'No transcript available.'}
										</div>
									</div>
								</div>

								{/* Export Actions */}
								<div className="space-y-2 pt-2">
									<Button
										variant="outline"
										size="sm"
										className="w-full gap-2 bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:text-white text-xs rounded-xl"
										onClick={copyNotesToClipboard}
									>
										{isCopied ? (
											<IconCheck className="w-3 h-3" />
										) : (
											<IconCopy className="w-3 h-3" />
										)}
										Copy Notes
									</Button>
								</div>
							</div>
						</ScrollArea>
					</div>

					{/* Chat Area */}
					<div className="flex-1 flex flex-col">
						{/* Chat Header */}
						<div className="p-6 border-b border-gray-800">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Button
										variant="outline"
										onClick={handleBackToRecorder}
										className="gap-2 bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 hover:text-white backdrop-blur-sm"
									>
										<ArrowLeft className="w-4 h-4" />
										Back to Recorder
									</Button>
									<div>
										<h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
											AI Analysis & Chat
										</h1>
										<p className="text-sm text-gray-400">
											{sessionTitle}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Chat Messages */}
						<ScrollArea className="flex-1 p-6">
							<div className="space-y-6">
								{chat.chatMessages.map(message => (
									<div
										key={message.id}
										className={`flex gap-4 ${
											message.type === 'user'
												? 'justify-end'
												: 'justify-start'
										}`}
									>
										<div
											className={`flex gap-4 max-w-[80%] ${
												message.type === 'user'
													? 'flex-row-reverse'
													: 'flex-row'
											}`}
										>
											<div
												className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
													message.type === 'user'
														? 'bg-black'
														: 'bg-white'
												}`}
											>
												{message.type === 'user' ? (
													<User className="w-4 h-4 text-white" />
												) : (
													<Bot className="w-4 h-4 text-black" />
												)}
											</div>
											<div
												className={`rounded-2xl p-4 w-[450px] ${
													message.type === 'user'
														? 'bg-gradient-to-br from-gray-900 to-black text-white border border-gray-600/50 shadow-lg shadow-black/30'
														: 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-100'
												}`}
											>
												<p className="text-sm leading-relaxed whitespace-pre-line">
													{message.content}
												</p>
												<p
													className={`text-xs mt-2 ${
														message.type === 'user'
															? 'text-blue-100'
															: 'text-gray-400'
													}`}
												>
													{message.timestamp.toLocaleTimeString()}
												</p>
											</div>
										</div>
									</div>
								))}
								{chat.isTyping && (
									<div className="flex gap-4 justify-start">
										<div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
											<Bot className="w-4 h-4 text-black" />
										</div>
										<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4">
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{
														animationDelay: '0.1s'
													}}
												/>
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{
														animationDelay: '0.2s'
													}}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</ScrollArea>

						{/* Chat Input */}
						<div className="p-6 border-t border-gray-800">
							<div className="flex gap-3">
								<Input
									value={chat.chatInput}
									onChange={e =>
										chat.setChatInput(e.target.value)
									}
									onKeyPress={handleKeyPress}
									placeholder="Ask about summaries, action items, key decisions, or anything about the content..."
									className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 rounded-xl"
									disabled={chat.isTyping}
								/>
								<Button
									onClick={handleSendMessage}
									disabled={
										!chat.chatInput.trim() || chat.isTyping
									}
									className="gap-2 rounded-xl px-6"
								>
									<Send className="w-4 h-4" />
									Send
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Main Recorder View
	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar handleBackToRecorder={handleBackToRecorder} />

			<div className="max-w-4xl mx-auto p-6">
				{/* Hero Section */}
				<div className="text-center space-y-8 py-16">
					<div className="space-y-6">
						<p className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							Talk. Dash. Done.
						</p>
						<h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
							Let AI handle your notes, transcripts, and recaps so
							you can stay focused
						</h1>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
							Your AI meeting assistant that records, transcribes,
							summarizes, and lets you chat with your notes
						</p>
					</div>
				</div>

				{/* Error Alert */}
				{speechRecognition.error && (
					<div className="bg-red-900/20 backdrop-blur-sm border border-red-800 rounded-2xl p-4 mb-8">
						<div className="flex items-center gap-3 text-red-400">
							<AlertCircle className="h-5 w-5" />
							<p className="text-sm">{speechRecognition.error}</p>
						</div>
					</div>
				)}

				{/* Input Panel */}
				<div className="bg-gray-900/30 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden">
					<div className="p-6 border-b border-gray-800">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
								<FileText className="w-5 h-5 text-white" />
							</div>
							<div>
								<h3 className="font-semibold text-white">
									Content Studio
								</h3>
								<p className="text-sm text-gray-400">
									Record, type, or upload content for AI
									analysis
								</p>
							</div>
						</div>
					</div>

					<div className="p-6">
						<Tabs
							value={activeTab}
							onValueChange={value =>
								setActiveTab(value as TabType)
							}
							className="w-full"
						>
							<TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
								<TabsTrigger
									value="speech"
									className="gap-2 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
								>
									<Mic className="w-4 h-4" />
									Record
								</TabsTrigger>
								<TabsTrigger
									value="text"
									className="gap-2 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
								>
									<Type className="w-4 h-4" />
									Type
								</TabsTrigger>
								<TabsTrigger
									value="audio"
									className="gap-2 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
								>
									<Upload className="w-4 h-4" />
									Upload
								</TabsTrigger>
							</TabsList>

							{/* Speech Recording Tab */}
							<TabsContent
								value="speech"
								className="space-y-6 mt-6"
							>
								<RecordingInterface
									isRecording={isRecording}
									isPaused={isPaused}
									isListening={speechRecognition.isListening}
									recordingTime={recordingTime}
									confidence={speechRecognition.confidence}
									currentTranscript={
										speechRecognition.currentTranscript
									}
									finalTranscript={
										speechRecognition.finalTranscript
									}
									isLoading={isLoading}
									onStartRecording={handleStartRecording}
									onPauseRecording={handlePauseRecording}
									onStopRecording={handleStopRecording}
								/>
							</TabsContent>

							{/* Text Input Tab */}
							<TabsContent
								value="text"
								className="space-y-6 mt-6"
							>
								<TextInputInterface
									textInput={textInput}
									meetingTitle={meetingTitle}
									isLoading={isLoading}
									onTextInputChange={setTextInput}
									onMeetingTitleChange={setMeetingTitle}
									onProcessText={handleProcessTextInput}
								/>
							</TabsContent>

							{/* Audio Upload Tab */}
							<TabsContent
								value="audio"
								className="space-y-6 mt-6"
							>
								<AudioUploadInterface
									uploadedFile={audioUpload.uploadedFile}
									isProcessingAudio={
										audioUpload.isProcessingAudio
									}
									fileInputRef={audioUpload.fileInputRef}
									onFileUpload={audioUpload.handleFileUpload}
									onProcessAudio={() =>
										audioUpload.processAudioFile(
											handleAudioTranscriptReceived
										)
									}
									onRemoveFile={
										audioUpload.removeUploadedFile
									}
								/>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};
