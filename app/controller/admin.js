'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async register() {
    const { ctx } = this;

    const { username, password } = ctx.request.body;
    await ctx.service.admin.register(username, password);
  }
}

module.exports = AdminController;
