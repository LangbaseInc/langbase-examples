import { newsGPT } from "./agent";
import { Context, Hono } from "hono";

type Bindings = {
  LANGBASE_API_KEY: string;
  OPENAI_API_KEY: string;
  EXA_API_KEY: string;
};

// Register endpoint
export const registerLangbaseEndpoint = (app: Hono<{ Bindings: Bindings }>) => {
  app.post("/api/langbase", async (c: Context<{ Bindings: Bindings }>) => {
    try {
      const { input } = await c.req.json();

      if (!input || typeof input !== "string") {
        return c.json({ error: "Input is required and must be a string" }, 400);
      }

      // Call your own workflow instead of external API
      const output = await newsGPT({
        input,
        env: c.env, // pass Worker environment vars
      });

      return c.json({ output }, 200);
    } catch (err) {
      console.error("Error in /api/langbase:", err);
      return c.json({ error: "Internal server error" }, 500);
    }
  });
};
