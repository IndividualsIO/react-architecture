/* eslint-disable no-console, no-unused-vars */

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
// import open from 'open';
import DashboardPlugin from 'webpack-dashboard/plugin';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

compiler.apply(new DashboardPlugin());

app.use(
	require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	})
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		//open(`http://localhost:${port}`);
		console.log(`App is running at http://localhost:${port}`);
	}
});
