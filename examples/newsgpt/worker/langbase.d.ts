import { Hono } from "hono";
type Bindings = {
    LANGBASE_API_KEY: string;
    OPENAI_API_KEY: string;
    EXA_API_KEY: string;
};
export declare const registerLangbaseEndpoint: (app: Hono<{
    Bindings: Bindings;
}>) => void;
export {};
