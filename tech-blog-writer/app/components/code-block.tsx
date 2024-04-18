'use client';

import { FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
	language: string;
	value: string;
}

interface languageMap {
	[key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
	javascript: '.js',
	python: '.py',
	java: '.java',
	c: '.c',
	cpp: '.cpp',
	'c++': '.cpp',
	'c#': '.cs',
	ruby: '.rb',
	php: '.php',
	swift: '.swift',
	'objective-c': '.m',
	kotlin: '.kt',
	typescript: '.ts',
	go: '.go',
	perl: '.pl',
	rust: '.rs',
	scala: '.scala',
	haskell: '.hs',
	lua: '.lua',
	shell: '.sh',
	sql: '.sql',
	html: '.html',
	css: '.css',
	// Can add more file extensions here, ensure the key is same as language prop in CodeBlock component
};

export const generateRandomString = (length: number, lowercase = false) => {
	const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
	return (
		<div className="codeblock relative w-full font-sans">
			<div className='flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-primary'>
				<span className='text-xs lowercase'>{language}</span>
			</div>
			<SyntaxHighlighter
				language={language}
				style={shadesOfPurple}
				PreTag='div'
				showLineNumbers
				customStyle={{
					margin: 0,
					width: '100%',
					overflow: 'auto',
					background: '#2D2B55',
					padding: '1.5rem 1rem',
				}}
				lineNumberStyle={{
					userSelect: 'none',
				}}
				codeTagProps={{
					style: {
						fontSize: '0.9rem',
						fontFamily: 'var(--font-mono)',
					},
				}}
			>
				{value}
			</SyntaxHighlighter>
		</div>
	);
});
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
