'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { IconDocUpload } from './ui/icons/icon-doc-upload';
import { IconDocument } from './ui/icons/icon-document';
import { IconInfoCircle } from './ui/icons/icon-info';
import { IconCross } from './ui/icons/icon-cross';

interface FileUploadProps {
	onFileSelect: (file: File | null) => void;
	selectedFile: File | null;
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
	const [dragActive, setDragActive] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				onFileSelect(acceptedFiles[0]);
			}
			setDragActive(false);
		},
		[onFileSelect]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
		},
		maxFiles: 1,
		onDragEnter: () => setDragActive(true),
		onDragLeave: () => setDragActive(false),
	});

	const removeFile = () => {
		onFileSelect(null);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	if (selectedFile) {
		return (
			<div className='rounded-xl p-6 border border-border'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<div className='w-12 h-12 rounded-xl flex items-center justify-center'>
							<IconDocument className='h-6 w-6 text-muted-foreground' />
						</div>
						<div>
							<p className='font-semibold text-muted-foreground'>
								{selectedFile.name}
							</p>
							<p className='text-sm opacity-60'>
								{formatFileSize(selectedFile.size)}
							</p>
						</div>
					</div>
					<div className='flex items-center space-x-3'>
						<Button
							variant='ghost'
							size='sm'
							onClick={removeFile}
							className='opacity-60 hover:opacity-100'
						>
							<IconCross className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			{...getRootProps()}
			className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
				isDragActive || dragActive ? 'scale-105' : 'hover:bg-opacity-5'
			}`}
			style={{
				borderColor: isDragActive ? '#000000' : 'rgb(34, 34, 37)',
				backgroundColor: isDragActive ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
			}}
		>
			<input {...getInputProps()} />
			<div className='flex flex-col items-center space-y-4'>
				<div
					className='w-16 h-16 rounded-2xl flex items-center justify-center transition-colors'
					style={{ backgroundColor: isDragActive ? '#000000' : '#090909' }}
				>
					<IconDocUpload
						className={`h-8 w-8 ${
							isDragActive ? 'text-white' : 'text-white opacity-60'
						}`}
					/>
				</div>
				<div>
					<p className='text-lg font-semibold mb-1'>
						{isDragActive ? 'Drop your resume here' : 'Upload your resume'}
					</p>
					<p className='opacity-60 mb-2'>Drag & drop or click to browse</p>
					<p className='text-sm opacity-40'>Supports PDF • Max 10MB</p>
				</div>
			</div>

			{/* Decorative elements */}
			<div className='absolute top-4 right-4 w-2 h-2 opacity-30 rounded-full'></div>
			<div className='absolute bottom-4 left-4 w-1 h-1 opacity-20 rounded-full'></div>
		</div>
	);
}
