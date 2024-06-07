export const DEFAULT_CONTENT = `# Concepts

Pipe is the fastest way to turn ideas into AI. Pipe is like an AI feature. It is a high-level layer to Large Language Models (LLMs) that creates a personalized AI assistant for your queries.

Let's understand the key concepts of Pipe:

---

## Meta

The Pipe meta defines its configuration. It contains the following information:

### Type

The type of Pipe, i.e., \`generate\` or \`chat\`. The type of Pipe determines the behavior of the Pipe. For example:

-   Generate Pipe is designed to [generate](/features/generate) LLM completions.
-   Chat Pipe is designed to create a [conversational](/features/chat) AI assistants.

### Stream mode

Handles whether the Pipe should [stream](/features/stream) the response or not. If enabled, the Pipe will stream the response in real-time.

### Store messages

Pipe can store both prompts and their completions if the [Store messages](/features/store-messages) in Pipe meta is enabled on. Otherwise, only [system prompts](/features/prompt) and [few-shot messages](/features/few-shot-training) will be saved. No completions, final prompts or variables will be retained to ensure privacy.

### Moderate

Available only for OpenAI models. [Moderation](/features/moderation) endpoint by OpenAI identifies harmful content. If enabled, Langbase blocks flagged requests automatically.

### JSON

Enforces the completion to be in [JSON format](/features/json-mode). If enabled, the completion will be in JSON format.

---

## Variables

Any text written between \`{{}}\` in your prompt instructions acts as a [variable](/features/variables) to which you can assign different values using the variable section. Variables will appear once you add them using \`{{variableName}}\`.

On runtime, these [variable](/features/variables) will dynamically populate with the assigned values during execution

---

## Safety

Define AI [safety](/features/safety) prompt for any LLM inside a Pipe. For instance, do not answer questions outside of the given context.

One of its use cases can be to ensure the LLM does not provide any sensitive information in its response from the provided context.

---

## Experiments

They help you learn how your latest Pipe config will affect LLM response by running it against your previous \`generate\` requests.

One example of [Experiments](/features/experiments) can be changing Pipe's LLM model to \`gemma-7b-it\` from \`gpt-4-turbo-preview\` to check how the response will look like.

---

## Few-shot training

It helps AI LLM pick up and apply knowledge from just a handful of examples.

Pipe lets you define multiple user and AI assistant prompts and completion pairs that can be used to [few-shot train](/features/few-shot-training) any LLM.

---

## Pipe level keysets

Pipe LLM keyset is specific to each individual pipe. When selected, the Pipe doesn't use the user/org LLM API keys but instead use the Pipe level [keyset](/features/keysets) added to it in its settings.
`;
