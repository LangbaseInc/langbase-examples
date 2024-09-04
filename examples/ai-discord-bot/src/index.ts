import {
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { Discord } from './discord';
import { DISCORD_COMMANDS } from './commands';
import { getLangbaseResponse } from './langbase';

export interface Env {
  DISCORD_PUBLIC_KEY: string;
  DISCORD_APPLICATION_ID: string;
  DISCORD_TOKEN: string;
  LANGBASE_PIPE_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    // Verify request came from Discord
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    if (!signature || !timestamp) {
      return new Response('Unauthorized', { status: 401 });
    }
    const body = await request.clone().arrayBuffer();
    const isValidRequest = await verifyKey(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    );
    if (!isValidRequest) {
      return new Response('Unauthorized', { status: 401 });
    }

    const message: Discord.Interaction = await request.json();
    // Optional: If you want to continue conversation. You can use this chatId.
    const chatId: string = message.channel_id || message.user?.id || '-1';

    if (message.type === InteractionType.PING) {
      console.log('== ✨ Ping Command received');
      return new Response(
        JSON.stringify({ type: InteractionResponseType.PONG }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (message.type === InteractionType.APPLICATION_COMMAND) {
      switch (message.data.name.toLowerCase()) {
        // ASK Command
        case DISCORD_COMMANDS.ASK_COMMAND.name.toLowerCase(): {
          // Get user query from arguments
          const query =
            message.data.options?.map((option) => option.value).join(' ') || '';
          console.log('== ✨ Ask Command received', query);

          // If empty query, return an error message
          if (query.trim() == '') {
            return Discord.generateResponse({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Please provide a query',
                flags: InteractionResponseFlags.EPHEMERAL,
              },
            });
          }

          // Send response to Discord once ready
          ctx.waitUntil(
            (async () => {
              try {
                // Query Langbase API with user query
                const content = await getLangbaseResponse({
                  prompt: query,
                  env,
                });

                // Send response to Discord
                await fetch(
                  `https://discord.com/api/v10/webhooks/${env.DISCORD_APPLICATION_ID}/${message.token}/messages/@original`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify({
                      content: `> ${query}`,
                      embeds: [{ description: content }],
                    }),
                  },
                );
                console.log('== ✨ Ask Command Response Sent', content);
              } catch (error) {
                console.error('Error sending Ask Command Response:', error);
              }
            })(),
          );

          // Immediately respond an acknowledgement first
          return Discord.generateResponse({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
          });
        }
        default: {
          return Discord.generateResponse(
            {
              error: 'Unknown command',
            },
            {
              status: 400,
            },
          );
        }
      }
    }

    return Discord.generateResponse(
      {
        error: 'Unexpected error',
      },
      {
        status: 500,
      },
    );
  },
};
