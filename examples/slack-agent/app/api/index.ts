import { serve } from '@hono/node-server';
import { app } from './app';

const port = Number(process.env.PORT) || 3101;
const isDev = process.env.NODE_ENV === 'development';

console.log(`Starting server in ${isDev ? 'development' : 'production'} mode`);

serve(
	{
		fetch: app.fetch,
		port
	},
	info => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
