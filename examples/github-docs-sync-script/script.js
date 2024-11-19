import https from 'https';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const accessToken = process.env.GITHUB_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const baseCommitSha = process.env.BASE_COMMIT_SHA;
const headCommitSha = process.env.HEAD_COMMIT_SHA;
const langbaseApiKey = process.env.LANGBASE_API_KEY;
const langbaseMemoryName = process.env.LANGBASE_MEMORY_NAME;
const orgUserName = process.env.LANGBASE_ORG_USER_NAME;

// Flag to process all files or only changed files b/w two commits
const processAllFiles = false;

/**
 * Makes an API request to the GitHub API and fetch data.
 *
 * @param {string} path - The API endpoint path.
 * @param {string} [method='GET'] - The HTTP method for the request.
 * @param {Object} [data] - The data to send with the request (optional).
 * @returns {Promise<Object>} - A promise that resolves with the response data from the API.
 * @throws {Error} - If the request fails or returns a non-successful status code.
 */
function makeGitHubApiRequest(path, method = 'GET', data) {
	const options = {
		hostname: 'api.github.com',
		port: 443,
		path: `/repos/${owner}/${repo}${path}`,
		method: method,
		headers: {
			'User-Agent': 'Node.js Script',
			Authorization: `token ${accessToken}`,
			Accept: 'application/vnd.github.v3+json'
		}
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, res => {
			let responseBody = '';

			res.on('data', chunk => {
				responseBody += chunk;
			});

			res.on('end', () => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(JSON.parse(responseBody));
				} else {
					reject(
						new Error(
							`Request failed with status code ${res.statusCode}: ${responseBody}`
						)
					);
				}
			});
		});

		req.on('error', error => {
			reject(error);
		});

		if (data) {
			req.write(JSON.stringify(data));
		}

		req.end();
	});
}

/**
 * Retrieves the array of changed documentation files between two Git commits.
 *
 * @param {string} baseSha - The base commit SHA.
 * @param {string} headSha - The head commit SHA.
 * @returns {Promise<string[]>} - A promise that resolves to an array of changed documentation file names.
 */
async function getChangedDocsFiles(baseSha, headSha) {
	const compareResult = await makeGitHubApiRequest(
		`/compare/${baseSha}...${headSha}`
	);
	return compareResult.files
		.map(file => file.filename)
		.filter(
			filename => filename.endsWith('.md') || filename.endsWith('.mdx')
		);
}

/**
 * Retrieves all the documentation files from the specified GitHub path recursively.
 *
 * @param {string} [path=''] - The path to start searching for documentation files.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths for the documentation files found. Only markdown files (.MD and .MDX) are included.
 */
async function getAllDocsFiles(path = '') {
	const result = await makeGitHubApiRequest(`/contents/${path}`);
	let files = [];

	for (const item of result) {
		if (
			item.type === 'file' &&
			(item.name.endsWith('.md') || item.name.endsWith('.mdx'))
		) {
			files.push(item.path);
		} else if (item.type === 'dir') {
			files = files.concat(await getAllDocsFiles(item.path));
		}
	}
	return files;
}

/**
 * Downloads a file from GitHub and saves it locally in temp folder.
 * @param {string} filePath - The path of the file to download.
 * @returns {Promise<string>} - The local path where the file is saved.
 */
async function downloadFile(filePath) {
	const content = await makeGitHubApiRequest(`/contents/${filePath}`);
	const decodedContent = Buffer.from(content.content, 'base64').toString(
		'utf-8'
	);
	const localPath = path.join('temp', filePath);
	fs.mkdirSync(path.dirname(localPath), { recursive: true });
	fs.writeFileSync(localPath, decodedContent);
	return localPath;
}

/**
 * Modifies the file name by inlcuding full path.
 * Also replaces slashes with hyphens.
 *
 * We need full path as file name to:
 * Avoid duplicate file names by including full path.
 * If we have files with same name in different directories, this makes it unique.
 * Allow upserting a changed file later on.
 *
 * @param {string} originalPath - The original file path.
 * @returns {string} The modified file path.
 */
