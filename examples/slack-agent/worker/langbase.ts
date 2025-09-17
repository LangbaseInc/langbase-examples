import { Context, Hono } from "hono";

type Bindings = {
  LANGBASE_API_KEY: string;
};

// Register endpoint
export const registerLangbaseEndpoint = (app: Hono<{ Bindings: Bindings }>) => {
  app.post("/api/langbase", async (c: Context<{ Bindings: Bindings }>) => {
    const request = new Request(c.req.url, {
      method: c.req.method,
      headers: {
        "Content-Type": c.req.header("Content-Type") || "application/json",
        Authorization: c.req.header("Authorization") || "",
      },
      body: JSON.stringify(await c.req.json()),
    });

    return handleAgentRequest(request, c.env.LANGBASE_API_KEY);
  });
};

// Worker-friendly handler
async function handleAgentRequest(request: Request, apiKey: string) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== "string") {
      return new Response(JSON.stringify({ error: "Input is required and must be a string" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.langbase.com/examples/slack-insight-agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return new Response(
        JSON.stringify(errorData || { message: `API request failed with status ${response.status}` }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in handleAgentRequest:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
