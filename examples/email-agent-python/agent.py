import os
import json
import asyncio
import aiohttp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables
API_KEY = os.getenv('LANGBASE_API_KEY')
API_URL = 'https://api.langbase.com/v1/pipes/run'

# Run Langbase pipe
async def run_langbase_pipe(session, pipe_name, variables):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}'
    }

    body_data = {
        'name': pipe_name,
        'messages': [],
        'variables': variables,
        'stream': False
    }

    async with session.post(API_URL, headers=headers, json=body_data) as response:
        response.raise_for_status()
        return await response.json()

# Email sentiment analysis
async def get_email_sentiment(session, email):
    variables = [
        {
            'name': 'email',
            'value': email
        }
    ]

    response = await run_langbase_pipe(session, 'email-sentiment', variables)
    completion = json.loads(response['completion'])
    return completion.get('sentiment', 'neutral')

# Summarize email
async def get_email_summary(session, email):
    variables = [
        {
            'name': 'content',
            'value': email
        }
    ]

    response = await run_langbase_pipe(session, 'email-summarizer', variables)
    completion = json.loads(response['completion'])
    return completion.get('summary', '')

# Check if email needs a response
async def should_respond_to_email(session, summary, sentiment):
    variables = [
        {
            'name': 'summary',
            'value': summary
        },
        {
            'name': 'sentiment',
            'value': sentiment
        }
    ]

    response = await run_langbase_pipe(session, 'email-decision-maker', variables)
    completion = json.loads(response['completion'])
    return completion.get('respond', True)

# Pick email writer based on sentiment and summary
async def pick_email_writer(session, summary, sentiment):
    variables = [
        {
            'name': 'summary',
            'value': summary
        },
        {
            'name': 'sentiment',
            'value': sentiment
        }
    ]

    response = await run_langbase_pipe(session, 'pick-email-writer', variables)
    completion = json.loads(response['completion'])
    return completion.get('tone', 'professional')

# Generate email response
async def generate_email_response(session, writer, summary):
    variables = [
        {
            'name': 'writer',
            'value': writer
        },
        {
            'name': 'user_email_summary',
            'value': summary
        }
    ]

    response = await run_langbase_pipe(session, 'email-writer', variables)
    return response['completion']

def log_result(key, value):
    """Log results with formatting."""
    print(key, value)
    print('=============================')

# Run email agent
async def run_email_agent(email):
    log_result('Email:', email)

    try:
        async with aiohttp.ClientSession() as session:
            # Run sentiment and summary analysis in parallel
            sentiment, summary = await asyncio.gather(
                get_email_sentiment(session, email),
                get_email_summary(session, email)
            )

            log_result('Sentiment:', sentiment)
            log_result('Summary:', summary)

            respond = await should_respond_to_email(session, summary, sentiment)
            log_result('Respond:', str(respond))

            if not respond:
                return 'No response needed for this email.'

            writer = await pick_email_writer(session, summary, sentiment)
            log_result('Writer:', writer)

            email_response = await generate_email_response(session, writer, summary)
            return email_response

    except Exception as e:
        return f"Error processing email: {str(e)}"

async def main():
    if not API_KEY:
        print("Error: LANGBASE_API_KEY not found in environment variables")
        return

    # Test emails
    user_email = "I'm really disappointed with the service I received yesterday. The product was faulty and customer support was unhelpful."
    spam_email = "Congratulations! You have been selected as the winner of a $100 million lottery!"

    # Run email agent
    response = await run_email_agent(user_email)
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
