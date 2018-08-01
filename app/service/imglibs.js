const Service = require('egg').Service;
class LibsService extends Service {
  async getlibsimg(obj) {
  	var _this = this
  	var ctx = _this.ctx
  	var imglibdata
  	var count
  	var len
  	if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
  		imglibdata = await this.app.mysql.select('imglibs', {
	          where: {
	              user_id: obj.userid
	          },
	        columns: ['*'], // 要查询的表字段
	        orders: [['id','desc']],
	        limit: parseInt(obj.sizes), // 返回数据量
            offset:  obj.size * obj.sizes, // 数据偏移量
	    })
	    count = await this.app.mysql.select("imglibs",{
	    	where: {
	              user_id: obj.userid
	          },
	        columns: ['*'], // 要查询的表字段
	        orders: [['id','desc']],
	    })
        len = count.length
	    if (imglibdata) {
	    	return {code: 200, data:{
	    		imgdata:imglibdata,
	    		count: len
	    	}}
	    } else {
	    	return {code: 500, msg:'查询失败'}
	    }
	    
  	} else {
  		imglibdata = await this.app.mysql.select('imglibs', {
	          where: {
	              user_id: ctx.user.userId
	          },
	        columns: ['*'], // 要查询的表字段
	        orders: [['id','desc']],
	        limit: parseInt(obj.sizes), // 返回数据量
            offset:  obj.size * obj.sizes, // 数据偏移量
	    })
	    count = await this.app.mysql.select("imglibs",{
	    	where: {
	              user_id: ctx.user.userId
	          },
	        columns: ['*'], // 要查询的表字段
	        orders: [['id','desc']],
	    })
        len = count.length
	    if (imglibdata) {
	    	return {code: 200, data:{
	    		imgdata:imglibdata,
	    		count: len
	    	}}
	    } else {
	    	return {code: 500, msg:'查询失败'}
	    }
  	}
  }
  async deleteimglib (obj) {
  	var result
    if (obj.type == 'delete') {
      result = await this.app.mysql.update('imglibs', {id: obj.id,isDelete: 0});
    } else {
      result = await this.app.mysql.update('imglibs', {id: obj.id,isDelete: 1});
    }
    if (result) {
      return {code: 200}
    } else {
      return {code: 500}
    }
  }
}
module.exports = LibsService;