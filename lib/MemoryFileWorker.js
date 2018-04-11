'use strict';
const MemoryFileEvent = require('./MemoryFileEvent');

class MemoryFileWorker {
	constructor(app) {
		this.app = app;
		this.callbacksMap = {};

		this.app.messenger.on(MemoryFileEvent.FILE_FOUND, data => {
			this._clearCallbacks(true, data);
		});

		this.app.messenger.on(MemoryFileEvent.FILE_NOT_FOUND, data => {
			this._clearCallbacks(false, data);
		});
	}

	requestClientFile(filePath) {
		return this._requestFile(filePath, MemoryFileEvent.REQUEST_CLIENT_FILE);
	}

	requestServerFile(filePath) {
		return this._requestFile(filePath, MemoryFileEvent.REQUEST_SERVER_FILE);
	}

	_requestFile(filePath, eventName) {
		return new Promise((resolve, reject) => {
			if (!this._isRequestExists(filePath)) {
				this.app.messenger.sendToAgent(eventName, filePath);
			}

			this._addResolve(filePath, { resolve, reject });
		});
	}

	_clearCallbacks(success, cbData) {
		const filePath = cbData.filePath;

		const cbs = this.callbacksMap[filePath];
		if (cbs && cbs.length) {
			for (let cb of cbs) {
				if (success) {
					cb.resolve(cbData.fileData);
				} else {
					cb.reject(`${filePath} not exists in webpack memory`);
				}
			}
			delete this.callbacksMap[filePath];
		}
	}

	_isRequestExists(filePath) {
		return this.callbacksMap[filePath] != undefined;
	}

	_addResolve(filePath, cbObj) {
		if (!this._isRequestExists(filePath)) this.callbacksMap[filePath] = [];
		this.callbacksMap[filePath].push(cbObj);
	}
}

module.exports = MemoryFileWorker;
