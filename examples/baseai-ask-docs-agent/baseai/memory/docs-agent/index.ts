import { MemoryI } from '@baseai/core';
import path from 'path';

const memoryDocsAgent = (): MemoryI => ({
  name: 'docs-agent',
  description: 'ask-your-docs-pdf-txt',
  config: {
		useGitRepo: false,
		dirToTrack: path.posix.join('.'),
		extToTrack: ["*"]
  }
});

export default memoryDocsAgent;
