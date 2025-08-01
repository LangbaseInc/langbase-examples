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
					<div className="border-2 border-dashed border-muted rounded-lg p-8 text-center transition-colors">
						<div className="space-y-4">
							<div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
								<FileAudio className="w-8 h-8 text-muted-foreground" />
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
					<div className="bg-muted/30 backdrop-blur-sm border rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
									<FileAudio className="w-5 h-5 text-muted-foreground" />
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
				className="w-full gap-3 bg-black hover:bg-gray-800 rounded-lg py-3 text-white font-medium"
			>
				{isProcessingAudio ? (
					<>
						<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-lg animate-spin" />
						Processing Audio...
					</>
				) : (
					<>
						<FileAudio className="w-5 h-5" />
						Process Audio File
					</>
				)}
			</Button>

			<div className="text-sm text-gray-400 border border-muted rounded-lg p-3">
				<span className="font-medium mb-1">Note: </span>
				<span>
					Audio files will be processed using AI speech-to-text
					technology to generate transcripts for analysis.
				</span>
			</div>
		</>
	);
};
