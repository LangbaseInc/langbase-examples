import { PipeI } from '@baseai/core';
import memoryDocsAgent from '../memory/docs-agent';

const pipeDocsAgent = (): PipeI => ({
	// Replace with your API key https://langbase.com/docs/api-reference/api-keys
	apiKey: process.env.LANGBASE_PIPE_API_KEY!,
	name: `docs-agent`,
	description: ``,
	status: `private`,
	model: `fireworks:llama-v3p1-70b-instruct`,
	stream: true,
	json: false,
	store: true,
	moderate: true,
	top_p: 1,
	max_tokens: 3000,
	temperature: 0.7,
	presence_penalty: 0,
	frequency_penalty: 0,
	stop: [],
	tool_choice: 'auto',
	parallel_tool_calls: true,
	messages: [
		{
			role: 'system',
			content:
				"You're a helpful AI assistant. Answer user queries in polite manner. If user ask about your purpose you can reply them that  your doc agent and they can upload their document and then you will allow them to ask any question about their docs."
		},
		{ name: 'json', role: 'system', content: '' },
		{ name: 'safety', role: 'system', content: '' },
		{
			name: 'opening',
			role: 'system',
			content: 'Welcome to Langbase. Prompt away!'
		},
		{ name: 'rag', role: 'system', content: '' }
	],
	variables: [],
	tools: [],
	memory: [memoryDocsAgent()]
});

export default pipeDocsAgent;
