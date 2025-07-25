import { IconDocument } from './ui/icons/icon-document';
import { IconSparkle } from './ui/icons/icon-sparkle';

const Hero = () => {
	return (
		<>
			<nav className='flex items-center justify-between px-16 py-8'>
				<div className='flex items-center space-x-2'>
					<IconDocument className='size-5 text-white' />
					<span className='text-white text-sm font-bold uppercase'>Resume Tailor</span>
				</div>
				<div className='text-white text-sm'>
					Powered by
					<a href='https://langbase.com/' className='xfont-bold ml-1 underline'>
						Langbase
					</a>
				</div>
			</nav>
			<section className='relative overflow-hidden'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16'>
					<div className='text-center max-w-4xl mx-auto'>
						<div className='inline-flex items-center px-4 py-2 rounded-full text-sm mb-8 bg-[#090909] shadow-[0_2px_3px_0_theme(colors.black/35%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/3%)]'>
							<IconSparkle className='w-4 h-4 mr-2 text-amber-500' />
							AI-Powered Resume Optimization
						</div>

						<h1 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
							Land your dream job with
							<span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent'>
								{' '}
								AI-optimized
							</span>{' '}
							resumes
						</h1>

						<p className='text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto'>
							Upload your resume and job posting. Our AI analyzes both to create an
							ATS-friendly version that gets you noticed.
						</p>

						{/* Stats */}
						{/* <div className='grid grid-cols-2 gap-8 max-w-md mx-auto mb-16'>
							<div className='text-center'>
								<div className='text-2xl font-bold text-mute-foreground'>89%</div>
								<div className='text-sm text-muted-foreground/80'>
									Avg. ATS Score
								</div>
							</div>
							<div className='text-center'>
								<div className='text-2xl font-bold text-mute-foreground'>3x</div>
								<div className='text-sm text-muted-foreground/80'>
									More Interviews
								</div>
							</div>
						</div> */}
					</div>
				</div>

				{/* Background Elements */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl'>
					<div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
					<div className='absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
					<div className='absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
				</div>
			</section>
		</>
	);
};

export default Hero;
