'use client';

import { Button } from '@/components/ui/button';
import { Upload, FileAudio, X } from 'lucide-react';

interface AudioUploadInterfaceProps {
	uploadedFile: File | null;
	isProcessingAudio: boolean;
	fileInputRef: React.RefObject<HTMLInputElement>;
	onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onProcessAudio: () => void;
	onRemoveFile: () => void;
}

export const AudioUploadInterface = ({
	uploadedFile,
	isProcessingAudio,
	fileInputRef,
	onFileUpload,
	onProcessAudio,
	onRemoveFile
}: AudioUploadInterfaceProps) => {
	return (
		<>
			<div className="space-y-4">
				{!uploadedFile ? (
					<div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-gray-600 transition-colors">
						<div className="space-y-4">
							<div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto">
								<FileAudio className="w-8 h-8 text-gray-400" />
							</div>
							<div>
								<p className="text-gray-300 font-medium mb-2">
									Upload Audio File
								</p>
								<p className="text-sm text-gray-500 mb-4">
									Support for MP3, WAV, M4A, and other audio
									formats
								</p>
								<input
									ref={fileInputRef}
									type="file"
									accept="audio/*"
									onChange={onFileUpload}
									className="hidden"
								/>
								<Button
									onClick={() =>
										fileInputRef.current?.click()
									}
									variant="outline"
									className="gap-2 bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 backdrop-blur-sm rounded-xl"
								>
									<Upload className="w-4 h-4" />
									Choose File
								</Button>
							</div>
							<p className="text-xs text-gray-500">
								Maximum file size: 1MB
							</p>
						</div>
					</div>
				) : (
					<div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
									<FileAudio className="w-5 h-5 text-blue-400" />
								</div>
								<div>
									<p className="text-white font-medium">
										{uploadedFile.name}
									</p>
									<p className="text-sm text-gray-400">
										{(uploadedFile.size / 1024).toFixed(2)}{' '}
										KB
									</p>
								</div>
							</div>
							<Button
								onClick={onRemoveFile}
								variant="ghost"
								size="sm"
								className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
							>
								<X className="w-4 h-4" />
							</Button>
						</div>
					</div>
				)}
			</div>

			<Button
				onClick={onProcessAudio}
				disabled={!uploadedFile || isProcessingAudio}
				className="w-full gap-3 bg-black hover:bg-gray-800 rounded-2xl py-3 text-white font-medium"
			>
				{isProcessingAudio ? (
					<>
						<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
						Processing Audio...
					</>
				) : (
					<>
						<FileAudio className="w-5 h-5" />
						Process Audio File
					</>
				)}
			</Button>

			<div className="text-sm text-gray-400 bg-gray-800/30 rounded-xl p-3">
				<p className="font-medium mb-1">Note:</p>
				<p>
					Audio files will be processed using AI speech-to-text
					technology to generate transcripts for analysis.
				</p>
			</div>
		</>
	);
};
