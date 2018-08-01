const Service = require('egg').Service;
const crypto = require('crypto');
class CreateUserService extends Service {
  async insertAdminUser (database, dataConfig) {
    return await this.app.mysql.insert(database, dataConfig);
  }
  async isUser (userName) {
  	const menudata = await this.app.mysql.select('admin-user', {
      where: {
        user_name: userName
      }
    })
  	return menudata
  }
  async isUserid (userId) {
    const menudata = await this.app.mysql.select('admin-user', {
      where: {
        id: userId
      }
    })
    return menudata
  }
  async isLoginUser (userName,passWord) {
    const menudata = await this.app.mysql.select('admin-user', {
      where: {
        user_name: userName,
        user_password: passWord,
        isDelete: 1
      }
    })
    return menudata
  }
  encryption (passWord) {
  	const hash = crypto.createHash('md5');
  	const hmac = crypto.createHmac('sha256', 'secret-key');
  	var md5password = hash.update(passWord).digest("hex")
  	var md5password2 = hmac.update(passWord).digest("hex")
  	var passWordArray = md5password2.split('')
  	var md5passwordArray = md5password.split('')
  	passWordArray.forEach((item, index) => {
    	return md5passwordArray.splice(1 * (index + 1) + index, 0, item);
	});
	var md5passwordString = md5passwordArray.join('')
	return md5passwordString
  }
  async insert(obj) {
    var _this = this
    console.log(obj, 'this.ctx.user.level')
    if(this.ctx.user.level == 1) {
    	if (obj.userName && obj.passWord) {
    	  var isUserData = await _this.isUser(obj.userName)
    	  if (isUserData.length > 0) {
    	  	return {code: 500,msg:obj.userName + ': 用户名已存在'};
    	  } else {
    	  	await _this.insertAdminUser('admin-user', {user_name: obj.userName, user_password: _this.encryption(obj.passWord), isDelete: 1, user_menu_jurisdiction: obj.jurisdiction,user_menu_jurisdiction_set: obj.user_menu_jurisdiction_set,level: obj.leveldefault,time: _this.ctx.helper.relativeTime(),author: _this.ctx.user?_this.ctx.user.username:'***',ua: obj.ua,ip:_this.ctx.ip,theme_number: 5,video_upload_jurisdiction: 0})
    	  	return {code: 200};
    	  }
    	} else {
  		  return {code: 500,msg: '插入值不能为空！'};
    	}
    } else {
      return {code: 500,msg: '无权限！'};
    }
  }
  async query(obj) {
    var menudata
    var count
    var len
    if(this.ctx.user.level == 1) {
      if (!obj.search) {
        menudata = await this.app.mysql.select('admin-user', {
          columns: ['*'], // 要查询的表字段
          orders: [['id','desc']], // 排序方式
          limit: parseInt(obj.sizes), // 返回数据量
          offset:  obj.size * obj.sizes, // 数据偏移量
        })
        count = await this.app.mysql.select("admin-user")
        len = count.length
      } else {
        var search = obj.search
        var offset = obj.size * obj.sizes
        var limit = parseInt(obj.sizes)
        let sql = `select * from \`admin-user\` where user_name like "%`+search+`%" ORDER BY id desc limit `+offset+`,`+limit;
        menudata = await this.app.mysql.query(sql);
        count = await this.app.mysql.select("admin-user", {
          where: { user_name: search}
        })
        len = count.length
      }
    } else {
      return {code: 500,msg: '无权限！'};
    }
  	
    menudata.forEach(function(item){
      delete item.user_password
    })
  	return {
      user: menudata,
      count: len
    }
  }
  async login(obj) {
    var _this = this
    if (obj.userName && obj.passWord) {
      var password = _this.encryption(obj.passWord)
      var logindata = await _this.isLoginUser(obj.userName, password)
      if (logindata.length > 0) {
        _this.ctx.session.user = obj.userName
        return {code: 200};
      } else {
        return {code: 500,msg: '用户不存在'};
      }
    } else {
      return {code: 500,msg: '插入值不能为空！'};
    }
  }
  async deleteuser (obj) {
    var result
    if(this.ctx.user.level == 1) {
      if (obj.type == 'delete') {
        result = await this.app.mysql.update('admin-user', {id: obj.id,isDelete: 0});
      } else {
        result = await this.app.mysql.update('admin-user', {id: obj.id,isDelete: 1});
      }
      if (result) {
        return {code: 200}
      } else {
        return {code: 500}
      }
    } else {
      return {code: 500,msg: '无权限！'};
    }
  }
  async modifyhhemenumber (obj) {
    var result
    if(this.ctx.user.level == 1) {
      result = await this.app.mysql.update('admin-user', {id: obj.id,theme_number: obj.theme_number});
      if (result) {
        return {code: 200}
      } else {
        return {code: 500}
      }
    } else {
      return {code: 500,msg: '无权限！'};
    }
  }
  async deleteVideoUploadJurisdiction (obj) {
    var result
    if(this.ctx.user.level == 1) {
      if (obj.type == 'delete') {
        result = await this.app.mysql.update('admin-user', {id: obj.id,video_upload_jurisdiction: 0});
      } else {
        result = await this.app.mysql.update('admin-user', {id: obj.id,video_upload_jurisdiction: 1});
      }
      if (result) {
        return {code: 200}
      } else {
        return {code: 500}
      }
    } else {
      return {code: 500,msg: '无权限！'};
    }
  }
}
module.exports = CreateUserService;