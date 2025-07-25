'use server';

import { Langbase } from 'langbase';

/**
 * Parses a PDF file from FormData and extracts its content using Langbase parser
 *
 * @param formData - The FormData object containing the file to parse
 * @returns An object containing either the extracted content or an error message
 * @returns {Object} result
 * @returns {string|null} result.content - The extracted text content from the PDF
 * @returns {string|null} result.error - Error message if parsing fails, null otherwise
 * @throws Will catch and handle any errors that occur during parsing
 */
export async function parsePdf(formData: FormData) {
	try {
		const file = formData.get('file') as File;

		if (!file || file.type !== 'application/pdf') {
			return {
				content: null,
				error: 'Invalid file type. Please upload a PDF.',
			};
		}

		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		const { content } = await langbase.parser({
			document: file,
			documentName: file.name,
			contentType: 'application/pdf',
		});

		return {
			content,
			error: null,
		};
	} catch (error) {
		console.error('Error parsing PDF:', error);
		return {
			content: null,
			error: 'Failed to parse the PDF file. Please try again.',
		};
	}
}

/**
 * Fetches and extracts job description content from a given URL.
 * Uses Langbase with Firecrawl service to crawl the URL and extract relevant content.
 *
 * @param url - The URL of the job posting to extract content from
 * @returns An object containing either the extracted content or an error message
 * @returns {Object} result
 * @returns {string|null} result.content - The extracted job description text if successful, null otherwise
 * @returns {string|null} result.error - Error message if the operation fails, null otherwise
 * @throws Will catch and handle any errors during the crawling process
 */
export async function getJobDescriptionFromUrl(url: string) {
	try {
		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		const response = await langbase.tools.crawl({
			url: [url],
			service: 'firecrawl',
			apiKey: process.env.FIRECRAWL_API_KEY!,
		});

		const content = response.map(item => item.content).join('\n');
		return {
			content,
			error: null,
		};
	} catch (error) {
		console.error('Error fetching job description:', error);
		return {
			content: null,
			error: 'Failed to fetch job description from the URL. Please check the URL and try again.',
		};
	}
}

/**
 * Analyzes a resume against a job description to identify alignment and improvement areas.
 *
 * This function uses the Langbase API with GPT-4 to perform an expert ATS analysis
 * comparing the provided resume content to a job description. The analysis identifies
 * key requirements, missing keywords, matching elements, areas for improvement,
 * and critical ATS optimization keywords.
 *
 * @param resumeContent - The full text content of the user's resume
 * @param jobDescription - The full text content of the job description to analyze against
 * @returns An object containing either the analysis results or an error message
 * @returns {Object} result - The analysis result object
 * @returns {string|null} result.analysis - The detailed ATS analysis if successful, null if failed
 * @returns {string|null} result.error - Error message if analysis failed, null if successful
 *
 * @throws Will catch and handle any errors during the API call or processing
 */
export async function analyzeResume(resumeContent: string, jobDescription: string) {
	try {
		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		const input = `Resume Content:
${resumeContent}
Job Description:
${jobDescription}`;

		const { output } = await langbase.agent.run({
			model: 'openai:gpt-4.1-mini',
			apiKey: process.env.OPENAI_API_KEY!,
			instructions: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the provided resume content and job description to identify:

1. Key skills and qualifications mentioned in the job description
2. Important keywords and phrases that should be included
3. Experience requirements and preferred qualifications
4. Technical skills, soft skills, and industry-specific terms
5. Current gaps between the resume and job requirements

Provide a detailed analysis in the following format:
- **Job Requirements**: List key requirements from job description
- **Missing Keywords**: Keywords from job description not in resume
- **Matching Elements**: What already aligns well
- **Improvement Areas**: Specific areas that need enhancement
- **ATS Keywords**: Critical keywords for ATS optimization`,
			input: [{ role: 'user', content: input }],
			stream: false,
		});

		return {
			analysis: output,
			error: null,
		};
	} catch (error) {
		console.error('Error optimizing resume:', error);
		return {
			analysis: null,
			error: 'Failed to optimize the resume. Please try again.',
		};
	}
}
