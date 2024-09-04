import fetch from 'node-fetch';
import process from 'process';

/**
 * This script unregisters all global commands for a Discord application.
 * It should be run from the command line.
 *
 * Only run this script if you are sure you want to unregister all global commands.
 *
 * To run:
 * DISCORD_TOKEN=**** DISCORD_APPLICATION_ID=**** node src/unregister.js
 */

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

async function unregisterGlobalCommands() {
  const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bot ${token}`,
    },
    method: 'GET',
  });

  if (!response.ok) {
    console.error('Error fetching commands');
    const text = await response.text();
    console.error(text);
    process.exit(1);
  }

  const commands = await response.json();

  if (commands.length === 0) {
    console.log('No global commands to unregister.');
    return;
  }

  console.log(`Found ${commands.length} global commands. Unregistering...`);

  for (const command of commands) {
    const deleteUrl = `https://discord.com/api/v10/applications/${applicationId}/commands/${command.id}`;

    const deleteResponse = await fetch(deleteUrl, {
      headers: {
        Authorization: `Bot ${token}`,
      },
      method: 'DELETE',
    });

    if (deleteResponse.ok) {
      console.log(`Unregistered command: ${command.name}`);
    } else {
      console.error(`Failed to unregister command: ${command.name}`);
      const text = await deleteResponse.text();
      console.error(text);
    }
  }

  console.log('Unregistered all global commands.');
}

// Call the function to unregister commands
unregisterGlobalCommands().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
