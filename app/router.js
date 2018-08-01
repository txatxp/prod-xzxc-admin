'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const isAuthenticated = app.middleware.isAuthenticated();


  router.get('/', controller.home.render);
  router.get('/admin', controller.admin.index);
  router.get('/loginpage', controller.admin.loginpage);
  router.post('/ccam', isAuthenticated, controller.ccam.index);
  router.post('/deletemenu', isAuthenticated, controller.ccam.deletemenu);

  router.get('/getmenu', isAuthenticated, controller.ccam.getmenudata)
  router.get('/getusermenu', isAuthenticated, controller.ccam.getMenuUserData)

  router.post('/createuser', isAuthenticated, controller.user.adduser);
  router.post('/uploadUserMenu', isAuthenticated, controller.ccam.uploadUserMenu);
  router.post('/deleteuser', isAuthenticated, controller.user.deleteuser);
  // 添加主题
  router.post('/addtheme', isAuthenticated, controller.ccam.addtheme);
  // 获取主题
  router.get('/gettheme', isAuthenticated, controller.ccam.gettheme);
  // 关闭主题
  router.get('/closetheme', isAuthenticated, controller.ccam.closetheme);
  // 文件上传
  router.post('/uploadfile', isAuthenticated, controller.ccam.uploadfile);
  // 情感数据文本部分保存添加
  router.post('/addemotiontext', isAuthenticated, controller.ccam.addemotiontext);
  // 幻灯片上传
  router.post('/slideuploadurl', isAuthenticated, controller.ccam.slideuploadurl);
  // 缩略图上传
  router.post('/emotionuploadminimg', isAuthenticated, controller.ccam.emotionuploadminimg);
  // 图片库上传
  router.post('/libsimg', isAuthenticated, controller.ccam.libsimg);
  // 获取图片库
  router.get('/getlibsimg', isAuthenticated, controller.ccam.getlibsimg);
  // 禁用图片库里的图片
  router.post('/deleteimglib', isAuthenticated, controller.ccam.deleteimglib);
  // 更新图文
  router.post('/uploadimgtext', isAuthenticated, controller.ccam.uploadimgtext);
  // 音频上传
  router.post('/radioppload', isAuthenticated, controller.ccam.radioppload);
  // 视频上传
  router.post('/videoupload', isAuthenticated, controller.ccam.videoupload);
  // 编辑上传视频权限
  router.post('/deletevideo_upload_jurisdiction', isAuthenticated, controller.user.deleteVideoUploadJurisdiction);
  // 获取课时数据
  router.get('/getemotiondata', isAuthenticated, controller.ccam.getemotiondata);
  // 课时审核
  router.post('/emotiontoexamine', isAuthenticated, controller.ccam.emotiontoexamine);

  router.get('/getuser', isAuthenticated, controller.user.getuser)
  // 修改用户主题数量
  router.post('/modifyhhemenumber', isAuthenticated, controller.user.modifyhhemenumber)

  router.get('/logout', controller.user.logout);
  // 鉴权成功后的回调页面
  router.get('/sucesslogin', controller.user.sucessLogin);
  router.get('/failurelogin', controller.user.failureLogin);
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/sucesslogin',failureRedirect: '/failurelogin' }));
  // router.post('/login', controller.user.login);
};
