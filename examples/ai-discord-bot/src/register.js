/**
 * This file registers commands to Discord. It is meant to be run from the command line,
 * and is not used by the application server.  It's allowed to use node.js primitives, and only needs
 * to be run once.
 *
 * To register commands globally, run:
 * DISCORD_TOKEN=**** DISCORD_APPLICATION_ID=**** node src/register.js global
 *
 * To register commands to a specific guild, run:
 * DISCORD_TOKEN=**** DISCORD_APPLICATION_ID=**** DISCORD_GUILD_ID=**** node src/register.js guild
 */

import { DISCORD_COMMANDS } from './commands.js';
import fetch from 'node-fetch';
import process from 'process';

// Global variables
const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;
if (!token) {
  throw new Error('The DISCORD_TOKEN environment variable is required.');
}
if (!applicationId) {
  throw new Error(
    'The DISCORD_APPLICATION_ID environment variable is required.',
  );
}

/**
 * Register all commands globally. This can take minutes, so wait until
 * you're sure these are the commands you want.
 */
async function registerGlobalCommands() {
  const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
  await registerCommands(url);
}

/**
 * Register all commands to a specific Guild. This is much faster than registering globally
 * and allows you to test in a single server.
 */
async function registerGuildCommands(guildId) {
  if (!guildId) {
    throw new Error(
      'The DISCORD_GUILD_ID environment variable is required to register guild commands.',
    );
  }
  const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`;
  await registerCommands(url);
}

async function registerCommands(url) {
  const commands = Object.values(DISCORD_COMMANDS);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify(commands),
  });

  if (response.ok) {
    console.log('Registered all commands');
  } else {
    console.error('Error registering commands');
    const text = await response.text();
    console.error(text);
  }
  return response;
}

// Main function to run the script
async function main() {
  // Parse command-line arguments
  const option = process.argv[2]; // Either 'global' or 'guild'

  try {
    // Register commands globally
    if (option === 'global') {
      await registerGlobalCommands();
    }

    // Register commands to a specific guild
    else if (option === 'guild') {
      const guildId = process.env.DISCORD_GUILD_ID;

      if (!guildId) {
        throw new Error(
          'The DISCORD_GUILD_ID environment variable is required.',
        );
      }
      await registerGuildCommands(guildId);
    } else {
      console.error("Please specify 'global' or 'guild' as the argument.");
      process.exit(1);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Call the main function to execute the script
main();
