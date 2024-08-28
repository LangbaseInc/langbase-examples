export { cn } from 'mxcn';

// Check if a key is in localStorage
export function isKeyInLocalStorage(key: string): boolean {
	return (
		localStorage.getItem(key) !== null && localStorage.getItem(key) !== ''
	);
}

// Store a key in localStorage
export function setKeyInLocalStorage(key: string, value: string) {
	localStorage.setItem(key, value);
	// Check if the value is set and not null, if null, or "" then remove the key
	if (!isKeyInLocalStorage(key)) {
		localStorage.removeItem(key);
	}
}

// Get a key from localStorage
export function getKeyFromLocalStorage(key: string): string | null {
	return localStorage.getItem(key);
}

/**
 * Extracts the video ID from a YouTube URL.
 *
 * @param url - The YouTube URL.
 * @returns The video ID if found, otherwise null.
 */
export function extractVideoId(url: string) {
	// Regular expression to match various YouTube URL formats
	const regExp =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/|user\/(?:[\w#]+\/)+)?([^#\&\?]*).*/;
	const match = url.match(regExp);

	if (match && match[1] && match[1].length === 11) {
		return match[1];
	} else {
		// If no match is found or the ID is not 11 characters, return null
		return null;
	}
}
