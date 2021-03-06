var webpack =  require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
	devtool: 'source-map',
	entry: path.resolve(__dirname, 'app/index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: 'https://acuit.herokuapp.com/'
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
	resolve: {
	    extensions: ['', '.js', '.jsx']
    },
	module: {
		loaders: [
			{ 
				test: /\.jsx$/,
		        loader: 'babel',
		        include: path.join(__dirname, 'app') },
	        { 
	        	test: /\.js$/,
		        loader: 'babel',
		        exclude: /node_modules/ 
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
				test: /\.(png|jpg)$/, 
				loader: 'url-loader?limit=10000'
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader : 'file-loader'
			}
		]
	}
}

module.exports = config;