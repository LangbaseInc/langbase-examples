// server ony.
import 'server-only';

/**
 * Fetches the YouTube captions for a given video.
 *
 * @param videoId - The ID of the YouTube video.
 * @returns A promise that resolves to the transcript of the video as a string.
 * @throws If the transcript is not available or if there is an error fetching the transcript.
 */
export async function fetchYouTubeCaptions(videoId: string): Promise<string> {
	// Construct the URL of the video
	const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

	// Fetch the video page. Added the headers to avoid 429 error
	const response = await fetch(videoUrl, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
			'Accept-Language': 'en-US,en;q=0.9',
			Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Sec-Fetch-Dest': 'document',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-Site': 'none',
			'Sec-Fetch-User': '?1',
			'Upgrade-Insecure-Requests': '1'
		}
	});

	// Check if the response is successful
	if (!response.ok) {
		throw new Error(`Failed to fetch transcript.`);
	}

	// Get the HTML content of the video page
	const html = await response.text();

	// Extract the transcript endpoint from the HTML content
	const transcriptEndpoint = extractTranscriptEndpoint(html);

	// Check if the transcript endpoint is available
	if (!transcriptEndpoint) {
		throw new Error('Transcript not available for this video');
	}

	// Fetch the transcript content from the endpoint
	const transcriptResponse = await fetch(transcriptEndpoint);

	// Check if the transcript content is successfully fetched
	if (!transcriptResponse.ok) {
		throw new Error(`Failed to fetch transcript.`);
	}

	// Get the transcript content as XML
	const transcriptXML = await transcriptResponse.text();

	// Parse the transcript XML and return the transcript
	return parseTranscriptXML(transcriptXML);
}

/**
 * Extracts the transcript endpoint from the provided HTML.
 *
 * @param html - The HTML string to extract the transcript endpoint from.
 * @returns The transcript endpoint URL if found, otherwise null.
 */
function extractTranscriptEndpoint(html: string): string | null {
	// Regular expression to match the transcript endpoint
	const match = html.match(/"captionTracks":\[{.*?"baseUrl":"(.*?)"/);
	return match ? JSON.parse(`"${match[1]}"`) : null;
}

/**
 * Parses the given XML string and extracts the text content from the <text> tags.
 *
 * @param xml - The XML string to parse.
 * @returns The extracted text content joined by a space.
 */
function parseTranscriptXML(xml: string): string {
	// Regular expression to match the text content within <text> tags
	const textRegex = /<text[^>]*>(.*?)<\/text>/g;

	// Extract the text content from each <text> tag
	const texts: string[] = [];

	// Iterate over each match and decode
	let match;
	while ((match = textRegex.exec(xml)) !== null) {
		texts.push(decodeHTMLEntities(match[1]));
	}

	// Join the extracted text content
	return texts.join(' ');
}

/**
 * Decodes HTML entities in a given text.
 *
 * @param text - The text containing HTML entities to be decoded.
 * @returns The decoded text.
 */
function decodeHTMLEntities(text: string): string {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}
