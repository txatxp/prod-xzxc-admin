const Controller = require('egg').Controller;
class UserController extends Controller {
  async adduser() {
    const ctx = this.ctx;
    const user = await ctx.service.createuser.insert(ctx.request.body);
    ctx.body = user
  }
  async login () {
  	const ctx = this.ctx;
    const user = await ctx.service.createuser.login(ctx.query);
    ctx.body = user
  }
  async logout() {
    const ctx = this.ctx;
    const logout = await ctx.logout()
    ctx.body = {code: 200,data: logout}
  }
  async sucessLogin(){
    const ctx = this.ctx;
    ctx.body = {code: 200}
  }
  async failureLogin () {
    const ctx = this.ctx;
    ctx.body = {code: 500}
  }
  async getuser () {
    const ctx = this.ctx;
    const user = await ctx.service.createuser.query(ctx.query);
    ctx.body = user
  }
  async deleteuser () {
    const ctx = this.ctx;
    const user = await ctx.service.createuser.deleteuser(ctx.request.body);
    ctx.body = user
  }
  async modifyhhemenumber () {
    const ctx = this.ctx;
    const user = await ctx.service.createuser.modifyhhemenumber(ctx.request.body);
    ctx.body = user
  }
  async deleteVideoUploadJurisdiction () {
    this.ctx.body = await this.ctx.service.createuser.deleteVideoUploadJurisdiction(this.ctx.request.body);
  }
}
module.exports = UserController;