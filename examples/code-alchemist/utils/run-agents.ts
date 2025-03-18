import 'server-only';

import { Langbase, getToolsFromRunStream } from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!
});

/**
 * Runs a code generation agent with the provided prompt.
 *
 * @param prompt - The input prompt for code generation
 * @returns A promise that resolves to an object containing:
 *          - pipe: The name of the pipe used for generation
 *          - stream: The output stream containing the generated content
 *
 * @remarks
 * This function processes the prompt through a langbase pipe and handles potential tool calls.
 * If tool calls are detected, it delegates to the appropriate PipeAgent.
 * Otherwise, it returns the direct output from the code-alchemist pipe.
 */
export async function runCodeGenerationAgent(prompt: string) {
	const {stream} = await langbase.pipes.run({
		stream: true,
		name: 'code-alchemist',
		messages: [{ role: 'user', content: prompt }],
	})

	const [streamForCompletion, streamForReturn] = stream.tee();

	const toolCalls = await getToolsFromRunStream(streamForCompletion);
	const hasToolCalls = toolCalls.length > 0;

	if(hasToolCalls) {
		const toolCall = toolCalls[0];
		const toolName = toolCall.function.name;
		const response = await PipeAgents[toolName](prompt);

		return {
			pipe: response.pipe,
			stream: response.stream
		};
	} else {
		return {
			pipe: 'code-alchemist',
			stream: streamForReturn
		}
	}
}

type PipeAgentsT = Record<string, (prompt: string) => Promise<{
	stream: ReadableStream<any>,
	pipe: string
}>>;

export const PipeAgents: PipeAgentsT = {
	runPairProgrammer: runPairProgrammerAgent,
	runDatabaseArchitect: runDatabaseArchitectAgent
};

/**
 * Executes a pair programmer agent with React-specific configuration.
 *
 * @param prompt - The user input prompt to be processed by the agent
 * @returns {Promise<{stream: ReadableStream, pipe: string}>} An object containing:
 *   - stream: A ReadableStream of the agent's response
 *   - pipe: The name of the pipe being used ('react-copilot')
 *
 * @example
 * const result = await runPairProgrammerAgent("Create a React button component");
 * // Use the returned stream to process the agent's response
 */
async function runPairProgrammerAgent(prompt: string) {
	const { stream } = await langbase.pipes.run({
		stream: true,
		name: 'react-copilot',
		messages: [{ role: 'user', content: prompt }],
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
 * Executes the Database Architect Agent with the given prompt.
 *
 * @param prompt - The input prompt string to be processed by the database architect agent
 * @returns An object containing:
 *          - stream: The output stream from the agent
 *          - pipe: The name of the pipe used ('database-architect')
 * @async
 */
async function runDatabaseArchitectAgent(prompt: string) {
	const {stream} = await langbase.pipes.run({
		stream: true,
		name: 'database-architect',
		messages: [{ role: 'user', content: prompt }]
	})


	return {
		stream,
		pipe: 'database-architect'
	};
}
