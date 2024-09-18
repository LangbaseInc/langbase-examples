import 'server-only';

import { Pipe } from 'langbase';

type Params = {
	prompt: string;
	keys: {
		REACT_COPILOT_PIPE_API_KEY: string;
		CODE_ALCHEMY_PIPE_API_KEY: string;
		DATABASE_ARCHITECT_PIPE_API_KEY: string;
	};
};

type ToolCall = {
	index: number;
	id: string;
	type: string;
	function: {
		name: string;
		arguments: string;
	};
};

/**
 * Asynchronously processes the given prompt using Langbase.
 *
 * @param {Params} params - The parameters for the Langbase function.
 * @param {string[]} params.keys - The API keys required for Langbase.
 * @param {string} params.prompt - The prompt to be processed.
 * @returns {Promise<{ stream: Stream, pipe: string } | unknown>} - A promise that resolves to an object containing the processed stream and the pipe used, or an unknown value if the tool is called.
 */
export async function callPipes({ keys, prompt }: Params) {
	const codeAlchemistPipe = new Pipe({
		apiKey: keys.CODE_ALCHEMY_PIPE_API_KEY
	});

	const { stream } = await codeAlchemistPipe.streamText({
		messages: [{ role: 'user', content: prompt }]
	});

	const [streamForCompletion, streamForReturn] = stream.tee();

	let completion = '';
	let toolCalls = '';

	for await (const chunk of streamForCompletion) {
		completion += chunk.choices[0]?.delta?.content || '';
		toolCalls += JSON.stringify(chunk.choices[0].delta?.tool_calls) || '';

		// if the toolCalls is not empty, break the loop
		if (toolCalls.length) {
			break;
		}
	}

	// if the completion is not empty, return the stream
	if (completion) {
		return {
			pipe: 'code-alchemist',
			stream: streamForReturn
		};
	}

	// if the toolCalls is not empty, call the tool
	if (toolCalls) {
		const calledTool = JSON.parse(toolCalls) as unknown as ToolCall[];
		const toolName: string = calledTool[0].function.name;

		return await AI_PIPES[toolName]({
			prompt,
			keys
		});
	}
}

type AI_PIPES_TYPE = Record<string, ({ prompt, keys }: Params) => Promise<any>>;

// Pipes map
export const AI_PIPES: AI_PIPES_TYPE = {
	runPairProgrammer,
	runDatabaseArchitect
};

/**
 * Runs the pair programmer AI pipe.
 *
 * @param {Params} params - The parameters for running the pair programmer.
 * @param {string} params.prompt - The prompt for the pair programmer.
 * @param {Keys} params.keys - The API keys for the pair programmer.
 * @returns {Promise<string>} - A promise that resolves to the streamed text from the AI pipe.
 */
async function runPairProgrammer({ prompt, keys }: Params) {
	const reactCopilotPipe = new Pipe({
		apiKey: keys.REACT_COPILOT_PIPE_API_KEY
	});

	const { stream } = await reactCopilotPipe.streamText({
		messages: [
			{
				role: 'user',
				content: `${prompt}\n\nFramework: React`
			}
		],
		variables: [
			{
				name: 'framework',
				value: 'React'
			}
		]
	});

	return {
		stream,
		pipe: 'react-copilot'
	};
}

/**
 * Runs the database architect pipe to process a prompt and retrieve the result.
 *
 * @param {Params} params - The parameters for running the database architect pipe.
 * @param {string} params.prompt - The prompt to be processed by the pipe.
 * @param {Record<string, string>} params.keys - The API keys required for the pipe.
 * @returns {Promise<string>} - A promise that resolves to the result of the pipe.
 */
async function runDatabaseArchitect({ prompt, keys }: Params) {
	const databaseArchitectPipe = new Pipe({
		apiKey: keys.DATABASE_ARCHITECT_PIPE_API_KEY
	});

	const { stream } = await databaseArchitectPipe.streamText({
		messages: [
			{
				role: 'user',
				content: prompt
			}
		]
	});

	return {
		stream,
		pipe: 'database-architect'
	};
}
