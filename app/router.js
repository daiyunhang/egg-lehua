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
  router.all('/*', app.middleware.headerAddAuthorization());
  router.get('/api/getUser', controller.user.index) // 查询

  
  router.post('/api/editPwd', controller.user.editPwd); // 修改密码
  router.post('/api/upImg', controller.user.upImg); // 上传图片
  // 修改当前信息 手机号/昵称/头像
  router.post('/api/editUser', controller.user.editUser);




  // router.get('/api/user_info', controller.user.getUser);
};
