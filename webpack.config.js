var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index:["./src/bundle/index/main.js",'./src/bundle/index/main.css'],
		vender:['jquery']
	}, //已多次提及的唯一入口文件
	module: {//在配置文件里添加JSON loader
	    loaders: [
	    	{
	    		test:/\.js$/,
	    		exclude: /node_modules/,
	    		loader:"babel"
	    	},
	    	{
		        test: /\.css$/,
		        exclude: /node_modules/,
		        loader: ExtractTextPlugin.extract("style","css")
		    },
		    {
		        test: /\.png$/,
		        exclude: /node_modules/,
		        loader: "url?limit=1000&name=images/[name].[ext]&publicPath=../"
		    }
	    ]
	},
	devtool: '#source-map',//配置生成Source Maps，选择合适的选项
	output: {
		path: __dirname + "/dist", //打包后的文件存放的地方
		filename: "js/[name].js", //打包后输出文件的文件名,
		//publicPath:'file:///home/json/web/fontend/dist/'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			filename:'common/vender.js',
			name:'vender'
		}),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
	      	filename: 'index.html',
	      	template: './src/page/index.html'
        })
    ]
}