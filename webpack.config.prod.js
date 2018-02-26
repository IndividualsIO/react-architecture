import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import fs from 'fs';

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production')
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const cssFilename = 'static/css/[name].[contenthash:8].css';

const publicPath = './';

const shouldUseRelativeAssetPaths = publicPath === './';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
	? { publicPath: Array(cssFilename.split('/').length).join('../') }
	: {};

export default {
	mode: 'production',
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'source-map',
	entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin('/static/styles.css'),
		new webpack.LoaderOptionsPlugin({ minimize: true })
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
							cacheDirectory: true
						}
					},
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use a plugin to extract that CSS to a file, but
					// in development "style" loader enables hot editing of CSS.
					{
						test: /\.css$/,
						loader: ExtractTextPlugin.extract(
							Object.assign(
								{
									fallback: require.resolve('style-loader'),
									use: [
										{
											loader: require.resolve('css-loader'),
											options: {
												importLoaders: 1,
												minimize: true,
												sourceMap: shouldUseSourceMap
											}
										},
										{
											loader: require.resolve('postcss-loader'),
											options: {
												// Necessary for external CSS imports to work
												// https://github.com/facebookincubator/create-react-app/issues/2677
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
								extractTextPluginOptions
							)
						)
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
