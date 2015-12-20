var webpack =  require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {	
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'app/index.js')
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		devFlagPlugin
	],
	module: {
		loaders: [
			{
			  test: /\.json$/,
			  loader: 'json'
			},
			{
			  test: /\.jsx?$/,
			  loaders: ['react-hot', 'babel'],
			  exclude: /node_modules/,
			  include: path.join(__dirname, 'app')
			},
			{
			  test: /\.css$/,
			  loader: 'style!css'
			},
			{
			  test: /\.styl$/,
			  loader: 'style!css?modules&localIdentName=[local]___[hash:base64:10]!stylus' // eslint-disable-line
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				test: /\.(png|jpg)$/, 
				loader: 'url-loader?limit=10000'
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader : 'file-loader'
			}
		]
	},
	resolve: {
	  extensions: ['', '.js', '.json', '.jsx']
	}
}