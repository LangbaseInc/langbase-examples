'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Mic,
	MicOff,
	Square,
	Play,
	Pause,
	FileText,
	Volume2
} from 'lucide-react';

interface RecordingInterfaceProps {
	isRecording: boolean;
	isPaused: boolean;
	isListening: boolean;
	recordingTime: number;
	confidence: number;
	currentTranscript: string;
	finalTranscript: string;
	isLoading: boolean;
	onStartRecording: () => void;
	onPauseRecording: () => void;
	onStopRecording: () => void;
}

const formatTime = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins.toString().padStart(2, '0')}:${secs
		.toString()
		.padStart(2, '0')}`;
};

export const RecordingInterface = ({
	isRecording,
	isPaused,
	isListening,
	recordingTime,
	confidence,
	currentTranscript,
	finalTranscript,
	isLoading,
	onStartRecording,
	onPauseRecording,
	onStopRecording
}: RecordingInterfaceProps) => {
	return (
		<>
			<div className="text-center space-y-6">
				<div className="relative">
					<div
						className={`w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto transition-all duration-1500 ${
							isRecording
								? isPaused
									? 'border-yellow-500 bg-yellow-500/10 backdrop-blur-sm'
									: 'border-red-500 bg-red-500/10 backdrop-blur-sm animate-pulse'
								: 'border-gray-700 bg-gray-800/30 backdrop-blur-sm'
						}`}
					>
						{isRecording ? (
							isPaused ? (
								<Pause className="w-10 h-10 text-yellow-400" />
							) : (
								<Mic className="w-10 h-10 text-red-400" />
							)
						) : (
							<MicOff className="w-10 h-10 text-gray-500" />
						)}
					</div>
					{isListening && (
						<div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-ping" />
					)}
				</div>

				<div className="space-y-3">
					<div className="text-3xl font-mono font-bold text-white">
						{formatTime(recordingTime)}
					</div>
					<div className="flex items-center justify-center gap-3">
						<Badge
							variant={'outline'}
							className={`${
								isRecording
									? isPaused
										? 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
										: 'border-red-500 text-red-400 bg-red-500/10'
									: 'border-gray-600 text-gray-400 bg-gray-800/30'
							} backdrop-blur-sm`}
						>
							{isRecording
								? isPaused
									? 'Paused'
									: 'Recording'
								: 'Ready'}
						</Badge>
						{isListening && (
							<Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
								<Volume2 className="w-3 h-3 mr-1" />
								Listening
							</Badge>
						)}
					</div>
					{confidence > 0 && (
						<div className="text-xs text-gray-500">
							Confidence: {Math.round(confidence * 100)}%
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-center gap-4">
				{!isRecording ? (
					<Button
						onClick={onStartRecording}
						size="lg"
						variant={'outline'}
						className="gap-3 rounded-2xl px-8 py-3 text-white font-medium"
					>
						<Play className="w-5 h-5" />
						Start Recording
					</Button>
				) : (
					<>
						<Button
							onClick={onPauseRecording}
							variant="outline"
							size="lg"
							disabled={isLoading}
							className="gap-3 backdrop-blur-sm rounded-2xl px-6"
						>
							{isPaused ? (
								<Play className="w-4 h-4" />
							) : (
								<Pause className="w-4 h-4" />
							)}
							{isPaused ? 'Resume' : 'Pause'}
						</Button>
						<Button
							variant={'ghost'}
							onClick={onStopRecording}
							size="lg"
							disabled={isLoading}
							className="gap-3 rounded-2xl px-6"
						>
							<Square className="w-4 h-4" />
							Stop & Process
						</Button>
					</>
				)}
			</div>

			{isRecording && (
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<FileText className="w-5 h-5 text-blue-400" />
						<h4 className="font-medium text-white">
							Live Transcription
						</h4>
					</div>
					<div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 min-h-[150px] max-h-[300px] overflow-y-auto">
						<div className="space-y-3">
							{finalTranscript && (
								<p className="text-sm text-gray-200 leading-relaxed">
									{finalTranscript}
								</p>
							)}
							{currentTranscript && (
								<p className="text-sm text-gray-400 italic leading-relaxed">
									{currentTranscript}
								</p>
							)}
							{!finalTranscript && !currentTranscript && (
								<p className="text-sm text-gray-500 italic">
									{isListening
										? 'Listening for speech...'
										: 'Start speaking to see live transcription'}
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
