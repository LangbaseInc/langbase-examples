import {Pipe} from 'langbase';
import { Context } from "@netlify/functions";

const pipe = new Pipe({
    apiKey: process.env.LANGBASE_API_KEY!,
});

export default async (request: Request, context: Context) => {
  try {
    const stream = await pipe.streamText({
        messages: [{role: "user", content: decodeURIComponent(new URL(request.url).searchParams.get("url") || "")}]
    })
    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(content)
          }
        }
        controller.close()
      },
    })

    return new Response(responseStream, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Transfer-Encoding": "chunked",
        "Netlify-CDN-Cache-Control": "public, max-age=31536000, durable",
      },
    })
  } catch (error) {
    console.error("Error in Netlify function:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "text/html",
      },
    })
  }
}

export const config = {
    path: "/geocities"
}