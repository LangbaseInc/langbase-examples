import { Langbase } from "langbase"

interface SlackAgentEnv {
  LANGBASE_API_KEY: string;
  OPENAI_API_KEY: string;
  SLACK_BOT_TOKEN: string;
  [key: string]: string | undefined;
}

interface SlackAgentWorkflowParams {
  input: string;
  env: SlackAgentEnv;
}

export async function slackAgentWorkflow({ input, env }: SlackAgentWorkflowParams) {
  const langbase = new Langbase({ apiKey: env.LANGBASE_API_KEY });

  const workflow = langbase.workflow();
  const { step } = workflow;

  try {
    const slackResponse = await step({
      id: "query_slack",
      run: async () => {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: env.OPENAI_API_KEY,
          instructions: `You are a Slack assistant that can help users with their Slack workspace queries.

You have access to Slack through MCP tools. You can:
- Search for messages in channels
- Get channel information
- Retrieve message history
- Find conversations about specific topics
- Get user information by user ID

When users ask about:
- "last X messages" - use appropriate Slack tools to get recent messages
- "decisions made about..." - search for relevant conversations
- "when did we talk about..." - search message history for the topic
- "create digest from channels" - get messages from specified channels and summarize

When fetching messages, always include the sender's name along with their message. Do not just show the sender's ID. 
Use the Slack user info tools to resolve user IDs to actual names. For each message, you should call the appropriate user info tool to get the sender's name before presenting the information.

Always provide helpful, accurate information based on the actual Slack data you retrieve. Make sure to show who said what by including the user's full name with each message.`,
          input: [{ role: "user", content: input }],
          stream: false,
          mcp_servers: [
            {
              type: "url",
              name: "slack",
              url: "https://slack.mcp.langbase.com/sse",
              authorization_token: env.SLACK_BOT_TOKEN,
            },
          ],
        });
        return output;
      },
    });

    return slackResponse;
  } finally {
    await workflow.end();
  }
}
