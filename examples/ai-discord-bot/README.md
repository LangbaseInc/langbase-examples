# Langbase AI Discord Bot Example

Langbase AI Discord Bot is a discord bot that brings the power of Langbase Pipes straight to your Discord server.

In the Discord server where this bot is installed, you can ask any query about the Langbase documentation using your set command eg., `/ask`.

When a user enters a command, this bot will get the user query, send it to the given Langbase pipe, and return the response back to the user's message as a reply on Discod. The bot is built using the Discord Interactions API and Cloudflare Workers.

## AI Discord Bot in action

Ask Langbase Docs bot is created using this example. It is a discord bot that can answer any questions about Langbase documentation. It is currently available on Langbase Discord server. You can ask any question about Langbase documentation using the `/ask` command. The bot will respond with the answer to your question.

Here is a preview of the bot in action:

https://github.com/user-attachments/assets/915ddcd8-23cc-4f37-a057-00b262cfa516

You can create a similar bot for your own Discord server using this example.

## Resources used

- [Langbase Pipe for AI](https://langbase.com/docs/)
- [Langbase SDK](https://langbase.com/docs/langbase-sdk/overview)
- [Discord Interactions API](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting

---

## Project structure

Below is a basic overview of the project structure:

```
├── .github/workflows/ci.yaml -> Github Action configuration
├── src
│   ├── commands.js           -> JSON payloads for commands
│   ├── langbase.ts             -> Interactions with the Langbase API
│   ├── discord.ts             -> Discord fns and types
│   ├── register.js           -> Sets up commands with the Discord API
│   ├── unregister.js           -> Deletes commands with the Discord API
│   ├── server.ts             -> Discord bot logic and routing
├── wrangler.toml             -> Configuration for Cloudflare workers
├── package.json
├── README.md
├── .eslintrc.json
├── .prettierignore
├── .prettierrc.json
└── .gitignore
```

## Configuring project

Before starting, you'll need a [Discord app](https://discord.com/developers/applications) with the following permissions:

- `bot` with the `Send Messages` and `Use Slash Command` permissions
- `applications.commands` scope

> ⚙️ Permissions can be configured by clicking on the `OAuth2` tab and using the `URL Generator`. After a URL is generated, you can install the app by pasting that URL into your browser and following the installation flow.

## Creating your Cloudflare worker

Next, you'll need to create a Cloudflare Worker.

- Visit the [Cloudflare dashboard](https://dash.cloudflare.com/)
- Click on the `Workers` tab, and create a new service using the same name as your Discord bot

## Running locally

1. First clone this project. Download this ai-discord-bot example folder from [here][download] or clone the repository.

2. Then navigate to its directory and install dependencies:

```sh
cd ai-discord-bot
npm install
```

> ⚙️ The dependencies in this project require at least v18 of [Node.js](https://nodejs.org/en/)

### Local configuration

Rename `example.dev.vars` to `.dev.vars`, and make sure to set each variable.

**`.dev.vars` contains sensitive data so make sure it does not get checked into git**.

### Register commands

You have to register your commands with the Discord API. You can either register your command globally or per guild. These scripts only need to be run once, and are run through the command line.

#### 1. Global

Registering a command globally makes it available to all discord servers on the internet. It takes up to an hour for the command to be available on all servers. It is not recommended to register a command globally during development.

```sh
DISCORD_TOKEN=**** DISCORD_APPLICATION_ID=**** node src/register.js global
```

Add your Discord token and application ID to the command above.

#### 2. Guild

Registering a command per guild makes it available only to the server where the command is registered. Guild ID is essentially your server's ID. There is no delay in registering a command per guild. This is recommended during development as well as when you want to create a bot for your own server.

```sh
DISCORD_TOKEN=**** DISCORD_APPLICATION_ID=**** DISCORD_GUILD_ID=**** node src/register.js guild
```

Add your Discord token, application ID, and guild ID to the command above.

### Run the server

Now you should be ready to start your server:

```sh
npm start
```

### Setting up ngrok

When a user types a slash command, Discord will send an HTTP request to a given endpoint. During local development this can be a little challenging, so we're going to use a tool called `ngrok` to create an HTTP tunnel.

```
$ npm run ngrok
```

![forwarding](https://user-images.githubusercontent.com/534619/157511497-19c8cef7-c349-40ec-a9d3-4bc0147909b0.png)

This is going to bounce requests off of an external endpoint, and forward them to your machine. Copy the HTTPS link provided by the tool. It should look something like `https://8098-24-22-245-250.ngrok.io`. Now head back to the Discord Developer Dashboard, and update the "Interactions Endpoint URL" for your bot:

![interactions-endpoint](https://user-images.githubusercontent.com/534619/157510959-6cf0327a-052a-432c-855b-c662824f15ce.png)

This is the process we'll use for local testing and development. When you've published your bot to Cloudflare, you will _want to update this field to use your Cloudflare Worker URL._

## Deploying app

Once you are done developing, deploy this worker to your Cloudflare Dashboard. To deploy, you can run `npm run publish`, which uses the `wrangler publish` command under the hood.

Consult the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers) for more information on deploying and managing your worker.

### Storing secrets

The credentials in `.dev.vars` are only applied locally. After publishing your worker, you have to set them for your deployed worker.

You can set these secrets using the `wrangler secret` command:

```sh
wrangler secret put DISCORD_TOKEN
wrangler secret put DISCORD_PUBLIC_KEY
wrangler secret put DISCORD_APPLICATION_ID
wrangler secret put DISCORD_GUILD_ID
wrangler secret put LANGBASE_PIPE_KEY
```
