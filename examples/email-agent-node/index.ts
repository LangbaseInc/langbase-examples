import dotenv from 'dotenv';
import { getRunner, Langbase } from 'langbase';
import { stdout } from 'process';

dotenv.config();

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!
});

async function main() {
	// Sentiment analysis
	const getEmailSentiment = async (email: string) => {
		const response = await langbase.pipe.run({
			name: 'email-sentiment',
			stream: false,
			messages: [],
			variables: [
				{
					name: 'email',
					value: email
				}
			]
		});

		// Parse JSON because we're expecting a JSON response
		const completion = JSON.parse(response.completion);
		return completion.sentiment;
	};

	// Summarize email
	const getEmailSummary = async (email: string) => {
		const response = await langbase.pipe.run({
			name: 'summarizer',
			stream: false,
			messages: [],
			variables: [
				{
					name: 'content',
					value: email
				}
			]
		});

		// Parse JSON because we're expecting a JSON response
		const completion = JSON.parse(response.completion);
		return completion.summary;
	};

	// Determine if a response is needed
	const shouldRespondToEmail = async (summary: string, sentiment: string) => {
		const response = await langbase.pipe.run({
			name: 'decision-maker',
			messages: [],
			variables: [
				{
					name: 'summary',
					value: summary
				},
				{
					name: 'sentiment',
					value: sentiment
				}
			],
			stream: false
		});

		// Parse JSON because we're expecting a JSON response
		const completion = JSON.parse(response.completion);
		return completion.respond;
	};

	// Pick an email writer
	const pickEmailWriter = async (summary: string, sentiment: string) => {
		const response = await langbase.pipe.run({
			name: 'pick-email-writer',
			messages: [],
			variables: [
				{
					name: 'summary',
					value: summary
				},
				{
					name: 'sentiment',
					value: sentiment
				}
			],
			stream: false
		});

		// Parse JSON because we're expecting a JSON response
		const completion = JSON.parse(response.completion);
		return completion.tone;
	};

	// Generate an email reply
	const generateEmailResponse = async (writer: string, summary: string) => {
		const { stream } = await langbase.pipe.run({
			name: 'email-writer',
			stream: true,
			messages: [],
			variables: [
				{
					name: 'writer',
					value: writer
				},
				{
					name: 'user_email_summary',
					value: summary
				}
			]
		});
		return stream;
	};

	const logResult = (key: string, value: string) => {
		console.log(key, value);
		console.log('=============================');
	};

	// Email agent
	const runEmailAgent = async (email: string) => {
		logResult('Email:', email);

		const [sentiment, summary] = await Promise.all([
			getEmailSentiment(email),
			getEmailSummary(email)
		]);
		logResult('Sentiment:', sentiment);
		logResult('Summary:', summary);

		const respond = await shouldRespondToEmail(summary, sentiment);
		logResult('Respond:', respond);

		if (!respond) {
			return 'No response needed for this email.';
		}

		const writer = await pickEmailWriter(summary, sentiment);
		logResult('Writer:', writer);

		const emailStream = await generateEmailResponse(writer, summary);

		const stream = getRunner(emailStream);
		let emailResponse = '';

		for await (const chunk of stream) {
			const content = chunk?.choices[0]?.delta?.content || '';

			// Stream response
			stdout.write(content);

			if (content) {
				emailResponse += content;
			}
		}
		return emailResponse;
	};

	// User email
	const userEmail = `I'm really disappointed with the service I received yesterday. The product was faulty and customer support was unhelpful.`;
	const spamEmail = `Congratulations! You have been selected as the winner of a $100 million lottery!`;

	const response = await runEmailAgent(userEmail);
	// console.log(response);
}

main();
