'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../types';

export const useSpeechRecognition = () => {
	const [isListening, setIsListening] = useState(false);
	const [currentTranscript, setCurrentTranscript] = useState('');
	const [finalTranscript, setFinalTranscript] = useState('');
	const [confidence, setConfidence] = useState(0);
	const [error, setError] = useState('');

	const recognitionRef = useRef<any>(null);
	const interimTranscriptRef = useRef('');

	const initializeSpeechRecognition = useCallback(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			throw new Error('Speech recognition not supported');
		}

		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = 'en-US';
		recognition.maxAlternatives = 1;

		recognition.onstart = () => {
			setIsListening(true);
			setError('');
		};

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			let interimTranscript = '';
			let finalTranscriptPart = '';

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				const confidence = event.results[i][0].confidence;

				if (event.results[i].isFinal) {
					finalTranscriptPart += transcript + ' ';
					setConfidence(confidence);
				} else {
					interimTranscript += transcript;
				}
			}

			if (finalTranscriptPart) {
				setFinalTranscript(prev => prev + finalTranscriptPart);
			}

			interimTranscriptRef.current = interimTranscript;
			setCurrentTranscript(interimTranscript);
		};

		recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
			setError(`Speech recognition error: ${event.error}`);
			setIsListening(false);
			toast.error(`Speech recognition error: ${event.error}`);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		return recognition;
	}, []);

	const startRecognition = useCallback(
		async (isRecording: boolean, isPaused: boolean) => {
			try {
				await navigator.mediaDevices.getUserMedia({ audio: true });
				recognitionRef.current = initializeSpeechRecognition();
				recognitionRef.current.start();
			} catch (err) {
				const errorMsg =
					'Microphone access denied. Please allow microphone access to record.';
				setError(errorMsg);
				toast.error(errorMsg);
				throw err;
			}
		},
		[initializeSpeechRecognition]
	);

	const stopRecognition = useCallback(() => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
		setIsListening(false);
	}, []);

	const pauseRecognition = useCallback(() => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
	}, []);

	const resumeRecognition = useCallback(() => {
		if (recognitionRef.current) {
			recognitionRef.current.start();
		}
	}, []);

	const resetTranscripts = useCallback(() => {
		setCurrentTranscript('');
		setFinalTranscript('');
		setConfidence(0);
		interimTranscriptRef.current = '';
	}, []);

	const getFullTranscript = useCallback(() => {
		return finalTranscript + (interimTranscriptRef.current || '');
	}, [finalTranscript]);

	return {
		isListening,
		currentTranscript,
		finalTranscript,
		confidence,
		error,
		setError,
		startRecognition,
		stopRecognition,
		pauseRecognition,
		resumeRecognition,
		resetTranscripts,
		getFullTranscript
	};
};
