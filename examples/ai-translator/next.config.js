/** @type {import('next').NextConfig} */
module.exports = {
	async headers() {
		return [
			{
				source: '/api/:path*', // Match all API routes
				headers: [
					{
						key: 'Allow',
						value: 'GET, POST', // Set allowed methods
					},
				],
			},
		];
	},
};
