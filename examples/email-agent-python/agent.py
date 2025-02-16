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
async def email_sentiment_agent(session, email):
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
async def email_summary_agent(session, email):
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
async def should_respond_to_email_agent(session, summary, sentiment):
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
async def pick_email_writer_agent(session, summary, sentiment):
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
async def email_response_agent(session, writer, summary):
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

# Run email agent
async def workflow(emailContent):
    print('Email:', emailContent)

    try:
        async with aiohttp.ClientSession() as session:
            # Run sentiment and summary analysis in parallel
            emailSentiment, emailSummary = await asyncio.gather(
                email_sentiment_agent(session, emailContent),
                email_summary_agent(session, emailContent)
            )

            print('Sentiment:', emailSentiment)
            print('Summary:', emailSummary)

            respond = await should_respond_to_email_agent(session, emailSummary, emailSentiment)
            print('Respond:', str(respond))

            if not respond:
                print('No response needed for this email.')
                return

            writer = await pick_email_writer_agent(session, emailSummary, emailSentiment)
            print('Writer:', writer)

            email_response = await email_response_agent(session, writer, emailSummary)
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
    response = await workflow(user_email)
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
