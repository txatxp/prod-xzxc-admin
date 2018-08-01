const Service = require('egg').Service;
class UploadmenuService extends Service {
  async upload(obj) {
    const result = await this.app.mysql.update('admin-menu', {id: obj.id,isDelete: 0});
    if (result) {
    	return {code: 200}
    } else {
    	return {code: 500}
    }
  }
  async uploadUser(obj) {
  	const result = await this.app.mysql.update('admin-user', {id: obj.id,user_menu_jurisdiction_set: obj.user_menu_jurisdiction_set,user_menu_jurisdiction:obj.user_menu_jurisdiction});
    if (result) {
    	return {code: 200}
    } else {
    	return {code: 500}
    }
  }
}
module.exports = UploadmenuService;