'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const uuid = require('uuid');

class AdminService extends Service {
  async register(username, password) {
    const { ctx } = this;

    const admin = await ctx.model.Admin.findOne({
      where: { username },
    });
    if (admin) {
      return ctx.failure(400, 'User name already registered');
    }

    const hash = bcrypt.hashSync(password, 10);
    const data = {
      admin_id: uuid.v4().replace(/-/g, ''),
      username,
      password: hash,
    };
    const adminInfo = await ctx.model.Admin.create(data);
    return adminInfo;
  }


  async login(username, password) {
    const { ctx } = this;

    const admin = await ctx.model.Admin.findOne({
      where: { username },
    });

    if (!admin) {
      return ctx.failure(400, 'Admin does not exist');
    }

    const isValidPassword = bcrypt.compareSync(password, admin.password);
    if (!isValidPassword) {
      return ctx.failure(400, 'Incorrect credential');
    }

    return admin;
  }
}

module.exports = AdminService;
