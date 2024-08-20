import { NextRequest } from "next/server";
import { Pipe } from "langbase";
import z from "zod";

export const runtime = "edge";

type RequestBody = {
  messages: { role: string; content: string }[];
  variables: { name: string; value: string }[];
  type: string;
};

// Enum for type.
enum GenerationType {
  Generate = "generate",
  Summarize = "summarize",
  Quotes = "quotes",
  Recommendation = "recommendation",
  MainIdeas = "mainIdeas",
  Facts = "facts",
  Wow = "wow",
  Tweets = "tweets",
}

const requestBodySchema = z.object({
  prompt: z.string(),
  transcript: z.string().trim().min(1),
  type: z.enum([
    GenerationType.Generate,
    GenerationType.Summarize,
    GenerationType.Quotes,
    GenerationType.Recommendation,
    GenerationType.MainIdeas,
    GenerationType.Facts,
    GenerationType.Wow,
    GenerationType.Tweets,
  ]),
});

// Get the environment variable based on type.
const getEnvVar = (type: GenerationType) => {
  switch (type) {
    case GenerationType.Generate:
      return process.env.LB_GENERATE_PIPE_KEY;
    case GenerationType.Summarize:
      return process.env.LB_SUMMARIZE_PIPE_KEY;
    case GenerationType.Quotes:
      return process.env.LB_QUOTES_PIPE_KEY;
    case GenerationType.Recommendation:
      return process.env.LB_RECOMMENDATION_PIPE_KEY;
    case GenerationType.MainIdeas:
      return process.env.LB_MAIN_IDEAS_PIPE_KEY;
    case GenerationType.Facts:
      return process.env.LB_FACTS_PIPE_KEY;
    case GenerationType.Wow:
      return process.env.LB_WOW_PIPE_KEY;
    case GenerationType.Tweets:
      return process.env.LB_TWEETS_PIPE_KEY;
    default:
      return null;
  }
};

/**
 * Generate response and stream from Langbase Pipe.
 *
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    console.log("Request received");

    // Extract the prompt from the request body
    const reqBody: RequestBody = await req.json();
    const parsedReqBody = requestBodySchema.safeParse(reqBody);

    if (!parsedReqBody.success || !parsedReqBody.data) {
      throw new Error(parsedReqBody.error.message);
    }
    const { prompt, transcript, type } = parsedReqBody.data;
    
    console.log(type);

    // Get the environment variable based on type.
    const envVar = getEnvVar(type);

    if (!envVar) {
      throw new Error("Pipe API key not found");
    }

    // If type is generate.
    if (type === GenerationType.Generate) {
      return await generateResponse({ prompt, transcript, envVar });
    } else {
      return await preDefinedPipeResponse({ envVar, transcript });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

/**
 * Generate response from Langbase Pipe.
 *
 * @param prompt
 * @param transcript
 * @param envVar
 * @returns
 */
async function generateResponse({
  prompt,
  transcript,
  envVar,
}: {
  prompt: string;
  transcript: string;
  envVar: string;
}) {
  // 1. Set up the endpoint and headers
  const endpointUrl = "https://api.langbase.com/beta/generate";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${envVar}`,
  };

  // 2. Build request body
  const body = {
    messages: [{ role: "user", content: prompt }],
    variables: [{ name: "transcript", value: transcript }],
  };

  // 3. Make the request
  const response = await fetch(endpointUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(`Error ${res.error.status}: ${res.error.message}`);
  }

  // 4. Return the response
  const data = await response.json();
  return new Response(JSON.stringify(data));
}

/**
 * Generate response from Langbase Pipe using Langbase SDK.
 *
 * @param transcript
 * @param envVar
 * @returns
 */
async function preDefinedPipeResponse({
  transcript,
  envVar,
}: {
  transcript: string;
  envVar: string;
}) {
  // 1. Initiate the Pipe.
  const pipe = new Pipe({
    apiKey: envVar,
  });

  // 2. Generate a stream by asking a question
  const stream = await pipe.streamText({
    messages: [{ role: "user", content: transcript }],
  });

  // 3. Done, return the stream in a readable stream format.
  return new Response(stream.toReadableStream());
}