import { GoogleAnalytics } from '@next/third-parties/google';

const Scripts = () => {
	return (
		<>
			<GoogleAnalytics gaId={process.env.GA_ID!} />
		</>
	);
};

export default Scripts;
