/**
 * Discord commands
 *
 * Add your custom commands here according to your usecase
 */

export const DISCORD_COMMANDS = {
  ASK_COMMAND: {
    name: 'ask',
    description: 'Ask any question from the AI',
    options: [
      {
        name: 'question',
        description: 'The question to ask from the AI',
        type: 3, // STRING
        required: true,
      },
    ],
  },
};
