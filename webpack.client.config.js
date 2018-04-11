const merge = require('webpack-merge')
const WebpackConst = require('./lib/WebpackConst')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
  	vue: 'vue',
  	element: 'element-ui',
  	main: './app/web/page/entry-client.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: WebpackConst.clientOutputPath,
  },
 plugins: [
    new VueSSRClientPlugin()
  ],
  optimization: {
  	splitChunks: {
  		chunks: 'all',
  		name: false
  	}
  }
})