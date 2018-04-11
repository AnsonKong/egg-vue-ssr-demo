'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	// get /logout
	async logout() {
		this.ctx.logout();
		this.ctx.redirect('/');
	}
}

module.exports = UserController;