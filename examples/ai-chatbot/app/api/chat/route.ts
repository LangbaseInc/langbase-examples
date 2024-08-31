import { Pipe } from 'langbase'

export const runtime = 'edge'

/**
 * Stream AI Chat Messages from Langbase
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_LB_PIPE_API_KEY) {
      throw new Error(
        'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
      )
    }

    // Get chat prompt messages and threadId from the client.
    const body = await req.json()
    const { messages, threadId } = body

    const chatBotPipe = new Pipe({ apiKey: process.env.NEXT_LB_PIPE_API_KEY })

    const streamOptions = {
      messages,
      chat: true,
      ...(threadId && { threadId }) // Only include threadId if it exists,
    }

    const { stream: response, threadId: lbThreadId } =
      await chatBotPipe.streamText(streamOptions)

    return new Response(response.toReadableStream(), {
      headers: {
        'lb-thread-id': lbThreadId || ''
      }
    })
  } catch (error: any) {
    console.error('Uncaught API Error:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
