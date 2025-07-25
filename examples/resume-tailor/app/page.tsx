'use client';

import ResumeConfig from '@/components/config';
import Hero from '@/components/hero';

export const runtime = 'edge';

export default function Home() {
	return (
		<main className='min-h-screen bg-black p-4 pb-32'>
			<Hero />
			<ResumeConfig />
		</main>
	);
}
