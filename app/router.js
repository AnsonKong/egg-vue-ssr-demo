'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const options = {
  	successRedirect: '/',
  	failureRedirect: '/signin'
  };
  // passport-github
  app.passport.mount('github');

  // vue-router
  router.get('/', controller.home.index);
  router.get('/about', controller.home.index);

  // operation
  router.get('/logout', controller.user.logout);
};
