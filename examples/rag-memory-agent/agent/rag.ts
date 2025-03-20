import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const query = 'What is Ahmad doing today? Date: 2025-03-20';
	const chunks = await langbase.memories.retrieve({
		query,
		memory: [{name: 'rag-knowledge-base'}],
	});
	// console.log('✨ Memory chunk:', chunks);

	const contextContent = chunks.map(chunk => chunk.text).join('\n\n');

	const {completion} = await langbase.pipes.run({
		stream: false,
		name: 'rag-memory-agent',
		messages: [
			{
				role: 'user',
				content:
					`Context: Use the following context to answer the question:\n\n${contextContent}\n\n` +
					`Question: ${query}`,
			},
		],
	});

	console.log('✨ AGENT:', completion);
}

main();
