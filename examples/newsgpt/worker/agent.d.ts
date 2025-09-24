interface NewsGPTEnv {
    LANGBASE_API_KEY: string;
    OPENAI_API_KEY: string;
    EXA_API_KEY: string;
    [key: string]: string | undefined;
}
interface newsGPTParams {
    input: string;
    env: NewsGPTEnv;
}
export declare function newsGPT({ input, env }: newsGPTParams): Promise<any>;
export {};
