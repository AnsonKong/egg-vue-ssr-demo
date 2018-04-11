const MemoryFileWorker = require('./lib/MemoryFileWorker');

module.exports = app => {
	console.log('worker enter');
	app.messenger.on('egg-ready', () => {
		console.log('egg-ready from worker');
		if (app.config.env === 'local') {
			app.memoryFileWorker = new MemoryFileWorker(app);
		}
	});

	app.passport.verify(async (ctx, user) => {
		let userDoc;
		if (user.provider) {
			ctx.logger.info('verify by OAuth:' + user.provider);
			//1. OAuth by Github
			const matchConditions = {
				uid: user.id,
				provider: user.provider
			};
			// 查找授权文档
			userDoc = await ctx.model.User.findOne(matchConditions);
			// 查找用户文档
			if (!userDoc) {
				// 创建匿名用户文档
				const conditions = {
					provider: user.provider,
					username: user.name,
					email: user.profile._json.email,
					avatar: user.photo,
					github: user.profile.profileUrl,
					uid: user.id
				};
				userDoc = await ctx.model.User.create(conditions);
			}
		}
		if (!userDoc) {
			ctx.logger.info('user not found');
		}
		return userDoc;
	});

	app.passport.serializeUser(async (ctx, user) => {
		// ctx.logger.info('serializeUser');
		return user._id;
	});

	app.passport.deserializeUser(async (ctx, userId) => {
		// ctx.logger.info('deserializeUser:' + userId);
		const userDoc = await ctx.model.User.findById(userId);
		return userDoc;
	});
}