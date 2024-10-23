import { Config } from "@netlify/functions"
import OpenAI from "openai"

export default async (req: Request) => {
  const url = new URL(req.url)
  const prompt = url.searchParams.get("url")

  if (!prompt) {
    return new Response("Missing 'url' query parameter", { status: 400 })
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a single image from a GeoCities website. Not an image of the website, but an image that would be used on a GeoCities website. Guess what the image should be from the URL, ${prompt}`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    })

    const image = Buffer.from(response.data[0].b64_json, "base64")

    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
        "Netlify-CDN-Cache-Control": "public, max-age=31536000, durable",
      },
    })
  } catch (error) {
    console.error("Error generating image:", error)
    return new Response("Error generating image", { status: 500 })
  }
}

export const config: Config = {
  path: "/geoimages",
}
