import { Env, ApiResponse } from './types';

export interface InternalMessage {
    entity: 'main' | 'internal';
    responseStream: ReadableStream;
    toolCallDetected: boolean;
    customerQuery?: string;
    threaId: string;
}
  
const encoder = new TextEncoder();

function getDepartmentKey(functionName: string): keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'> | null {
    const departmentMap: { [key: string]: keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'> } = {
        'call_sports_dept': 'LANGBASE_SPORTS_PIPE_API_KEY',
        'call_electronics_dept': 'LANGBASE_ELECTRONICS_PIPE_API_KEY',
        'call_travel_dept': 'LANGBASE_TRAVEL_PIPE_API_KEY'
    };
    return departmentMap[functionName] || null;
}

async function callDepartment(deptKey: keyof Pick<Env, 'LANGBASE_SPORTS_PIPE_API_KEY' | 'LANGBASE_ELECTRONICS_PIPE_API_KEY' | 'LANGBASE_TRAVEL_PIPE_API_KEY'>, customerQuery: string, env: Env, threadId?: string): Promise<ApiResponse> {
 
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
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json() as ApiResponse;
}


  async function processMainChatbotResponse(response: Response, env: Env, threadId: string, initialState: { entity: 'main' | 'internal', toolCallDetected: boolean }): Promise<InternalMessage> {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let accumulatedToolCall: any = null;
    let accumulatedArguments = '';
    const sharedState = { 
        toolCallDetected: initialState.toolCallDetected,
        entity: initialState.entity
      };

    const [processStream, responseStream] = new ReadableStream({
        async start(controller: ReadableStreamDefaultController) {
            try {
                let buffer = '';
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                    const result = await processLine(line, controller, env, threadId, accumulatedToolCall, accumulatedArguments, sharedState);
                    accumulatedToolCall = result[0];
                    accumulatedArguments = result[1];
                }
            }
            } catch (error) {
                console.error('Error in stream processing:', error);
            } finally {
                controller.close();

            }
        }
    }).tee();

    await processStream.pipeTo(new WritableStream());

    return {
        entity: sharedState.toolCallDetected ? 'internal' : 'main',
        responseStream: responseStream,
        toolCallDetected: sharedState.toolCallDetected,
        customerQuery: '',
        threadId: threadId
    };
}

async function processLine(
    line: string, 
    controller: ReadableStreamDefaultController, 
    env: Env, 
    threadId: string, 
    accumulatedToolCall: any, 
    accumulatedArguments: string,
    sharedState: { toolCallDetected: boolean }
): Promise<[any, string]> {
    if (line.trim() === 'data: [DONE]') {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        return [accumulatedToolCall, accumulatedArguments];
    }
    if (!line.startsWith('data: ')) return [accumulatedToolCall, accumulatedArguments];

    try {
        const data = JSON.parse(line.slice(6));
        if (!data.choices || !data.choices[0].delta) return [accumulatedToolCall, accumulatedArguments];

        const delta = data.choices[0].delta;
        if (delta.content) {
            enqueueContentChunk(controller, data, delta.content);
        } else if (delta.tool_calls) {
            sharedState.toolCallDetected = true;
            if (!accumulatedToolCall) {
                accumulatedToolCall = delta.tool_calls[0];
                accumulatedArguments = delta.tool_calls[0].function.arguments || '';
            } else {
                accumulatedArguments += delta.tool_calls[0].function.arguments || '';
            }

            if (accumulatedToolCall.function.name && accumulatedArguments.endsWith('}')) {
                const departmentKey = getDepartmentKey(accumulatedToolCall.function.name);
                if (departmentKey) {
                    const args = JSON.parse(accumulatedArguments);
                    const departmentResponse = await callDepartment(departmentKey, args.customerQuery, env, threadId);
                    let responseContent = formatDepartmentResponse(departmentResponse.completion);
                    console.log(`Dept response: ${responseContent}`);
                    enqueueContentChunk(controller, data, responseContent);
                }
                accumulatedToolCall = null;
                accumulatedArguments = '';
            }
        }
    } catch (error) {
        console.warn('Error processing chunk:', error, 'Line:', line);
    }

    return [accumulatedToolCall, accumulatedArguments];
}

function enqueueContentChunk(controller: ReadableStreamDefaultController, data: any, content: string) {
    const chunk = {
        id: data.id,
        object: data.object,
        created: data.created,
        model: data.model,
        choices: [{ index: 0, delta: { content }, finish_reason: null }]
    };
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
}

