export const runtime = 'edge'

// Route for Streaming Chat Messages from Langbase
// Ensure that streaming is enabled for your Langbase pipe.

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_LB_PIPE_API_KEY) {
      throw new Error(
        'Please set NEXT_LB_PIPE_API_KEY in your environment variables.'
      )
    }
    const endpointUrl = 'https://api.langbase.com/beta/chat'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
    }

    const body = await req.json()
    const { messages, threadId } = body

    const requestBody = {
      messages,
      ...(threadId && { threadId }) // Only include threadId if it exists
    }

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const res = await response.json()
      throw new Error(`Error ${res.error.status}: ${res.error.message}`)
    }

    return new Response(response.body as ReadableStream<Uint8Array>, {
      headers: response.headers
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
