'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.createclassamenu.insert(this.ctx.request.body);
  }
  async getmenudata(){
  	this.ctx.body = await this.ctx.service.createclassamenu.query();
  }
  async getMenuUserData(){
  	this.ctx.body = await this.ctx.service.createclassamenu.userquery();
  }
  async deletemenu(){
  	this.ctx.body = await this.ctx.service.uploadmenu.upload(this.ctx.request.body);
  }
  async uploadUserMenu () {
    this.ctx.body = await this.ctx.service.uploadmenu.uploadUser(this.ctx.request.body);
  }
  async addtheme () {
    this.ctx.body = await this.ctx.service.addtheme.addtheme(this.ctx.request.body);
  }
  async uploadfile () {
    this.ctx.body = await this.ctx.service.uploadfile.uploadfile(this.ctx.request.query);
  }
  async gettheme () {
    this.ctx.body = await this.ctx.service.addtheme.gettheme(this.ctx.request.query);
  }
  async closetheme () {
    this.ctx.body = await this.ctx.service.addtheme.closetheme(this.ctx.request.query);
  }
  async addemotiontext () {
    this.ctx.body = await this.ctx.service.addemotion.addemotion(this.ctx.request.body);
  }
  async slideuploadurl () {
    this.ctx.body = await this.ctx.service.uploadfile.slideupload(this.ctx.request.query);
  }
  async emotionuploadminimg () {
    this.ctx.body = await this.ctx.service.uploadfile.uploadAbbreviations(this.ctx.request.query);
  }
  async libsimg () {
    this.ctx.body = await this.ctx.service.uploadfile.libsimg(this.ctx.request.query);
  }
  async getlibsimg () {
    this.ctx.body = await this.ctx.service.imglibs.getlibsimg(this.ctx.request.query);
  }
  async deleteimglib () {
    this.ctx.body = await this.ctx.service.imglibs.deleteimglib(this.ctx.request.body);
  }
  async uploadimgtext () {
    this.ctx.body = await this.ctx.service.addemotion.uploadimgtext(this.ctx.request.body);
  }
  async radioppload () {
    this.ctx.body = await this.ctx.service.uploadfile.radioppload(this.ctx.request.query);
  }
  async videoupload () {
    this.ctx.body = await this.ctx.service.uploadfile.videoupload(this.ctx.request.query);
  }
  async getemotiondata () {
    this.ctx.body = await this.ctx.service.addemotion.getemotiondata(this.ctx.request.query);
  }
  async emotiontoexamine () {
    this.ctx.body = await this.ctx.service.addemotion.emotiontoexamine(this.ctx.request.body);
  }
}

module.exports = MenuController;
