var webpack =  require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
	entry: path.resolve(__dirname, 'app/index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(
			{
				minimize: true,
				compress: {
				        warnings: false
		      	}
			})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [node_modules_dir],
				loader: 'babel'
			},
			{
			  test: /\.json$/,
			  loader: 'json'
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
			    test: /.*\.(gif|png|jpe?g|svg)$/i,
			    loaders: [
			      'file?hash=sha512&digest=hex&name=[hash].[ext]',
			      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65", speed: 6}}'
			    ]
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader : 'file-loader'
			}
		]
	}
}

module.exports = config;