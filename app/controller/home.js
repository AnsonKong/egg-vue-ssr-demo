'use strict';

const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const Controller = require('egg').Controller;
const WebpackConst = require('../../lib/WebpackConst');
const { createBundleRenderer } = require('vue-server-renderer');

let serverBundle;
let vueTemplate;
let clientManifestDisk;

class HomeController extends Controller {
	// get /
  async index() {
  	if (!serverBundle) serverBundle = path.join(WebpackConst.serverOutputPath, WebpackConst.serverBundleName);
  	if (!vueTemplate) vueTemplate = fs.readFileSync(WebpackConst.templatePath, 'utf-8');

		let clientManifest;
		if (this.app.config.env === 'local') {
			const clientBundleString = await this.app.memoryFileWorker.requestClientFile(WebpackConst.clientBundleName);
			clientManifest = JSON.parse(clientBundleString);
		} else {
			// caching clientManifest
  		if (!clientManifestDisk) clientManifestDisk = require(path.join(WebpackConst.clientOutputPath, WebpackConst.clientBundleName));
			clientManifest = clientManifestDisk;
		}

		// bundle-renderer
		const renderer = createBundleRenderer(serverBundle, {
			runInNewContext: false,
		  template: vueTemplate,
		  clientManifest
		});

		// context for SSR
	  const ssrContext = { 
	  	url: this.ctx.request.url,
	  	logined: this.ctx.user ? true : false
	  };

	  this.ctx.body = await renderer.renderToString(ssrContext);
  }
}

module.exports = HomeController;
 