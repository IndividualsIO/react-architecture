import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
	mode: 'development',
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'cheap-module-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
	entry: [
		'react-hot-loader/patch',
		'babel-polyfill',
		'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'src/index.js') // Defining path seems necessary for this to work consistently on Windows machines.\
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'src'),
		hot: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]'
						}
					},
					// Process JS with Babel.
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						include: resolveApp('src'),
						loader: require.resolve('babel-loader'),
						options: {
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: true,
							plugins: ['react-hot-loader/babel']
						}
					},
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use a plugin to extract that CSS to a file, but
					// in development "style" loader enables hot editing of CSS.
					{
						test: /\.scss$/,
						use: [
							{
								loader: 'style-loader' // creates style nodes from JS strings
							},
							{
								loader: 'css-loader' // translates CSS into CommonJS
							},
							{
								loader: 'sass-loader' // compiles Sass to CSS
							}
						]
					},
					{
						test: /\.css$/,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									modules: true,
									localIdentName: '[name]__[local]___[hash:base64:5]'
								}
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									ident: 'postcss',
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9' // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009'
										})
									]
								}
							}
						]
					},
					// "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader doesn't use a "test" so it will catch all modules
					// that fall through the other loaders.
					{
						// Exclude `js` files to keep "css" loader working as it injects
						// it's runtime that would otherwise processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.js$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
						options: {
							name: 'static/media/[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	}
};
