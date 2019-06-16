'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/admin/register', controller.admin.register);
  router.post('/admin/login', controller.admin.login);
};
