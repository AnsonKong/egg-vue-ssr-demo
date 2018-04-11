const mime = require('mime');
const path = require('path');
const GlobalReg = require('../../lib/GlobalReg');

module.exports = (options, app) => {
  return async (ctx, next) => {
  	await next();
    if (ctx.status === 404) {
      const currentEnv = app.config.env;
      let msg;
      switch (currentEnv) {
      	case 'local':
          try {
            let filePath = ctx.request.path;
            // Object(it's Buffer actually) or String encoded by 'utf-8'
            let fileData = await app.memoryFileWorker.requestClientFile(filePath);
            // get extension
            const ext = path.extname(filePath).toLocaleLowerCase();
            // set mimeType
            ctx.type = mime.getType(filePath);
            // not txt then transfer to Buffer and mimeType will be set to aplication/octet-stream
            if (!GlobalReg.txt.test(ext)) {
              fileData = Buffer.from(fileData);
            }
            msg = fileData;
          } catch(err) {
            msg = err;
          }
      		break;
      	default:
      		msg = 'sorry, resource not found...';
      		break;
      }
      ctx.body = msg;
    }
  };
};