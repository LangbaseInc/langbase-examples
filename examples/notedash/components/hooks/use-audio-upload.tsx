'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { MAX_FILE_SIZE } from '../types';

export const useAudioUpload = () => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [isProcessingAudio, setIsProcessingAudio] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			// Check file type
			if (!file.type.startsWith('audio/')) {
				const errorMsg =
					'Please upload an audio file (MP3, WAV, M4A, etc.)';
				toast.error(errorMsg);
				return { success: false, error: errorMsg };
			}

			// Check file size
			if (file.size > MAX_FILE_SIZE) {
				const errorMsg = 'File size must be less than 1MB';
				toast.error(errorMsg);
				return { success: false, error: errorMsg };
			}

			toast.success(`File ${file.name} uploaded successfully`);
			setUploadedFile(file);
			return { success: true };
		},
		[]
	);

	const processAudioFile = useCallback(
		async (
			onTranscriptReceived: (transcript: string, fileName: string) => void
		) => {
			if (!uploadedFile) return;

			setIsProcessingAudio(true);
			toast.loading('Processing audio file...');

			try {
				// Convert audio file to text
				const formData = new FormData();
				formData.append('audio', uploadedFile);
				console.log(
					'Processing audio file:',
					uploadedFile.name,
					'Size:',
					uploadedFile.size,
					'Type:',
					uploadedFile.type
				);

				const transcriptResponse = await fetch('/api/transcribe', {
					method: 'POST',
					body: formData
				});

				if (!transcriptResponse.ok) {
					toast.error('Failed to transcribe audio file');
					return;
				}

				const data = await transcriptResponse.json();
				toast.dismiss();
				toast.loading('Generating meeting notes...');

				// Process the transcript
				const fileName = uploadedFile.name.replace(/\.[^/.]+$/, '');
				onTranscriptReceived(data.transcript.trim(), fileName);
			} catch (err) {
				toast.error('Failed to process audio file. Please try again.');
			} finally {
				setIsProcessingAudio(false);
				toast.dismiss();
			}
		},
		[uploadedFile]
	);

	const removeUploadedFile = useCallback(() => {
		setUploadedFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, []);

	const resetAudioUpload = useCallback(() => {
		setUploadedFile(null);
		setIsProcessingAudio(false);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, []);

	return {
		uploadedFile,
		isProcessingAudio,
		fileInputRef,
		handleFileUpload,
		processAudioFile,
		removeUploadedFile,
		resetAudioUpload
	};
};
