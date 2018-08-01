const Service = require('egg').Service;
class CreateclassamenuService extends Service {
  async insertAdminMenu (database, dataConfig) {
    return await this.app.mysql.insert(database, dataConfig);
  }
  async insert(obj) {
    var _this = this
    if(this.ctx.user.level == 1) {
    	if (obj.menu_name && obj.menu_href && obj.menu_icon) {
        if (obj.id == 0) {
          await _this.insertAdminMenu('admin-menu', {cid: 0, menu_name: obj.menu_name, menu_href: obj.menu_href, menu_icon: obj.menu_icon, isDelete: 1})
        } else {
          await _this.insertAdminMenu('admin-menu', {cid: obj.id, menu_name: obj.menu_name, menu_href: obj.menu_href, menu_icon: obj.menu_icon, isDelete: 1})
        }
    		return {code: 200};
    	} else {
  		  return {code: 500,msg: '插入值不能为空！'};
    	}
    } else {
      return {code: 500,msg: '无权限！'};
    }
  }
  async query() {
    var ssoToken = this.ctx.cookies.get('ssoToken')
    if (ssoToken) {
      var b = new Buffer(ssoToken, 'base64')
      var s = b.toString();
    }
  	const menudata = await this.app.mysql.select('admin-menu', {
      where: {
        isDelete: 1
      }
    })
  	return menudata
  }
  async userquery (obj) {
    var ssoToken = this.ctx.cookies.get('ssoToken')
    if (ssoToken) {
      var b = new Buffer(ssoToken, 'base64')
      var s = b.toString();
      var user = JSON.parse(s)
      const userdata = await this.app.mysql.select('admin-user', {
        where: {
          isDelete: 1,
          id: user.userId,
          user_name: user.username
        }
      })
      delete userdata[0].user_password
      return userdata[0]
    } else {
      return {code: 500}
    }
  }
}
module.exports = CreateclassamenuService;