# Memory Agents: Agentic RAG in TypeScript

A Retrieval-Augmented Generation (RAG) system built with TypeScript and Langbase. This project demonstrates how to create a memory-based agent that can answer questions based on uploaded documents.

## How It Works

- Memory Creation: Create a memory instance to store your documents.
- Data Upload: Upload documents to the memory.
- Retrieval: When a query is received, the system retrieves relevant chunks from the memory.
- Agent Processing: The agent uses these chunks as context to generate a response.
- Response Generation: The final response is generated using the retrieved context and the original query.

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- A Langbase API key

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the `.env.example` file to `.env` and add your Langbase API key:
```bash
cp .env.example .env
```
1. Update the `.env` file with your Langbase API key

## Workflow

The RAG Memory Agent works in the following sequence:

### 1. Create Memory

First, create a memory instance to store your documents:

```bash
npx tsx agent/memory-create.ts
```

This creates a memory called "rag-knowledge-base" that will store your documents.

### 2. Upload Data

Upload documents to the memory (supports PDF and markdown files):

```bash
npx tsx agent/upload.ts
```

The script uploads the documents from the data directory to the memory.

### 3. Test Retrieval

Test the memory by retrieving information:

```bash
npx tsx agent/memory-retrieve.ts
```

This retrieves relevant chunks from the memory based on a query.

### 4. Create Agent

Create an agent that can answer questions using the memory:

```bash
npx tsx agent/agent-create.ts
```

This creates an agent called "rag-memory-agent" that can process user queries.

### 5. Run RAG

Run the Retrieval-Augmented Generation system:

```bash
npx tsx agent/rag.ts
```

This triggers the full RAG workflow:
1. User query is processed
2. Relevant context is retrieved from memory
3. The agent generates a response based on the context and query

## Project Structure
```
.
├── agent/                  # Agent-related scripts
│   ├── agent-create.ts     # Creates the agent
│   ├── memory-create.ts    # Creates memory storage
│   ├── memory-retrieve.ts  # Tests memory retrieval
│   ├── rag.ts              # Runs the full RAG pipeline
│   └── upload.ts           # Uploads documents to memory
├── data/                   # Data files
│   └── notes.md            # Sample markdown document
│   └── doc.pdf             # Sample blog page saved as PDF
├── .env                    # Environment variables
├── .env.example            # Example environment variables
├── package.json            # Project dependencies
└── README.md               # This file
```

## Further Reading

- [Langbase Documentation](https://langbase.com/docs)
- [Langbase Memory Agents](https://langbase.com/docs/memory)
- [Langbase SDK](https://langbase.com/docs/sdk)
- [Langbase API Reference](https://langbase.com/docs/api-reference)

## License
MIT - Copyright (c) Langbase, Ahmad Awais.