function formatDepartmentResponse(response: string): string {
    try {
        const parsedResponse = JSON.parse(response);
        const [key, value] = Object.entries(parsedResponse)[0];
        return `${key} ${value}`;
    } catch (parseError) {
        console.warn('Error parsing department response:', parseError);
        return response;
    }
}

async function callMainChatbot(query: string, threadId: string | undefined, env: Env): Promise<Response> {
    const userQuery = {
        threadId,
        messages: [{ role: 'user', content: query }],
    };
    return fetch('https://api.langbase.com/beta/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env['LANGBASE_ONLINE_STORE_CUSTOMER_SERVICE_API_KEY']}`,
        },
        body: JSON.stringify(userQuery),
    });
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const isProduction = request.url.includes('workers.dev');
        const allowedOrigin = isProduction ? 'https://online-cs.pages.dev' : 'http://localhost:3000';

        const MAX_USERS = 2; // MAX_USERS also represents different conversation thread for the same user (reset case)
        const MAX_CONVERSATIONS = 3;
        const EXPIRATION_TTL = 300; // 5 min test

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { 
                status: 405,
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                }
            });
        }

        let threadId = request.headers.get('lb-thread-id') || undefined;

        // Rate limiting
        const activeUsersJson = await env.CACHE.get('active_users');
        const activeUsers = activeUsersJson ? JSON.parse(activeUsersJson) : {};
        const currentTime = Date.now();

        if (threadId && activeUsers[threadId]) {
            if (activeUsers[threadId].count >= MAX_CONVERSATIONS) {
                return new Response('You have reached the maximum number of conversations', { status: 429 });
            }
        } else if (Object.keys(activeUsers).length >= MAX_USERS) {
            return new Response('Maximum number of concurrent users reached', { status: 429 });
        }

        let incomingMessages;
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
                    'Access-Control-Allow-Origin': allowedOrigin,
                },
            });
        }

        let internalMessage: InternalMessage;
        let query = incomingMessages[incomingMessages.length - 1].content;
    
        do {
          const response = await callMainChatbot(query, threadId, env);
          threadId = response.headers.get('lb-thread-id') || threadId;
    
          if (!response.body) {
            console.error('No readable stream found in response body');
            return new Response('Internal Server Error', { status: 500 });
          }
    
          internalMessage = await processMainChatbotResponse(response, env, threadId || '', { entity: 'main', toolCallDetected: false });
          if (internalMessage.entity === 'internal') {
            const response = await callMainChatbot('summarize the current status for the customer', threadId, env);
            threadId = response.headers.get('lb-thread-id') || threadId;
    
            if (!response.body) {
              console.error('No readable stream found in response body');
              return new Response('Internal Server Error', { status: 500 });
            }
            
            internalMessage = await processMainChatbotResponse(response, env, threadId || '', { entity: 'main', toolCallDetected: false });
          }
        } while (internalMessage.entity === 'internal');


        // Update rate limiting data
        if (threadId) {
            if (!activeUsers[threadId]) {
                activeUsers[threadId] = { count: 0, lastAccess: currentTime };
            }
            activeUsers[threadId].count++;
            activeUsers[threadId].lastAccess = currentTime;

            await env.CACHE.put('active_users', JSON.stringify(activeUsers), { expirationTtl: EXPIRATION_TTL });

            // Log KV contents
            const value = await env.CACHE.list();
            console.log(`CACHE KVs: ${JSON.stringify(value.keys)}`);
            for (const key of value.keys) {
                const keyValue = await env.CACHE.get(key.name);
                console.log(`Key: ${key.name}, Value: ${keyValue}`);
            }

            // Cleanup expired users
            ctx.waitUntil(cleanupExpiredUsers(env, MAX_USERS, MAX_CONVERSATIONS, EXPIRATION_TTL));
        }

        return new Response(internalMessage.responseStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, lb-thread-id',
                'lb-thread-id': threadId || '',
            },
        });
    },
};


async function cleanupExpiredUsers(env: Env, MAX_USERS: number, MAX_CONVERSATIONS: number, EXPIRATION_TTL: number) {
    const activeUsersJson = await env.CACHE.get('active_users');
    if (!activeUsersJson) return;

    const activeUsers = JSON.parse(activeUsersJson);
    const currentTime = Date.now();
    const oneHourAgo = currentTime - EXPIRATION_TTL * 1000;

    for (const [threadId, userData] of Object.entries(activeUsers)) {
        if (userData.lastAccess < oneHourAgo) {
            delete activeUsers[threadId];
        }
    }

    await env.CACHE.put('active_users', JSON.stringify(activeUsers), { expirationTtl: EXPIRATION_TTL });
}