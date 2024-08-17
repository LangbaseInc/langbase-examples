interface LangbaseResponse {
	completion: string;
}

interface ToolCall {
	id: string;
	type: string;
	function: {
		name: string;
		arguments: string;
	};
}

interface AssistantMessage {
	role: string;
	content: string | null;
	tool_calls?: ToolCall[];
}

interface Choice {
	index: number;
	message: AssistantMessage;
	logprobs: null;
	finish_reason: string;
}

interface Usage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

interface RawResponse {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: Choice[];
	usage: Usage;
	system_fingerprint: null;
}

interface ApiResponse {
	success: boolean;
	completion: string;
	raw: RawResponse;
}

interface Env {
    OPENAI_API_KEY: string;
    LANGBASE_TRAVEL_PIPE_API_KEY: string,
    LANGBASE_ELECTRONICS_PIPE_API_KEY: string,
    LANGBASE_SPORTS_PIPE_API_KEY: string,
    LANGBASE_ONLINE_STORE_CUSTOMER_SERVICE_API_KEY: string
}

export type {
    LangbaseResponse,
    ToolCall,
    AssistantMessage,
    Choice,
    Usage,
    RawResponse,
    ApiResponse,
    Env
};



