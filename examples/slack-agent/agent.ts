import dotenv from "dotenv";
dotenv.config();
import { Langbase } from "langbase";

async function slackAgentWorkflow({ input, env }) {
  const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY,
  });

  const workflow = langbase.workflow({
    debug: true,
  });
  
  const { step } = workflow;

  try {
    // Step 1: Process the user query with Slack MCP server
    const slackResponse = await step({
      id: "query_slack",
      run: async () => {
        const { output } = await langbase.agent.run({
          model: "openai:gpt-4.1-mini",
          apiKey: process.env.OPENAI_API_KEY,
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
          input: [
            { role: "user", content: input },
          ],
          stream: false,
          mcp_servers: [{
            "type": "url",
            "name": "slack",
            "url": "https://slack.mcp.langbase.com/sse",
            "authorization_token": process.env.SLACK_BOT_TOKEN
          }]
        });
        return output;
      },
    });

    return slackResponse;

  } catch (err) {
    console.error("Slack agent workflow error:", err);
    throw err;
  } finally {
    await workflow.end();
  }
}

async function main(event, env) {
  const { input } = await event.json();
  const result = await slackAgentWorkflow({ input, env });
  return result;
}

export default main;

(async () => {
  const event = {
    json: async () => ({
      input: 'Your input goes here.',
    }),
  };
  const result = await main(event, {});
  console.log(result);
})();