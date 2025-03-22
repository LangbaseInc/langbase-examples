import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const {completion} = await langbase.pipes.run({
		name: 'agent-basic',
		messages: [
			{
				role: 'user',
				content: 'Who is an AI Engineer?',
			},
		],
		stream: false,
	});

	console.log('Summary agent completion:', completion);
}

main();
