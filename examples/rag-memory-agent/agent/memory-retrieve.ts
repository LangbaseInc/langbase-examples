import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const chunks = await langbase.memories.retrieve({
		query: 'What is Ahmad doing today? Date: 2025-03-20',
		memory: [
			{
				name: 'rag-knowledge-base',
			},
		],
	});

	console.log('Memory chunk:', chunks);
}

main();
