'use strict';
const MemoryFileEvent = require('./MemoryFileEvent');
const GlobalReg = require('./GlobalReg');
const path = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const webpackServerConfig = require('../webpack.server.config.js');
const webpackClientConfig = require('../webpack.client.config.js');

class MemoryFileAgent {
	constructor(agent) {
		this.agent = agent;
		// server compile 'vue-ssr-server-bundle.json'
		const serverCompiler = webpack(webpackServerConfig);
		const serverDev = devMiddleware(serverCompiler, {
			publicPath: webpackServerConfig.output.publicPath,
			writeToDisk: true
		});

		// client compile 'vue-ssr-client-manifest.json'
		const clientCompiler = webpack(webpackClientConfig);
		const clientDev = devMiddleware(clientCompiler, {
			publicPath: webpackClientConfig.output.publicPath,
			writeToDisk: false
		});

		// request memory file from clientDev.fileSystem
		this.agent.messenger.on(MemoryFileEvent.REQUEST_CLIENT_FILE, filePath => {
			this.agent.logger.info('request memory file: ' + filePath);
			// check if file exists in webpack memory
			// filePath: relative path like '/index.html'
			// absPath: absolute path for 'memory-fs' usage
			const dev = clientDev;
			dev.waitUntilValid(() => {
				let fileData;
				const fs = dev.fileSystem;
				const absPath = path.join(dev.context.compiler.outputPath, filePath);

				if (fs.existsSync(absPath)) {
					const ext = path.extname(filePath).toLocaleLowerCase();
					let encoding;
					// Buffer(default) or String(txt extension)
					if (GlobalReg.txt.test(ext)) {
						encoding = 'utf-8';
					}
					fileData = fs.readFileSync(absPath, encoding);
				}
				agent.messenger.sendToApp(
					fileData ? MemoryFileEvent.FILE_FOUND : MemoryFileEvent.FILE_NOT_FOUND, 
					{ filePath, fileData }
				);
			})
		});
	}
}

module.exports = MemoryFileAgent;
