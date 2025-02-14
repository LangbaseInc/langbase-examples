import { getRunner } from 'langbase';
import {
	emailResponseAgent,
	emailSentimentAgent,
	emailSummaryAgent,
	pickEmailWriterAgent,
	shouldRespondToEmailAgent
} from './agents';
import { stdout } from 'process';

const workflow = async (emailContent: string) => {
	console.log('Email:', emailContent);

	const [emailSentiment, emailSummary] = await Promise.all([
		emailSentimentAgent(emailContent),
		emailSummaryAgent(emailContent)
	]);
	console.log('Sentiment:', emailSentiment);
	console.log('Summary:', emailSummary);

	const respond = await shouldRespondToEmailAgent(
		emailSummary,
		emailSentiment
	);
	console.log('Respond:', respond);

	if (!respond) {
		return 'No response needed for this email.';
	}

	const writer = await pickEmailWriterAgent(emailSummary, emailSentiment);
	console.log('Writer:', writer);

	const emailStream = await emailResponseAgent(writer, emailSummary);

	const runner = getRunner(emailStream);
	runner.on('content', (content: string) => {
		stdout.write(content);
	});
};

const userEmail = `I'm really disappointed with the service I received yesterday. The product was faulty and customer support was unhelpful.`;
const spamEmail = `Congratulations! You have been selected as the winner of a $100 million lottery!`;

workflow(userEmail);
