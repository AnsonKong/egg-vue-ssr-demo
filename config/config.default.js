'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522162387042_3633';

  // add your config here
  config.middleware = ['notfoundHandler'];

  config.development = {
  	ignoreDirs: ['app/web']
  };

  config.mongoose = {
    url: `mongodb://127.0.0.1/dbname`,
    options: {
      useMongoClient: true
    }
  };

  config.passportGithub = {
    key: require('./github.local.passport').key,
    secret: require('./github.local.passport').secret
  };

  return config;
};
