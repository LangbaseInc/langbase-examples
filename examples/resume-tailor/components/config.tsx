'use client';

import { IconBlog } from '@/components/ui/icons/icon-blog';
import { IconLink } from '@/components/ui/icons/icon-link';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/upload';
import { useMemo, useState } from 'react';
import { analyzeResume, getJobDescriptionFromUrl, parsePdf } from './actions';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MarkdownRender from './markdown-render';
import { getRunner } from 'langbase';
import { IconCopy } from './ui/icons/icon-copy';
import { IconDownload } from './ui/icons/icon-download';
import { IconDocument } from './ui/icons/icon-document';
import { Sparkles, ArrowRight } from 'lucide-react';

const ResumeConfig = () => {
	const [jobUrl, setJobUrl] = useState('');
	const [resumeContent, setResumeContent] = useState('');
	const [isPdfParsing, setIsPdfParsing] = useState(false);
	const [jobDescription, setJobDescription] = useState('');
	const [optimizedResume, setOptimizedResume] = useState('');
	const [resumeFile, setResumeFile] = useState<File | null>(null);
	const [isResumeOptimizing, setIsResumeOptimizing] = useState(false);
	const [currentTab, setCurrentTab] = useState<'url' | 'description'>('description');

	/**
	 * Handles the selection of a resume file.
	 *
	 * This function processes the selected PDF file, parses its content, and updates the application state accordingly.
	 * If no file is provided, it clears the current resume state.
	 *
	 * @param {File | null} file - The selected PDF file or null if selection was cleared
	 * @returns {Promise<void>}
	 *
	 * @throws Will display toast notifications for parsing errors
	 *
	 * Side effects:
	 * - Updates resumeFile state
	 * - Updates resumeContent state
	 * - Sets isPdfParsing loading state
	 * - Displays toast notifications for status updates
	 */
	async function handleFileSelect(file: File | null) {
		if (!file) {
			setResumeFile(null);
			setResumeContent('');
			toast.info('Resume file removed.');
			return;
		}

		try {
			setIsPdfParsing(true);
			setResumeFile(file);
			const formData = new FormData();
			formData.append('file', file);
			toast.loading('Parsing your resume...');

			const { content, error } = await parsePdf(formData);
			if (error) {
				console.error(error);
				setResumeContent('');
				toast.dismiss();
				toast.error(error);
			} else {
				setResumeContent(content || '');
				toast.dismiss();
				toast.success('Resume parsed successfully.');
			}
		} catch (err) {
			toast.dismiss();
			toast.error('Failed to parse the file. Please try again.');
			setResumeContent('');
		} finally {
			setIsPdfParsing(false);
		}
	}

	/**
	 * Handles the resume optimization process.
	 *
	 * This function performs the following operations:
	 * 1. If the current tab is 'url', fetches the job description from the provided URL
	 * 2. Analyzes the resume content against the job description
	 * 3. Sends the analysis, resume content, and job description to the optimization API
	 * 4. Streams the optimized resume content back to the user interface
	 *
	 * Throughout the process, toast notifications are displayed to inform the user of progress and any errors.
	 *
	 * @async
	 * @returns {Promise<void>}
	 * @throws Will display a toast error message if any step of the process fails
	 */
	async function handleOptimize() {
		setIsResumeOptimizing(true);
		try {
			let description = jobDescription.trim();

			if (currentTab === 'url') {
				toast.loading('Fetching job description from URL...');
				const { content, error } = await getJobDescriptionFromUrl(jobUrl);
				if (error || !content) {
					toast.dismiss();
					toast.error(error);
					return;
				}
				description = content;
				toast.dismiss();
				toast.success('Job description fetched successfully.');
			}

			toast.loading('Analyzing your resume...');
			const { analysis, error } = await analyzeResume(resumeContent, description);
			if (error || !analysis) {
				toast.dismiss();
				toast.error(error);
				return;
			}

			toast.dismiss();
			toast.success('Resume analysis completed successfully.');
			toast.loading('Optimizing your resume...');

			const response = await fetch('/api/optimize', {
				method: 'POST',
				body: JSON.stringify({ analysis, resumeContent, jobDescription: description }),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				const errorText = await response.text();
				toast.dismiss();
				toast.error(`Failed to optimize resume: ${errorText}`);
				return;
			}

			if (response.body) {
				const stream = getRunner(response.body);
				for await (const chunk of stream) {
					const content = chunk?.choices[0]?.delta?.content;
					content && setOptimizedResume(prev => prev + content);
				}
			}

			toast.dismiss();
			toast.success('Resume optimized successfully.');
		} catch (error) {
			toast.dismiss();
			toast.error('An error occurred while optimizing your resume. Please try again.');
		} finally {
			setIsResumeOptimizing(false);
		}
	}

	/**
	 * Copies the optimized resume to the clipboard.
	 *
	 * @async
	 * @function handleCopyResume
	 * @returns {Promise<void>} A promise that resolves when the resume is copied to clipboard.
	 * @throws {Error} If the clipboard API fails to write the text.
	 *
	 * @example
	 * // Usage within a component
	 * <button onClick={handleCopyResume}>Copy Resume</button>
	 */
	const handleCopyResume = async () => {
		try {
			await navigator.clipboard.writeText(optimizedResume);
			toast.success('Resume copied to clipboard.');
		} catch (err) {
			toast.error('Failed to copy resume to clipboard.');
		}
	};

	/**
	 * Handles the download of the optimized resume as a text file.
	 *
	 * Creates a Blob from the optimized resume content, generates a download URL,
	 * creates a temporary anchor element to trigger the download, and then cleans up
	 * the created elements and URL. Shows a success toast notification when completed.
	 *
	 * @returns {void}
	 */
	const handleDownloadResume = () => {
		const blob = new Blob([optimizedResume], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'optimized-resume.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		toast.success('Resume downloaded successfully.');
	};

	const disabledSubmit = useMemo(() => {
		// Early returns for common conditions
		if (isResumeOptimizing || isPdfParsing || !resumeFile) return true;

		// Check specific tab conditions
		return currentTab === 'url'
			? !jobUrl.trim()
			: !jobDescription.trim();
	}, [resumeFile, jobDescription, jobUrl, isResumeOptimizing, isPdfParsing, currentTab]);

	const isReadyToOptimize =
		resumeFile &&
		((currentTab === 'url' && jobUrl.trim()) ||
			(currentTab === 'description' && jobDescription.trim()));

	return (
		<div className='max-w-6xl mx-auto rounded-2xl bg-[#090909] shadow-[0_2px_3px_0_theme(colors.black/35%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/3%)] min-h-[500px] p-16 space-y-8'>
			{/* Input Steps */}
			<div className='grid grid-cols-2 gap-8'>
				<div className='space-y-4'>
					<div className='flex items-center gap-2 mb-4'>
						<span
							className={`text-lg font-bold w-8 h-8 rounded-lg inline-flex items-center justify-center border transition-colors ${
								resumeFile
									? 'bg-green-500/20 text-green-400 border-green-500/50'
									: 'text-muted-foreground border-border/80'
							}`}
						>
							1
						</span>
						<span className='text-lg'>Upload your resume</span>
						{resumeFile && <span className='text-green-400 text-sm'>✓</span>}
					</div>
					<FileUpload onFileSelect={handleFileSelect} selectedFile={resumeFile} />
				</div>

				<div className='space-y-4'>
					<div className='flex items-center gap-2 mb-4'>
						<span
							className={`text-lg font-bold w-8 h-8 rounded-lg inline-flex items-center justify-center border transition-colors ${
								isReadyToOptimize
									? 'bg-green-500/20 text-green-400 border-green-500/50'
									: 'text-muted-foreground border-border/80'
							}`}
						>
							2
						</span>
						<span className='text-lg'>Add job details</span>
						{isReadyToOptimize && <span className='text-green-400 text-sm'>✓</span>}
					</div>
					<Tabs
						defaultValue='url'
						className='w-full h-[300px]'
						value={currentTab}
						onValueChange={value => setCurrentTab(value as 'url' | 'description')}
					>
						<TabsList className='bg-[#161618]'>
							<TabsTrigger value='description' className='w-[200px] py-1'>
								<IconBlog className='mr-2 h-4 w-4' />
								Job Description
							</TabsTrigger>
							<TabsTrigger value='url' className='w-[200px] py-1'>
								<IconLink className='mr-2 h-4 w-4' />
								Job URL
							</TabsTrigger>
						</TabsList>
						<TabsContent value='description' className='mt-6'>
							<div className='space-y-3'>
								<div className='relative'>
									<Textarea
										placeholder={`Paste the job description here...

Example:
We are looking for a Senior Software Engineer with experience in React, TypeScript, and modern web development. The ideal candidate should have:
• 5+ years of experience in frontend development
• Strong knowledge of React and TypeScript
• Experience with Agile methodologies
• Leadership and mentoring skills
• Problem-solving abilities`}
										value={jobDescription}
										onChange={e => setJobDescription(e.target.value)}
										className='min-h-[200px] resize-none bg-[#161618] focus:ring-0 text-sm leading-relaxed py-2'
									/>
								</div>
								<div className='flex justify-between text-sm opacity-60'>
									<span>{jobDescription.length} characters</span>
									<span
										className={
											jobDescription.length >= 100 ? 'opacity-100' : ''
										}
									>
										{jobDescription.length >= 100 ? '✓' : ''} Minimum 100
										characters recommended
									</span>
								</div>
							</div>
						</TabsContent>
						<TabsContent value='url' className='mt-6'>
							<Input
								value={jobUrl}
								className='bg-[#161618] py-2'
								onChange={e => setJobUrl(e.target.value)}
								placeholder='https://company.com/jobs/senior-engineer'
							/>
							<span className='mt-2 inline-block text-sm text-muted-foreground'>
								Enter a job posting URL from LinkedIn, Indeed, or company career
								pages.
							</span>
						</TabsContent>
					</Tabs>
				</div>
			</div>

			{/* Action Section */}
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<div className='w-full border-t border-border/20'></div>
				</div>
				<div className='relative flex justify-center'>
					<div className='bg-[#090909] px-6'>
						<ArrowRight className='h-6 w-6 text-muted-foreground' />
					</div>
				</div>
			</div>

			<div className='flex flex-col items-center space-y-4 py-8'>
				<div className='text-center space-y-2'>
					<h3 className='text-xl font-semibold'>Ready to optimize your resume?</h3>
					<p className='text-muted-foreground text-sm max-w-md'>
						Our AI will analyze your resume against the job requirements and provide
						personalized optimization suggestions.
					</p>
				</div>

				<Button
					className='group relative overflow-hidden border-0 px-8 py-4 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
					onClick={handleOptimize}
					disabled={disabledSubmit}
					size='lg'
				>
					<div className='flex items-center gap-3'>
						<Sparkles
							className={`h-4 w-4 transition-transform duration-300 ${
								isResumeOptimizing ? 'animate-spin' : 'group-hover:rotate-12'
							}`}
						/>
						<span>{isResumeOptimizing ? 'Optimizing...' : 'Optimize Resume'}</span>
					</div>
				</Button>

				{!isReadyToOptimize && (
					<div className='text-center text-sm text-muted-foreground space-y-1'>
						<p>Complete the steps above to continue:</p>
						<div className='flex items-center justify-center gap-4 text-xs'>
							<span
								className={resumeFile ? 'text-green-400' : 'text-muted-foreground'}
							>
								{resumeFile ? '✓' : '○'} Upload resume
							</span>
							<span
								className={
									isReadyToOptimize ? 'text-green-400' : 'text-muted-foreground'
								}
							>
								{isReadyToOptimize ? '✓' : '○'} Add job details
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Results Section */}
			{optimizedResume && (
				<div className='space-y-4 border-t border-border/20 pt-8'>
					<div className='flex items-center gap-2 mb-4'>
						<span className='text-lg font-bold text-green-400 bg-green-500/20 w-8 h-8 rounded-lg inline-flex items-center justify-center border border-green-500/50'>
							3
						</span>
						<span className='text-lg'>Your optimized resume</span>
						<span className='text-green-400 text-sm'>✓</span>
					</div>
					<Card className='bg-[#161618] border-border/20'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
							<CardTitle className='text-lg font-medium flex items-center gap-2'>
								<IconDocument className='h-5 w-5' />
								Optimized Resume Content
							</CardTitle>
							<div className='flex gap-2'>
								<Button variant='outline' size='sm' onClick={handleCopyResume}>
									<IconCopy className='h-4 w-4 mr-1' />
									Copy
								</Button>
								<Button variant='outline' size='sm' onClick={handleDownloadResume}>
									<IconDownload className='h-4 w-4 mr-1' />
									Download
								</Button>
							</div>
						</CardHeader>
						<CardContent className='bg-[#0a0a0a] border border-border/10 rounded-2xl mx-6 mb-6'>
							<div className='max-w-full p-5 rounded-2xl sm:prose prose-sm prose-zinc !text-sm break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:rounded-2xl prose-pre:ring-1 prose-pre:ring-border prose-pre:overflow-hidden overflow-hidden'>
								<MarkdownRender content={optimizedResume} />
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};

export default ResumeConfig;
