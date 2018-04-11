// const path = require('path');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
	mode: 'development',
	// entry: {
	// 	vue: 'vue',
	// 	element: 'element-ui',
	// 	main: './app/web/page/entry-server.js'
	// },
	// entry: './app/web/page/entry-server.js',
	// Node.js via require
	// target: 'node',
	// For bundle renderer source map support
	// devtool: 'source-map',
	output: {
		publicPath: '/',
	},
	// externals: nodeExternals({
 //    // do not externalize dependencies that need to be processed by webpack.
 //    // you can add more file types here e.g. raw *.vue files
 //    // you should also whitelist deps that modifies `global` (e.g. polyfills)
 //    whitelist: [/\.css$/]
 //  }),
  // plugins: [
  //   new VueSSRServerPlugin()
  // ],
	// resolve: {
	// 	alias: {
	// 		vue: 'vue/dist/vue.js'
	// 	}
	// },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [ 'file-loader' ]
			},
			{
				test: /\.vue$/,
				use: [ 'vue-loader' ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [ 'file-loader' ]
			}
		]
	},
	/*optimization: {
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: {
			name: 'runtime'
		},
		minimize: true
	}*/
};