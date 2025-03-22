import 'dotenv/config';
import {getRunner, Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const {stream} = await langbase.pipes.run({
		name: 'agent-basic',
		stream: true,
		messages: [{role: 'user', content: 'Who is an AI Engineer?'}],
	});

	// Convert the stream to a stream runner.
	const runner = getRunner(stream);

	runner.on('content', content => {
		process.stdout.write(content);
	});
}

main();
