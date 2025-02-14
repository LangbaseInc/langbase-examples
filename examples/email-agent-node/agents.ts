import { Langbase } from 'langbase';
import 'dotenv/config';

const langbase = new Langbase({ apiKey: process.env.LANGBASE_API_KEY! });

// Sentiment analysis
export const emailSentimentAgent = async (emailContent: string) => {
	const response = await langbase.pipe.run({
		stream: false,
		name: 'email-sentiment',
		messages: [
			{
				role: 'system',
				content: `You are a sentiment analyzer.
					You will analyze user email sentiment.
					Respond in JSON with "sentiment" key
					Pick from happy | frustrated | neutral | sad`
			},
			{
				role: 'user',
				content: emailContent
			}
		]
	});

	const completion = JSON.parse(response.completion);
	return completion.sentiment;
};

// Summarize email
export const emailSummaryAgent = async (emailContent: string) => {
	const response = await langbase.pipe.run({
		stream: false,
		name: 'email-summarizer',
		messages: [
			{
				role: 'system',
				content: `You are a content summarizer. You will summarize content
				without loosing context into less wordy to the point version.`
			},
			{
				role: 'user',
				content: emailContent
			}
		]
	});

	const completion = JSON.parse(response.completion);
	return completion.summary;
};

// Determine if a response is needed
export const shouldRespondToEmailAgent = async (
	summary: string,
	sentiment: string
) => {
	const response = await langbase.pipe.run({
		stream: false,
		name: 'email-decision-maker',
		messages: [
			{
				role: 'system',
				content: `You are a decision maker that analyzes and decides if the given email requires a response or not.
					Make sure to check if the email is spam or not. If the email is spam, then it does not need a response.
					If it requires a response, based on the email urgency, decide the response date. Also define the response priority.

					Use following keys and values accordingly
					- respond: true | false
					- category: primary | spam
					- priority: urgent | high | medium | low`
			},
			{
				role: 'user',
				content: `Email Summary: ${summary}
						Email sentiment: ${sentiment}`
			}
		]
	});

	const completion = JSON.parse(response.completion);
	return completion.respond;
};

//  Pick an email writer
export const pickEmailWriterAgent = async (
	summary: string,
	sentiment: string
) => {
	const response = await langbase.pipe.run({
		stream: false,
		name: 'pick-email-writer',
		messages: [
			{
				role: 'system',
				content: `You are an email tone picker that analyzes the input
					and picks up the response email tone.
					Pick from: professional | formal | informal | casual | friendly`
			},
			{
				role: 'user',
				content: `Email Summary: ${summary}
						Email sentiment: ${sentiment}`
			}
		]
	});

	const completion = JSON.parse(response.completion);
	return completion.tone;
};

// Generate an email reply
export const emailResponseAgent = async (writer: string, summary: string) => {
	const { stream } = await langbase.pipe.run({
		stream: true,
		name: 'email-writer',
		messages: [
			{
				role: 'system',
				content: `You are an email writer that writes a concise
				to the point well written email as a reply to a user email.`
			},
			{
				role: 'user',
				content: `Write a response using the following information:
						 Email tone: ${writer}
						 User email: ${summary}`
			}
		]
	});
	return stream;
};
