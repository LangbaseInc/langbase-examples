import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const ragAgent = await langbase.pipes.create({
		name: 'rag-memory-agent',
		description: 'An agent for storing company internal documentation.',
	});

	console.log('Agent pipe created:', ragAgent);
}

main();
