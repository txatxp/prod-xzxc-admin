const Service = require('egg').Service;
const fs = require('fs');
const FormStream = require('formstream');
const formidable = require("formidable");
const sendToWormhole = require('stream-wormhole');
const path = require('path');
const pump = require('mz-modules/pump');
var qiniu = require("qiniu");
const moment = require('moment');
var accessKey = 'Sm24aAQQ5VRRyXSYa8SRfH05C6S48sYHppVMMRxJ';
var secretKey = 'PmWeIF0krWZEsVS19SA4wJAI3DUURSOaT6ZTW_-c';
const bucket = 'xzxc';
moment.locale('en', {
    weekdays : [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "星期五", "Saturday"
    ]
});
class UploadfileService extends Service {
  async parse(req) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files })
      })
    });
  }
  async uploadFileCommon (obj) {
  	var _this = this
  	var ctx = _this.ctx
  	const parts = ctx.multipart({ autoFields: true });
  	let stream
  	stream = await parts()
  	if (obj.theme_id && !stream) {
  		return {code: 200,src:null,msg: '图片未更新！'}
  	}
  	const filename = stream.filename.toLowerCase();
  	var imgsrc = new Date().getTime() + '.' + filename.split('.')[1]
  	let key = path.join(this.config.baseDir, 'app/public', imgsrc);
  	const writeStream = fs.createWriteStream(key);
    let filesavesuccess = await pump(stream, writeStream);
    return {code: 200,src:imgsrc,msg: '图片上传成功！'}
  }
  async uploadfile(obj) {
  	var _this = this
  	var ctx = _this.ctx

	var themedata = await ctx.service.addtheme.gettheme(obj)
	if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
		var userdata = await ctx.service.createuser.isUserid(obj.userid)
		if (themedata.data.length >= userdata[0].theme_number) {
			return {code: 500,msg: '已超过创建主题数量'}
		} 
	} else {
		var userdata = await ctx.service.createuser.isUserid(ctx.user.userId)
		if (themedata.data.length >= userdata[0].theme_number) {
			return {code: 500,msg: '已超过创建主题数量'}
		}
	}
  	return await this.uploadFileCommon(obj)

  	
    
  }
  async zcode (respBody) {
  	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	var config = new qiniu.conf.Config();
	config.zone = qiniu.zone.Zone_z0;
	var operManager = new qiniu.fop.OperationManager(mac, config);
	var fops = ['avthumb/vcodec/m3u8/s/480x320/vb/150k|saveas/' + qiniu.util.urlsafeBase64Encode(bucket + ":qiniu_480x320.m3u8")]
	var srcKey = respBody.key
	var pipeline = 'jemy';
	console.log('txp2')
  	 operManager.pfop(bucket, srcKey, fops, 'if-bc', {}, function(err, respBody, respInfo) {
  	 	console.log('txp3')
		  if (err) {
		  	console.log('txp4')
		    throw err;
		  }
		  if (respInfo.statusCode == 200) {
		  	console.log('txp5')
		    console.log(respBody);
		    console.log(respBody.persistentId);
		  } else {
		  	console.log('txp6')
		    console.log(respInfo.statusCode);
		    console.log(respBody);
		  }
		});
  }
  async uploadAbbreviations (obj) {
  	console.log(obj)
  	var _this = this
  	var ctx = _this.ctx
  	const parts = ctx.multipart({ autoFields: true });
  	let stream
  	stream = await parts()
  	const filename = stream.filename.toLowerCase();
  	var imgsrc = new Date().getTime() + '.' + filename.split('.')[1]
  	let key = path.join(this.config.baseDir, 'app/public', imgsrc);
  	const writeStream = fs.createWriteStream(key);
    let filesavesuccess = await pump(stream, writeStream);

    var emotiondata =  await this.app.mysql.select('emotion', {
    	where: {
        id: obj.emotion_id
      }
    });
    if (emotiondata.length <= 0) {
    	return {code: 500,src:imgsrc,msg: '课时不存在！'}
    }
    var result = await this.app.mysql.update('emotion', {
    	min_picture: imgsrc
    }, {
      where: {
        id: obj.emotion_id
      }
    });
    if (result) {
    	return {code: 200,src:imgsrc,msg: '缩略图图片上传成功！'}
    } else {
    	return {code: 500,src:imgsrc,msg: '缩略图图片上传失败！'}
    }
    
  }
  async slideupload (obj) {
  	var _this = this
  	var ctx = this.ctx
  	var parts = ctx.multipart({ autoFields: true });
  	const files = [];
  	let stream;
    if (!obj.emotion_id || obj.emotion_id <= 0) {
    	return {code: 500, msg: '幻灯片上传失败，没有指定课时id！'}
    }
  	while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      var imgsrc = new Date().getTime() + '.' + filename.split('.')[1]
      const target = path.join(this.config.baseDir, 'app/public', imgsrc);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
		var insertData = await this.app.mysql.insert('slide', {
			slide_path: imgsrc,
			publisher_user_id: ctx.user.userId,
			create_time: _this.ctx.helper.relativeTime(),
			user_id: obj.userid == 0 ? ctx.user.userId : obj.userid,
			emotion_id: obj.emotion_id
		})
      files.push(imgsrc);
    }
  	return {code: 200, msg: '幻灯片上传成功！'}
  }
  async uploadfiles (id) {
    var _this = this
    var ctx = this.ctx
    var parts = ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
     while ((stream = await parts()) != null) {
        const filename = stream.filename.toLowerCase();
        var imgsrc = new Date().getTime() + '.' + filename.split('.')[1]
        const target = path.join(this.config.baseDir, 'app/public', imgsrc);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        var insertData = await this.app.mysql.insert('imglibs', {
          img_path: imgsrc,
          publisher_user_id: ctx.user.userId,
          timestr: _this.ctx.helper.relativeTime(),
          time: new Date().getTime() / 1000,
          user_id: id ? id : ctx.user.userId,
          isDelete: 1
        })
        files.push(imgsrc);
      }
      return await files
  }
  // 图片库上传
  async libsimg (obj) {
    var _this = this
    var ctx = _this.ctx
    var tim = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59'
    var tim2 = moment().subtract(0, 'days').format('YYYY-MM-DD') + ' 23:59:59'
    var timeStamp1 = new Date(tim).getTime() / 1000
    var timeStamp2 = new Date(tim2).getTime() / 1000
    var userid = obj.userid > 0 ? obj.userid : ctx.user.userId
    let sql = `select * from imglibs where time > ${timeStamp1} AND time < + ${timeStamp2} AND user_id = ${userid}`;
    var menudata = await this.app.mysql.query(sql);
    console.log(menudata)
    if (ctx.user.level == 1 && obj.userid > 0 && ctx.user.level == obj.adminlevel) {
      if (ctx.user.level == 1 && ctx.user.level == obj.adminlevel) {
            var files = await _this.uploadfiles(obj.userid)
            console.log(files)
            return {code: 200, msg:'图片保存成功！',data:{
              files: files
            }}
      } else {
        if (menudata.length < 10) {
          var files = await _this.uploadfiles()
           return {code: 200, msg:'图片保存成功！',data:{
              files: files
            }}
        } else {
          return {code: 500, msg:'当天上传图片已超限制!',data:{menudata}}
        }
      }
    } else {
      if (ctx.user.level == 1 && ctx.user.level == obj.adminlevel) {
            var files = await _this.uploadfiles()
            console.log(files)
            return {code: 200, msg:'图片保存成功！',data:{
              files: files
            }}
      } else {
        if (menudata.length < 10) {
          var files = await _this.uploadfiles()
           return {code: 200, msg:'图片保存成功！',data:{
              files: files
            }}
        } else {
          return {code: 500, msg:'当天上传图片已超限制!',data:{menudata}}
        }
      }
    }
   
  }
  // 视频上传
  async videoupload (obj) {
    var emotiondata =  await this.app.mysql.select('emotion', {
      where: {
        id: obj.emotion_id
      }
    });
    if (emotiondata.length <= 0) {
      return {code:500,msg:'更新的课时不存在！'}
    }
    var data = await this.qiniuUpload()
    var result = await this.app.mysql.update('emotion', {
      video: data.data.key
    }, {
      where: {
        id: obj.emotion_id
      }
    });
    if (result) {
      return {code: 200,msg: '视频上传成功！'}
    } else {
      return {code: 500,msg: '视频上传失败！'}
    }
    return data
  }
  // 音频上传
  async radioppload (obj) {
    var emotiondata =  await this.app.mysql.select('emotion', {
      where: {
        id: obj.emotion_id
      }
    });
    if (emotiondata.length <= 0) {
      return {code:500,msg:'更新的课时不存在！'}
    }
    var data = await this.qiniuUpload()
    var result = await this.app.mysql.update('emotion', {
      audio: data.data.key
    }, {
      where: {
        id: obj.emotion_id
      }
    });
    if (result) {
      return {code: 200,msg: '音频上传成功！'}
    } else {
      return {code: 500,msg: '音频上传失败！'}
    }
    return data
  }
  async qiniuUpload (fn) {
    var _this = this
    var ctx = this.ctx
    var parts = ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    stream = await parts()
    const filename = stream.filename.toLowerCase();
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var options = {
     scope: bucket,
     expires: 7200
    };
    var imgsrc = new Date().getTime() + '.' + filename.split('.')[1]
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var fi = await new Promise(function(resolve, reject){
      formUploader.putStream(uploadToken, imgsrc, stream, putExtra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          resolve({code: 200,msg:'音频上传成功！',data:respBody})
        } else {
          reject({code: 500,msg: '音频上传失败！'})
        }
      });
    })
    return fi
  }
}
module.exports = UploadfileService;