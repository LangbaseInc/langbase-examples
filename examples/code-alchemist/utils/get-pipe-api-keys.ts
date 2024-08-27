import 'server-only';

/**
 * Retrieves the required API keys for the Langbase code alchemist.
 *
 * @throws {Error} If any of the required keys are not set in the environment variables.
 *
 * @returns {{
 *   COPILOT_PIPE_API_KEY: string,
 *   CODE_ALCHEMY_PIPE_API_KEY: string,
 *   EXTRACT_FRAMEWORK_PIPE_API_KEY: string,
 *   DATABASE_ARCHITECT_PIPE_API_KEY: string
 * }} The retrieved API keys.
 */
export function getPipeApiKeys() {
	const requiredKeys = [
		'LANGBASE_REACT_COPILOT_PIPE_API_KEY',
		'LANGBASE_CODE_ALCHEMY_PIPE_API_KEY',
		'LANGBASE_DATABASE_ARCHITECT_PIPE_API_KEY'
	];

	// Check if all required keys are set in the environment variables.
	for (const key of requiredKeys) {
		if (!process.env[key]) {
			throw new Error(`Please set ${key} in your environment variables.`);
		}
	}

	return {
		REACT_COPILOT_PIPE_API_KEY: process.env
			.LANGBASE_REACT_COPILOT_PIPE_API_KEY as string,
		CODE_ALCHEMY_PIPE_API_KEY: process.env
			.LANGBASE_CODE_ALCHEMY_PIPE_API_KEY as string,
		DATABASE_ARCHITECT_PIPE_API_KEY: process.env
			.LANGBASE_DATABASE_ARCHITECT_PIPE_API_KEY as string
	};
}
