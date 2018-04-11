'use strict';
const path = require('path');
module.exports = {
  serverOutputPath: path.resolve(__dirname, '../app/view'),
  clientOutputPath: path.resolve(__dirname, '../app/public'),
  templatePath: path.resolve(__dirname, '../app/web/page/index.template.html'),
  serverBundleName: 'vue-ssr-server-bundle.json',
  clientBundleName: 'vue-ssr-client-manifest.json',
};
