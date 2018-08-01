const Service = require('egg').Service;
class ThemeService extends Service {
  async insertTheme (database, dataConfig) {
    return await this.app.mysql.insert(database, dataConfig);
  }
  async updateTheme (database, dataConfig, id) {
    return await this.app.mysql.update(database, dataConfig, {
      where: {
        id: id
      }
    });
  }
  async addtheme(obj) {
  	var _this = this
  	var ctx = _this.ctx
    var result
    var userdata
    var updataTheme
    var themedata

    themedata = await _this.gettheme(obj)
    if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
     if (obj.theme_id) {
       if (obj.imgsrc) {
        updataTheme = await _this.updateTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, isDelete: 0, user_id: obj.userid,theme_min_img: obj.imgsrc,create_time: _this.ctx.helper.relativeTime()}, obj.theme_id)
       } else {
        updataTheme = await _this.updateTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, isDelete: 0, user_id: obj.userid,create_time: _this.ctx.helper.relativeTime()}, obj.theme_id)
       }
       if (updataTheme) {
         return {code: 200,msg:'更新成功！'}
       } else {
         return {code: 500,msg:'更新失败！'}
       }
     }
     userdata = await ctx.service.createuser.isUserid(obj.userid)
     
     if (themedata.data.length >= userdata[0].theme_number) {
      return {code: 500,msg: '已超过创建主题数量'}
     } else {
  	   result = await _this.insertTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, isDelete: 0, user_id: obj.userid,theme_min_img: obj.imgsrc,create_time: _this.ctx.helper.relativeTime()})
     }
    } else {
      if (obj.theme_id) {
        if (obj.imgsrc) {
          updataTheme = await _this.updateTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, user_id: ctx.user.userId,theme_min_img: obj.imgsrc,create_time: _this.ctx.helper.relativeTime()}, obj.theme_id)
        } else {
          updataTheme = await _this.updateTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, user_id: ctx.user.userId,create_time: _this.ctx.helper.relativeTime()}, obj.theme_id)
        }
       if (updataTheme) {
         return {code: 200,msg:'更新成功！'}
       } else {
         return {code: 500,msg:'更新失败！'}
       }
     }
      userdata = await ctx.service.createuser.isUserid(ctx.user.userId)
      if (themedata.data.length >= userdata[0].theme_number) {
      return {code: 500,msg: '已超过创建主题数量'}
     } else {
      result = await _this.insertTheme('theme', {theme_name: obj.theme, theme_info: obj.textarea, isDelete: 0, user_id: ctx.user.userId,theme_min_img: obj.imgsrc,create_time: _this.ctx.helper.relativeTime()})
     }
    }
    if (result) {
      return {code: 200,msg: '主题创建成功！'}
    } else {
      return {code: 500,msg: '主题创建失败！'}
    }
    
  }
  async gettheme (obj) {
  	var _this = this
  	var ctx = _this.ctx
    var themedata
    if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
      themedata = await this.app.mysql.select('theme', {
          where: {
              user_id: obj.userid
          },
        columns: ['*'], // 要查询的表字段
        orders: [['id','desc']]
      })
    } else {
      themedata = await this.app.mysql.select('theme', {
          where: {
              user_id: ctx.user.userId
          },
        columns: ['*'], // 要查询的表字段
        orders: [['id','desc']]
      })
    }
  	
    return {code: 200,data:themedata}
  }
  async closetheme (obj) {
    var result
    console.log(obj)
    if (obj.type == 'delete') {
      result = await this.app.mysql.update('theme', {isDelete: 0}, {
        where: {
          id: obj.id,
          user_id: obj.user_id
        }
      });
    } else {
      result = await this.app.mysql.update('theme', {isDelete: 1}, {
        where: {
          id: obj.id,
          user_id: obj.user_id
        }
      });
    }
    if (result) {
      return {code: 200}
    } else {
      return {code: 500}
    }
  }
}
module.exports = ThemeService;