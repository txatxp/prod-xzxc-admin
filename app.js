const LocalStrategy = require('passport-local').Strategy;
module.exports = app => {
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    // log total cost
    console.log(ctx.next)
  });

  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField :"userName",
      passwordField :"passWord"
  }, (req, userName, passWord, done) => {
    // format user
    const user = {
      provider: 'local',
      username:userName,
      password:passWord,
      userId: 0,
      isDelete: 1
    };
    console.log(2,user)
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user,done) => {
    // 验证
    console.log('验证')
    var password = await ctx.service.createuser.encryption(user.password)
    var userArr = await ctx.service.createuser.isLoginUser(user.username,password)
    if (userArr.length > 0) {
      user.userId = userArr[0].id
      user.isDelete = userArr[0].isDelete
      user.level = userArr[0].level
      delete user.password
      return user
    }
  });
  app.passport.serializeUser(async (ctx, user,done) => {
    // 存
    console.log(3,user)
    // base64编码
    var userDataString = JSON.stringify(user)
    var b = new Buffer(userDataString);
    var admin = b.toString('base64')
    ctx.cookies.set('ssoToken', admin, {
      maxAge: 24 * 3600 * 1000
    });
    return user
  });
  app.passport.deserializeUser(async (ctx, user,done) => {
    return user
  });



};