function modifyFileName(originalPath) {
	const dir = path.dirname(originalPath);
	const baseName = path.basename(originalPath);

	// Join the directory and base name, then replace slashes with hyphens
	return path.join(dir, baseName).replace(/\//g, '-');
}

/**
 * Retrieves a signed upload URL for a given file name from the Langbase API.
 * @param {string} fileName - The name of the file to be uploaded.
 * @returns {Promise<string>} A promise that resolves to the signed upload URL.
 * @throws {Error} If an error occurs while retrieving the signed upload URL.
 */
async function getSignedUploadUrl(fileName) {
	const url = `https://api.langbase.com/v1/memory/documents`;
	const newDoc = {
		memoryName: langbaseMemoryName,
		ownerLogin: orgUserName,
		fileName
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${langbaseApiKey}`
			},
			body: JSON.stringify(newDoc)
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({}));
			throw {
				message: `HTTP error! status: ${response.status}`,
				status: response.status,
				error: errorBody
			};
		}

		// Extract signed URL from the response and validate it
		const { signedUrl } = await response.json();
		console.log('Signed URL:', signedUrl);

		if (!signedUrl || typeof signedUrl !== 'string')
			throw new Error(
				`Invalid signed URL received from Langbase API: ${signedUrl}`
			);

		return signedUrl;
	} catch (error) {
		console.error(
			`Failed to get signed upload URL for ${fileName}:`,
			error
		);
		throw error;
	}
}

/**
 * Uploads a document to given Langbase memory using a signed URL.
 *
 * @param {string} signedUrl - The signed URL where the document will be uploaded.
 * @param {string} filePath - The path to the document file.
 * @returns {Promise<Response>} - A Promise that resolves to the response from the server.
 * @throws {Error} - If the file is not found or if the file type is unsupported.
 */
async function uploadDocument(signedUrl, filePath) {
	try {
		if (!fs.existsSync(filePath)) {
			throw new Error(`File not found: ${filePath}`);
		}

		const file = fs.readFileSync(filePath);
		const fileExtension = path.extname(filePath).toLowerCase();

		// Set content type based on file extension
		let contentType;
		if (fileExtension === '.md') {
			contentType = 'text/markdown';
		} else if (fileExtension === '.mdx') {
			contentType = 'text/plain';
		} else {
			throw new Error(`Unsupported file type: ${fileExtension}`);
		}

		const response = await fetch(signedUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': contentType
			},
			body: file
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({}));
			throw {
				message: `HTTP error! status: ${response.status}`,
				status: response.status,
				error: errorBody
			};
		}

		return response;
	} catch (error) {
		console.error(`Failed to upload document ${filePath}:`, error);
		throw error;
	}
}

// Function to wait for a given time
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main runner function.
 * Processes and uploads docs files to Langbase Memory from a given GitHub repository.
 *
 * Two modes:
 * 1. processAllFiles = true: Download, process and upload all files in the repository to Langbase.
 * 2. processAllFiles = false: Only download, process and upload the changed files between two given commits
 * to Langbase.
 *
 * @param {Object} options - The options for processing files.
 * @param {boolean} options.processAllFiles - Flag indicating whether to process all files or only changed files.
 * @returns {Promise<void>} - A promise that resolves when all files have been processed.
 */
async function main({ processAllFiles }) {
	// Check if all required environment variables are set
	if (
		!accessToken ||
		!owner ||
		!repo ||
		!langbaseApiKey ||
		!langbaseMemoryName ||
		!orgUserName
	) {
		console.error(
			'Missing required environment variables. Please check your .env file.'
		);
		return;
	}

	if (!processAllFiles && (!baseCommitSha || !headCommitSha)) {
		console.error(
			'Missing required environment variables for base and head commits. Please check your .env file.'
		);
		return;
	}

	try {
		let filesToProcess;
		if (processAllFiles) {
			filesToProcess = await getAllDocsFiles();
			console.log(
				'All Markdown files in the repository:',
				filesToProcess
			);
		} else {
			filesToProcess = await getChangedDocsFiles(
				baseCommitSha,
				headCommitSha
			);
			console.log('Changed Markdown files:', filesToProcess);
		}

		console.log('Total Docs files found: ', filesToProcess.length);

		for (const file of filesToProcess) {
			try {
				console.log(`\n\nProcessing file: ${file}`);
				const localPath = await downloadFile(file);
				console.log(`Downloaded to: ${localPath}`);

				const modifiedFileName = modifyFileName(file);
				console.log(`Modified filename: ${modifiedFileName}`);

				const signedUrl = await getSignedUploadUrl(modifiedFileName);
				console.log(`Got signed URL for upload`);

				const uploadResponse = await uploadDocument(
					signedUrl,
					localPath
				);
				console.log(`Upload response: ${uploadResponse.statusText}`);
				console.log(`Upload response status: ${uploadResponse.status}`);

				// Clean up temporary file
				fs.unlinkSync(localPath);

				// Wait before processing the next file to avoid rate limits
				console.log('Waiting for 0.5 seconds before next file...');
				await sleep(500);
			} catch (error) {
				console.error(`Error processing file ${file}:`, error);
				// Continue with the next file
			}
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

main({ processAllFiles });
