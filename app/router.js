'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/login', controller.login.login);
  router.post('/api/register', controller.login.register);
  router.get('/api/loginOut', controller.login.loginOut);
  
  // 以下需要jwt验证
  // router.all('/*', app.middleware.headerAddAuthorization());
  // router.get('/api/getUser', controller.user.index) // 查询



  // router.get('/api/user_info', controller.user.getUser);
};
