import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

/**
 * Stream AI Chat Messages from Langbase
 *
 * @param req
 * @returns
 */

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, threadId } = body

    const response = await fetch('http://localhost:8787', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'lb-thread-id': threadId || ''
      },
      body: JSON.stringify({ messages: messages })
    })

    if (!response.ok) {
      const errorMessage = await response.text();
      const status = response.status;
      const errorResponse = {
        error: status === 429 ? 'Rate limit exceeded' : 'Backend request failed',
        details: errorMessage,
        status: status
      };
      return new Response(JSON.stringify(errorResponse), {
        status: status,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create a stream from the response
    const stream = OpenAIStream(response)

    // Return a streaming response
    return new StreamingTextResponse(stream, {
      headers: {
        'lb-thread-id': response.headers.get('lb-thread-id') || ''
      }
    })


  } catch (error: any) {
    console.error('Uncaught API Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    })
  }
}
