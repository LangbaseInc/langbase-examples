import { Langbase, Message } from 'langbase';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const runtime = 'edge';

export async function POST(req: Request) {
	const { messages } = await req.json();

	try {
		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const userMessage = messages[messages.length - 1];
		const therapeuticDecision = await getTherapeuticDecision(userMessage.content);

		const therapeuticResponse: undefined | { stream: ReadableStream } =
			await getTherapeuticResponse({
				messages,
				therapeuticDecision,
			});

		if (!therapeuticResponse || !therapeuticResponse.stream) {
			return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(therapeuticResponse.stream, {
			status: 200,
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return new Response(
			JSON.stringify({ error: 'Something went wrong. Please try again later.' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}

/**
 * Analyzes user input to determine the most appropriate therapeutic approach.
 *
 * This function uses the Langbase agent with GPT-4.1-mini to categorize user input into specific
 * therapeutic categories such as crisis, anxiety, depression, etc. It provides structured
 * analysis including confidence level, reasoning, urgency level, and key concerns.
 *
 * @param {string} input - The user's message or input to be analyzed
 * @returns {Promise<{
 *   category: 'crisis' | 'anxiety' | 'depression' | 'cognitive' | 'relationship' | 'exploratory' | 'general',
 *   confidence: number,
 *   reasoning: string,
 *   urgency_level: 'low' | 'medium' | 'high' | 'crisis',
 *   key_concerns: string[]
 * }>} A promise resolving to the therapeutic decision object
 * @throws {Error} If the analysis fails for any reason
 */
async function getTherapeuticDecision(input: string) {
	try {
		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		const therapeuticDecisionSchema = z.object({
			category: z.enum([
				'crisis',
				'anxiety',
				'depression',
				'cognitive',
				'relationship',
				'exploratory',
				'general',
			]),
			confidence: z.number(),
			reasoning: z.string(),
			urgency_level: z.enum(['low', 'medium', 'high', 'crisis']),
			key_concerns: z.array(z.string()),
		});

		// Convert zod schema to json schema
		const decisionSchema = zodToJsonSchema(therapeuticDecisionSchema, { target: 'openAi' });

		const { output } = await langbase.agent.run({
			model: 'openai:gpt-4.1-mini',
			apiKey: process.env.OPENAI_API_KEY!!,
			instructions: `You are an AI therapist analyzing user input to determine the best therapeutic approach.

          Analyze the input and categorize it into one of these therapeutic approaches:
          - "crisis" - mentions of self-harm, suicide, or immediate danger
          - "anxiety" - primary concern is anxiety, worry, panic, or stress
          - "depression" - primary concern is sadness, hopelessness, low mood, or depression
          - "cognitive" - negative thought patterns, rumination, or cognitive distortions
          - "relationship" - concerns about relationships, social issues, or interpersonal problems
          - "exploratory" - need to explore feelings, gain insight, or process experiences
          - "general" - general support, wellness, or unclear concerns

          Provide your analysis with confidence level (0-100), reasoning for your decision, urgency level, and key concerns identified.`,
			input: input,
			stream: false,
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: 'TherapeuticDecision',
					schema: decisionSchema,
					strict: true,
				},
			},
		});

		// Parse the structured output
		const parsedDecision = therapeuticDecisionSchema.parse(JSON.parse(output));
		return parsedDecision;
	} catch (error) {
		console.error('Error in therapeutic decision analysis:', error);
		throw new Error('Failed to analyze therapeutic decision');
	}
}

/**
 * Generates a therapeutic response based on a structured decision about the user's mental health concerns.
 *
 * This function uses the Langbase API to route the user's messages to specialized therapeutic agents
 * based on the category identified in the therapeutic decision. Each agent is configured with specific
 * instructions tailored to address different mental health concerns such as crisis intervention,
 * anxiety management, depression support, cognitive behavioral therapy, relationship counseling,
 * exploratory therapy, or general therapeutic support.
 *
 * @param {Object} params - The parameters for generating a therapeutic response
 * @param {Object} params.therapeuticDecision - The structured analysis of the user's mental health concern
 * @param {('crisis'|'anxiety'|'depression'|'cognitive'|'relationship'|'exploratory'|'general')} params.therapeuticDecision.category - The category of therapeutic approach needed
 * @param {number} params.therapeuticDecision.confidence - The confidence level of the category determination
 * @param {string} params.therapeuticDecision.reasoning - The reasoning behind the therapeutic decision
 * @param {('crisis'|'low'|'medium'|'high')} params.therapeuticDecision.urgency_level - The urgency level of the user's concern
 * @param {string[]} params.therapeuticDecision.key_concerns - Array of identified key concerns from the user's messages
 * @param {Message[]} params.messages - The conversation history between the user and the therapeutic system
 *
 * @returns {Promise<any>} A streaming response from the appropriate therapeutic agent
 * @throws {Error} If the therapeutic response generation fails
 */
async function getTherapeuticResponse({
	therapeuticDecision,
	messages,
}: {
	therapeuticDecision: {
		category:
			| 'crisis'
			| 'anxiety'
			| 'depression'
			| 'cognitive'
			| 'relationship'
			| 'exploratory'
			| 'general';
		confidence: number;
		reasoning: string;
		urgency_level: 'crisis' | 'low' | 'medium' | 'high';
		key_concerns: string[];
	};
	messages: Message[];
}) {
	try {
		const langbase = new Langbase({
			apiKey: process.env.LANGBASE_API_KEY!,
		});

		// Step 2: Route to appropriate therapeutic response based on structured decision
		let therapeuticResponse;

		switch (therapeuticDecision.category) {
			case 'crisis':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!!,
					instructions: `You are providing crisis support. The analysis shows urgency level: ${
						therapeuticDecision.urgency_level
					} and key concerns: ${therapeuticDecision.key_concerns.join(', ')}.

              Prioritize safety and provide:
              1. Immediate validation and support
              2. Crisis resources and hotlines (988 Suicide & Crisis Lifeline, Crisis Text Line: 741741)
              3. Safety planning and assessment
              4. Grounding techniques for immediate relief
              5. Encouragement to seek professional help immediately
              6. Follow-up questions about their immediate safety

              Be warm, non-judgmental, and focus on their immediate safety and wellbeing. This is a high-priority situation.`,
					input: messages,
					stream: true,
				});
				break;

			case 'anxiety':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing anxiety-focused therapy. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with confidence: ${therapeuticDecision.confidence}%.

              Include:
              1. Validation of their anxiety experience
              2. Mindfulness and grounding techniques (5-4-3-2-1 sensory method, box breathing)
              3. Progressive muscle relaxation guidance
              4. Anxiety management strategies specific to their concerns
              5. Cognitive techniques for worry thoughts
              6. Daily practices for anxiety reduction
              7. Questions about their anxiety triggers and patterns

              Provide step-by-step instructions for immediate relief techniques. Be gentle and understanding.`,
					input: messages,
					stream: true,
				});
				break;

			case 'depression':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing depression-focused therapy. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with urgency: ${therapeuticDecision.urgency_level}.

              Include:
              1. Warm validation of their struggles and courage in reaching out
              2. Behavioral activation techniques
              3. Activity scheduling and pleasant activity planning
              4. Self-compassion practices
              5. Mood tracking suggestions
              6. Small, achievable daily goals
              7. Social connection encouragement
              8. Questions about their daily routine and support system

              Focus on gentle, achievable steps and building momentum. Be especially warm and encouraging.`,
					input: messages,
					stream: true,
				});
				break;

			case 'cognitive':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing CBT-focused therapy. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with reasoning: ${therapeuticDecision.reasoning}.

              Include:
              1. Identification of negative thought patterns mentioned
              2. Thought challenging exercises with specific questions
              3. Cognitive restructuring techniques
              4. Evidence examination methods
              5. Balanced thinking development
              6. Thought record guidance
              7. Questions to help them examine their thinking patterns

              Provide concrete CBT tools and walk them through the process step-by-step. Help them see their thoughts objectively.`,
					input: messages,
					stream: true,
				});
				break;

			case 'relationship':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing relationship-focused therapy. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with confidence: ${therapeuticDecision.confidence}%.

              Include:
              1. Validation of their relationship concerns
              2. Communication skills and techniques
              3. Boundary setting guidance
              4. Conflict resolution strategies
              5. Emotional regulation in relationships
              6. Self-reflection on relationship patterns
              7. Questions about their relationship dynamics and needs

              Focus on healthy relationship skills and self-awareness. Help them understand relationship patterns.`,
					input: messages,
					stream: true,
				});
				break;

			case 'exploratory':
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing exploratory therapy. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with reasoning: ${therapeuticDecision.reasoning}.

              Include:
              1. Deep validation and reflection of their experience
              2. Open-ended questions to explore feelings and thoughts
              3. Pattern identification in their life and relationships
              4. Insight-oriented discussions
              5. Emotional processing techniques
              6. Journaling and self-reflection suggestions
              7. Thoughtful questions that promote self-discovery

              Focus on helping them gain deeper understanding of themselves and their experiences. Be curious and supportive.`,
					input: messages,
					stream: true,
				});
				break;

			default: // "general" or any other case
				therapeuticResponse = await langbase.agent.run({
					model: 'openai:gpt-4.1-mini',
					apiKey: process.env.OPENAI_API_KEY!,
					instructions: `You are providing general therapeutic support. The analysis shows key concerns: ${therapeuticDecision.key_concerns.join(
						', '
					)} with urgency: ${therapeuticDecision.urgency_level}.

              Include:
              1. Warm acknowledgment and validation
              2. Assessment of their current needs and concerns
              3. Mix of coping strategies (mindfulness, cognitive, behavioral)
              4. General wellness and self-care guidance
              5. Stress management techniques
              6. Daily mental health practices
              7. Open-ended questions to better understand their needs

              Provide comprehensive support while assessing what specific help they might need. Be welcoming and supportive.`,
					input: messages,
					stream: true,
				});
				break;
		}

		return therapeuticResponse;
	} catch (error) {
		console.error('Error in therapeutic response generation:', error);
		throw new Error('Failed to generate therapeutic response');
	}
}
