'use client';

import { useState } from 'react';
import { generateCompletion } from './actions';

export default function Home() {
	const [topic, setTopic] = useState('');
	const [completion, setCompletion] = useState('');
	const [loading, setLoading] = useState(false);

	const handleGenerateCompletion = async () => {
		setLoading(true);
		const completion = await generateCompletion(topic);
		setCompletion(completion);
		setLoading(false);
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='flex flex-col items-center gap-y-4'>
				<h1 className='text-4xl font-bold'>Generate Text Completions</h1>
				<p className='text-lg mt-4'>
					Enter a topic and we'll generate a text completion for you.
				</p>
				<input
					type='text'
					placeholder='Enter a topic'
					className='border border-gray-300 rounded-lg text-sm p-2 mt-4 text-black'
					value={topic}
					onChange={e => setTopic(e.target.value)}
				/>
				<button
					className='bg-slate-600 border border-white text-white rounded-lg p-2 mt-4'
					onClick={handleGenerateCompletion}
				>
					Generate titles
				</button>
				{loading && <p className='mt-4'>Loading...</p>}
				{completion && (
					<>
						<h2 className='mt-4'>
							<strong>Completion ↓</strong>
						</h2>
						<p>{completion}</p>
					</>
				)}
			</div>
		</main>
	);
}
