import 'dotenv/config';
import {readFileSync} from 'fs';

import {Langbase} from 'langbase';

const langbase = new Langbase({
	apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
	const dataPath = process.cwd() + '/data/doc.pdf';
	// const dataPath = process.cwd() + '/data/notes.md';
	console.log('✨ ~ dataPath:', dataPath);

	/**
	 * Uploads a PDF document to the memory in langbase.
	 *
	 * @param {Object} options - The upload options
	 * @param {string} options.memoryName - The name of the memory to upload to ('knowledge-base')
	 * @param {string} options.contentType - The content type of the document ('application/pdf')
	 * @param {string} options.documentName - The name to give the document ('doc.pdf')
	 * @param {Buffer} options.document - The document data from the file system
	 * @param {Object} options.meta - Metadata associated with the document
	 * @param {string} options.meta.category - The category of the document ('blog')
	 * @param {string} options.meta.section - The section the document belongs to ('homepage')
	 *
	 * @returns {Promise<boolean>} A promise that resolves to true if the document was uploaded successfully
	 */
	const hasDocumentUploaded = await langbase.memories.documents.upload({
		memoryName: 'rag-knowledge-base',
		// contentType: 'application/pdf',
		contentType: 'text/markdown',
		documentName: 'doc.pdf',
		// documentName: 'notes.md',
		document: readFileSync(dataPath),
		meta: {
			category: 'blog',
			// category: 'notes',
		},
	});

	if (hasDocumentUploaded.ok) {
		console.log('Document uploaded successfully');
	}
}

main();
