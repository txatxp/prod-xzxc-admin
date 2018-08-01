'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.emotion.emotionlist();
  }
  async isIOS() {
    this.ctx.body = 'isIOS: ${{this.ctx.isIOS}}';
  }
  async render() {
    const ctx = this.ctx;
    await ctx.render('news/list.tpl');
  }
  async isQ (ctx,next) {
    console.log(next, 'next')
    console.log(this.ctx.next)
  }
}

module.exports = HomeController;
