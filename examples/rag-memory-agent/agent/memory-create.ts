import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	/**
	 * Creates a memory instance in langbase for storing company internal documentation.
	 *
	 * @param {Object} params - The memory creation parameters
	 * @param {string} params.name - The name identifier for the memory ('rag-knowledge-base')
	 * @param {string} params.description - A description of the memory's purpose
	 * @returns {Promise<Memory>} A promise that resolves to the created memory instance
	 */
	const memory = await langbase.memories.create({
		name: 'rag-knowledge-base',
		description: 'An AI memory for storing company internal docs.',
	});

	console.log('Memory created:', memory);
}

main();
