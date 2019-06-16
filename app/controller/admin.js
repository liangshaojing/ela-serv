'use strict';

const Controller = require('egg').Controller;

const formatData = data => {
  const vaildKeys = [ 'admin_id', 'username', 'avatar_url', 'is_super_admin' ];

  const newData = Object.create(null);
  for (const [ key, val ] of Object.entries(data.dataValues)) {
    if (vaildKeys.includes(key)) {
      newData[key] = val;
    }
  }
  return newData;
};

class AdminController extends Controller {
  async register() {
    const { ctx } = this;

    const { username, password } = ctx.request.body;
    if (!username || !password) {
      return ctx.failure(400, 'Invalid parameter');
    }

    const admin = await ctx.service.admin.register(username, password);
    ctx.success(201, formatData(admin));
  }

  async login() {
    const { ctx } = this;

    const { username, password } = ctx.request.body;
    if (!username || !password) {
      return ctx.failure(400, 'Invalid parameter');
    }

    const admin = await ctx.service.admin.login(username, password);
    ctx.session.uid = admin.admin_id;
    ctx.session.isSuperAdmin = admin.is_super_admin === 1;
    ctx.success(200, formatData(admin));
  }
}

module.exports = AdminController;
