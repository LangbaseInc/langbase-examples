import { Context, Hono } from "hono";
import dotenv from "dotenv";
dotenv.config();

// Basic API endpoint
export const registerLangbaseEndpoint = (app: Hono) => {
  app.post("/api/langbase", async (c: Context) => {
    const request = new Request(c.req.url, {
      method: c.req.method,
      headers: {
        "Content-Type": c.req.header("Content-Type") || "application/json",
        Authorization: c.req.header("Authorization") || "",
      },
      body: JSON.stringify(await c.req.json()),
    });
    return handleAgentRequest(request);
  });
};

// Server-side only: Do NOT include it in any client-side code, that ends up in the browsers.

async function handleAgentRequest(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== 'string') {
      return new Response(JSON.stringify({ error: "Input is required and must be a string" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const response = await fetch("https://api.langbase.com/examples/slack-insight-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LANGBASE_API_KEY!}`
      },
      body: JSON.stringify({
        input: input
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return new Response(JSON.stringify(errorData || { message: `API request failed with status ${response.status}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error in handleAgentRequest:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}