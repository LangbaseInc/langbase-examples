import { Langbase } from 'langbase'

export const runtime = 'edge'

/**
 * Stream AI Chat Messages from Langbase
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    if (!process.env.LANGBASE_API_KEY) {
      throw new Error(
        'Please set LANGBASE_API_KEY in your environment variables.'
      )
    }

    // Get chat prompt messages and threadId from the client.
    const options = await req.json()

    const langbase = new Langbase({
      apiKey: process.env.LANGBASE_API_KEY
    })

    const { stream, threadId } = await langbase.pipe.run({
      ...options,
      name: 'ai-chatbot'
    })

    return new Response(stream, {
      status: 200,
      headers: {
        'lb-thread-id': threadId || ''
      }
    })
  } catch (error: any) {
    console.error('Uncaught API Error:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
