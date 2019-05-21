//eslint-disable-next-line
import path from 'path';
//eslint-disable-next-line
import fs from 'fs';

export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: '[name].js'
	}
};
