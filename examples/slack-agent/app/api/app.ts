import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import { registerLangbaseEndpoint } from './langbase';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());
app.use('*', secureHeaders());

// Routes
app.get('/', c => {
	return c.json({
		message: 'Agent App Server',
		version: '1.0.0'
	});
});

// Register agent endpoint
registerLangbaseEndpoint(app);

// 404 handler
app.notFound(c => {
	return c.json(
		{
			status: 404,
			message: 'Not Found'
		},
		404
	);
});

// Error handler
app.onError((err, c) => {
	console.error(`${err}`);

	const isDev = process.env.NODE_ENV === 'development';

	return c.json(
		{
			status: 500,
			message: 'Internal Server Error',
			...(isDev && { error: err.message, stack: err.stack })
		},
		500
	);
});

export { app };
