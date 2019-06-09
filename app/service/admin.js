'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const uuid = require('uuid');

class AdminService extends Service {
  async register(username, password) {
    const { ctx } = this;

    if (!username || !password) {
      return ctx.failure(400, 'Invalid parameter')
    }
    const admin = await ctx.model.Admin.findOne({
        where: { username }
    });
    if (admin) {
      return ctx.failure(400, 'User name already registered');
    }

    const hash = bcrypt.hashSync(password, 10);
    const data = {
        admin_id: uuid.v4().replace(/-/g, ''),
        username,
        password: hash
    }
    const adminInfo = await ctx.model.Admin.create(data);
    ctx.success(201, adminInfo);
  }
}

module.exports = AdminService;
