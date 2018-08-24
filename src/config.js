export default {
	app: {
		baseUri: process.env.APP_URL || 'http://localhost:3000'
	},
	api: {
		tokenKey: process.env.TOKEN_KEY,
		baseUri: process.env.API_URL
	}
};
