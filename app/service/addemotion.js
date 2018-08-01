const Service = require('egg').Service;
class EmotionService extends Service {
  async addemotion (obj) {
  	var ctx = this.ctx
  	var _this = this
  	var themedata = await ctx.service.addtheme.gettheme(obj)
  	console.log(themedata)
  	var isTheme = themedata.data.filter(item => {
  		return item.id == obj.class
  	})
  	if (isTheme.length <= 0) {
  		return {code:500,msg:'选择的主题id有误！'}
  	}
  	if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
  		var userdata = await ctx.service.createuser.isUserid(obj.userid)
  		if (userdata.length <= 0) {
  			return {code:500,msg:'选择的用户不存在！'}
  		}
      var uploadData
      if (obj.edit) {
        insertData = await this.app.mysql.update('emotion', {
          theme_id: obj.class,
          author_name: obj.name,
          title: obj.title,
          emotion_describe: obj.desc,
          attribute: obj.checkListCheckbox.join(','),
          subscribe_number: obj.orderNumber,
          originalPrice: obj.originalPrice,
          price: obj.price,
          orderNumber: obj.orderNumber,
          readNumber: obj.readNumber,
          publisher_user_id: ctx.user.userId,
          create_time: _this.ctx.helper.relativeTime(),
          user_id: obj.userid 
        }, {
          where: {
            id: obj.id
          }
        });
        return {code: 200, msg: '更新成功！',data: {id:obj.id}}
      } else {
      		var insertData = await this.app.mysql.insert('emotion', {
      			theme_id: obj.class,
      			author_name: obj.name,
      			title: obj.title,
      			emotion_describe: obj.desc,
      			attribute: obj.checkListCheckbox.join(','),
      			subscribe_number: obj.orderNumber,
      			originalPrice: obj.originalPrice,
      			price: obj.price,
      			orderNumber: obj.orderNumber,
      			readNumber: obj.readNumber,
      			publisher_user_id: ctx.user.userId,
      			create_time: _this.ctx.helper.relativeTime(),
      			user_id: obj.userid > 0 ? obj.userid : ctx.user.userId,
            isDelete: 0
      		})
      		if (insertData.affectedRows > 0 && insertData.insertId > 0) {
      			return {code:200,msg:'情感图文数据保存成功！', data:{
      				id: insertData.insertId
      			}}
      		} else {
      			return {code:500,msg:'情感图文数据保存失败！'}
      		}
      }
  	} else {
      var insertData
      var uploadData
      if (obj.edit) {
        insertData = await this.app.mysql.update('emotion', {
          theme_id: obj.class,
          author_name: obj.name,
          title: obj.title,
          emotion_describe: obj.desc,
          attribute: obj.checkListCheckbox.join(','),
          subscribe_number: obj.orderNumber,
          originalPrice: obj.originalPrice,
          price: obj.price,
          orderNumber: obj.orderNumber,
          readNumber: obj.readNumber,
          publisher_user_id: ctx.user.userId,
          create_time: _this.ctx.helper.relativeTime(),
          user_id: obj.userid > 0 ? obj.userid : ctx.user.userId
        }, {
          where: {
            id: obj.id
          }
        });
        console.log(uploadData, 'uploadDatauploadDatauploadDatauploadData')
        return {code: 200, msg: '更新成功！',data: {id:obj.id}}
      } else {
    		insertData = await this.app.mysql.insert('emotion', {
    			theme_id: obj.class,
    			author_name: obj.name,
    			title: obj.title,
    			emotion_describe: obj.desc,
    			attribute: obj.checkListCheckbox.join(','),
    			subscribe_number: obj.orderNumber,
    			originalPrice: obj.originalPrice,
    			price: obj.price,
    			orderNumber: obj.orderNumber,
    			readNumber: obj.readNumber,
    			publisher_user_id: ctx.user.userId,
    			create_time: _this.ctx.helper.relativeTime(),
    			user_id: obj.userid > 0 ? obj.userid : ctx.user.userId,
          isDelete: 0
    		})
    		if (insertData.affectedRows > 0 && insertData.insertId > 0) {
    			return {code:200,msg:'情感图文数据保存成功！', data:{
    				id: insertData.insertId
    			}}
    		} else {
    			return {code:500,msg:'情感图文数据保存失败！'}
    		}
      }
  	}
  	
  }
  async uploadimgtext (obj) {
    var emotiondata =  await this.app.mysql.select('emotion', {
      where: {
        id: obj.emotion_id
      }
    });
   if (emotiondata.length <= 0) {
    return {code:500,msg:'更新的课时不存在！'}
   }
   var result = await this.app.mysql.update('emotion', {
      text: JSON.stringify(obj.pictureText)
    }, {
      where: {
        id: obj.emotion_id
      }
    });
    if (result) {
      return {code: 200,msg: '图文编辑成功！'}
    } else {
      return {code: 500,msg: '图文编辑失败！'}
    }
  }
  async getemotiondata (obj) {
    var _this = this
    var ctx = _this.ctx
    console.log(obj)
    if (obj.emotion_id) {
      var emotiondata =  await this.app.mysql.select('emotion', {
        where: {
          id: obj.emotion_id
        }
      });
      return {code: 200, data:emotiondata}
    } else {
      var count
      var len
      
      // let sql = `select * from \`admin-user\` where user_name like "%`+search+`%" ORDER BY id desc limit `+offset+`,`+limit;
      if (obj.search.length > 0) {
        var searchCondition = obj.searchCondition
        var search = obj.search
        var offset = obj.size * obj.sizes
        var limit = parseInt(obj.sizes)
        var userid = obj.userid > 0 ? obj.userid : ctx.user.userId
        let sql = `select * from emotion where user_id='${userid}' AND ${searchCondition} like '%${search}%' ORDER BY id desc limit ${offset},${limit}`;
        var emotiondata = await this.app.mysql.query(sql);
        len = emotiondata.length
        return {code: 200, data:emotiondata,count: len}
      } else {
          var emotiondata =  await this.app.mysql.select('emotion', {
            user_id: obj.userid,
            columns: ['*'], // 要查询的表字段
            orders: [['id','desc']], // 排序方式
            limit: parseInt(obj.sizes), // 返回数据量
            offset:  obj.size * obj.sizes, // 数据偏移量
            where: {
              user_id: obj.userid > 0 ? obj.userid : ctx.user.userId
            }
          });
          count = await this.app.mysql.select("emotion",{
            where: {
              user_id: obj.userid > 0 ? obj.userid : ctx.user.userId
            }
          })
          len = count.length
          return {code: 200, data:emotiondata,count: len}
      }
    }
  }
  async emotiontoexamine (obj) {
     var result
     var _this = this
     var ctx = _this.ctx
     if (ctx.user.level == 1) {
        if (obj.type == 'delete') {
          result = await this.app.mysql.update('emotion', {isDelete: 0}, {
            where: {
              id: obj.id
            }
          });
          return {code: 200,msg: '禁用成功！'}
        } else {
          result = await this.app.mysql.update('emotion', {isDelete: 1}, {
            where: {
              id: obj.id
            }
          });
          return {code: 200,msg: '审核通过！'}
        }
     } else {
      return {code: 500,msg: '无权限！'}
     }
  }
}

module.exports = EmotionService;