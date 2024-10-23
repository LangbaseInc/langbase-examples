import { Context } from "https://edge.netlify.com"
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts"

export default async function (request: Request, context: Context) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get("url")

  if (!targetUrl) {
    return new Response("Missing 'url' parameter", { status: 400 })
  }

  const response = await context.next()
  const contentType = response.headers.get("content-type")

  if (!contentType || !contentType.includes("text/html")) {
    return response
  }

  const targetOrigin = new URL(targetUrl).origin

  return new HTMLRewriter()
    .on("a", {
      element(el) {
        const href = el.getAttribute("href")
        if (href) {
          const absoluteUrl = new URL(href, targetOrigin).toString()
          el.setAttribute(
            "href",
            `${url.origin}/geocities?url=${encodeURIComponent(absoluteUrl)}`
          )
        }
        if (el.getAttribute("target")) {
          el.setAttribute("target", "")
        }
      },
    })
    .on("img", {
      element(el) {
        const src = el.getAttribute("src")
        if (src) {
          const absoluteUrl = new URL(src, targetOrigin).toString()
          el.setAttribute(
            "src",
            `${url.origin}/geoimages?url=${encodeURIComponent(absoluteUrl)}`
          )
        }
      },
    })
    .transform(response)
}

export const config = {
  path: "/geocities",
}
