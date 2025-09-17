import { Hono } from "hono";
import { app } from "./app";

// ✅ In Workers, you don't use `serve` or listen on a port.
// Just export the app or its fetch handler.

export default app;
