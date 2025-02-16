# Composable Email Agent

An AI-powered composable email agent built in Python 3 that analyzes emails and generates appropriate responses using the following agent architectures:

-   Parallelization with async/await
-   Prompt chaining

## Prerequisites

-   Python 3.7 or higher (async/await support required)
-   pip3 (Python 3 package installer)

## Features

-   📧 Email Analysis
    -   Sentiment Analysis - Determines the emotional tone of incoming emails
    -   Email Summarization - Creates concise summaries of email content
    -   Response Decision Making - Intelligently decides if an email needs a response
-   ✍️ Smart Response Generation
    -   Writer Style Selection - Picks appropriate tone and style for replies
    -   Contextual Response Generation - Creates relevant, context-aware email responses
-   ⚡️ Asynchronous Processing - Parallel execution of independent tasks
-   🔌 Easy Integration - Built with the Langbase API

## Get started

Let's get started with the project:

To get started with Langbase, you'll need to [create a free personal account on Langbase.com][signup] and verify your email address. _Done? Cool, cool!_

1. Fork the following pipes on ⌘ Langbase:

    1. [Email Sentiment][email-sentiment]
    2. [Summarizer][summarizer]
    3. [Email Decision Maker][decision-maker]
    4. [Pick Email Writer][pick-email-writer]
    5. [Email Writer][email-writer]

2. Download and setup the project

The following command

1. Downloads the example project folder from [here][download]
2. Renames the folder to `example-composable-email-agent-python`
3. Changes the directory to the project folder
4. Copies the `.env.example` file to `.env` in the project folder

```sh
npx degit LangbaseInc/langbase-examples/examples/email-agent-python example-composable-email-agent-python
cd example-composable-email-agent-python
cp .env.example .env
```

1. Create virtual environment:

Open a terminal and run the following commands:

```sh
# Create a virtual environment
python3 -m venv ./venv

# Activate the virtual environment
source ./venv/bin/activate
```

4. Install the required packages:

```sh
pip3 install python-dotenv aiohttp
```

5. Add the values of these environment variables to the `.env` file:

```sh
# Get your org or user API key that can be used to access everything with Langbase.
# https://langbase.com/docs/api-reference/api-keys
LANGBASE_API_KEY="USER_OR_ORG_API_KEY"
```

6. Run the email agent:

```sh
python3 agent.py
```

## How it works

The agent uses several components in sequence:

1. **Parallel Analysis**: Concurrently performs sentiment analysis and email summarization using `asyncio.gather()`
2. **Decision Making**: Determines if the email requires a response
3. **Style Selection**: Chooses appropriate tone for the response
4. **Response Generation**: Creates a contextual email response

## Project Structure

```
email-agent-python/
├── .env.example   # Environment variables example
├── .gitignore     # Git ignore
├── agent.py       # Email agent implementation
└── README.md      # Project documentation
```

[signup]: https://langbase.com/signup
[email-sentiment]: https://langbase.com/examples/email-sentiment
[summarizer]: https://langbase.com/examples/summarizer
[decision-maker]: https://langbase.com/examples/decision-maker
[pick-email-writer]: https://langbase.com/examples/pick-email-writer
[email-writer]: https://langbase.com/examples/email-writer
[download]: https://download-directory.github.io/?url=https://github.com/LangbaseInc/langbase-examples/tree/main/examples/email-agent-python
