type Bindings = {
    LANGBASE_API_KEY: string;
    OPENAI_API_KEY: string;
    EXA_API_KEY: string;
};
declare const _default: {
    fetch(request: Request, env: Bindings, ctx: any): Response | Promise<Response>;
};
export default _default;
