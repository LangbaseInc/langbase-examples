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

export interface Env {
    OPENAI_API_KEY: string;
    LANGBASE_TRAVEL_PIPE_API_KEY: string,
    LANGBASE_ELECTRONICS_PIPE_API_KEY: string,
    LANGBASE_SPORTS_PIPE_API_KEY: string,
    LANGBASE_ONLINE_STORE_CUSTOMER_SERVICE_API_KEY: string
}


function getDepartmentKey(functionName: string): keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'> | null {
    const departmentMap: { [key: string]: keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'> } = {
        'call_sports_dept': 'LANGBASE_SPORTS_PIPE_API_KEY',
        'call_electronics_dept': 'LANGBASE_ELECTRONICS_PIPE_API_KEY',
        'call_travel_dept': 'LANGBASE_TRAVEL_PIPE_API_KEY'
    };
    return departmentMap[functionName] || null;
}


function createMessageStream(content: string): ReadableStream {
    return new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode('data: ' + JSON.stringify({ choices: [{ delta: { content } }] }) + '\n\n'));
            controller.close();
        }
    });
}

function createErrorStream(errorMessage: string): ReadableStream {
    return createMessageStream(errorMessage);
}

async function callDepartment(deptKey: keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'>, customerQuery: string, env: Env, threadId?: string): Promise<ReadableStream> {
    console.log(`Calling ${deptKey} department with query:`, customerQuery);

    const response = await fetch('https://api.langbase.com/beta/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env[deptKey]}`,
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: customerQuery }],
            ...(threadId && { threadId })
        }),
    });

    if (!response.ok) {
        return new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(`Error: ${response.status} ${response.statusText}`));
                controller.close();
            }
        });
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    return new ReadableStream({
        async start(controller) {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
        }
    });
}


async function processDepartmentCalls(toolCalls: ToolCall[], env: Env, threadId: string): Promise<ReadableStream> {
    for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const departmentKey = getDepartmentKey(functionName);
        if (departmentKey) {
            return await callDepartment(departmentKey, functionArgs.customerQuery, env, threadId);
        }
    }
    return createErrorStream('No valid department call found');
}


async function processRawChoices(choice: Choice, env: Env, threadId: string): Promise<ReadableStream> {
    const assistantMessage = choice.message;
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        return await processDepartmentCalls(assistantMessage.tool_calls, env, threadId);
    } else {
        const content = assistantMessage.content || 'Sorry, I couldn\'t process your request.';
        return createMessageStream(content);
    }
}

function processSuccessfulCompletion(completion: any): ReadableStream {
    try {
        const parsedCompletion = typeof completion === 'string' ? JSON.parse(completion) : completion;
        const message = parsedCompletion.message || parsedCompletion.content || JSON.stringify(parsedCompletion);
        return createMessageStream(message);
    } catch (error) {
        console.error('Error parsing completion:', error);
        console.log('Raw completion:', completion);
        return createErrorStream('Error processing response');
    }
}


async function processMainChatbotResponse(data: ApiResponse, env: Env, threadId: string): Promise<ReadableStream> {
    if (data.success && data.completion) {
        return processSuccessfulCompletion(data.completion);
    } else if (data.raw && data.raw.choices && data.raw.choices.length > 0) {
        return processRawChoices(data.raw.choices[0], env, threadId);
    } else {
        return createErrorStream('Unexpected response format');
    }
}


async function callMainChatbot(query: string, threadId: string | undefined, env: Env): Promise<{ data: ApiResponse, threadId: string | undefined }> {
    const userQuery = {
        threadId,
        messages: [{ role: 'user', content: query }],
    };
    const response = await fetch('https://api.langbase.com/beta/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env['LANGBASE_ONLINE_STORE_CUSTOMER_SERVICE_API_KEY']}`,
        },
        body: JSON.stringify(userQuery),
    });

    const data = await response.json() as ApiResponse;
    return {
        data,
        threadId: response.headers.get('lb-thread-id') || threadId
    };
}


export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 });
        }

        let incomingMessages;
        let threadId = request.headers.get('lb-thread-id') || undefined;
        try {
            const body = await request.json() as { messages: any[], threadId?: string };
            incomingMessages = body.messages;
            threadId = body.threadId || threadId;

            if (!incomingMessages || !Array.isArray(incomingMessages) || incomingMessages.length === 0) {
                throw new Error('Invalid or empty messages array');
            }
        } catch (error) {
            console.error('Error processing request:', (error as Error).message);
            return new Response(JSON.stringify({ error: (error as Error).message }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
            });
        }

        const query = incomingMessages[incomingMessages.length - 1].content;
        const { data, threadId: newThreadId } = await callMainChatbot(query, threadId, env);
        threadId = newThreadId;

        const responseStream = await processMainChatbotResponse(data, env, threadId || '');

        return new Response(responseStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, lb-thread-id',
                'lb-thread-id': threadId || '',
            },
        });
    },
};


