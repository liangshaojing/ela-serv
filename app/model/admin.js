'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Admin = app.model.define('admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    admin_id: { type: STRING(255) },
    username: { type: STRING(30) },
    password: { type: STRING(255) },
    created_at: { type: DATE, defaultValue: NOW },
    updated_at: { type: DATE, defaultValue: NOW },
    avatar_url: { type: STRING(255), defaultValue: 'http://thirdwx.qlogo.cn/mmopen/2nmqEIXKCRKXib7K9CmAq3XBcGyA8Raq9Fr7WkjziaicBfYDN5Atxdf6QGhBK1j7MZAzO3vspPRTSAIfZ4A3oicYr9Qpxt6nmMJa/132' },
    is_super_admin: { type: INTEGER, defaultValue: 0 },
  }, {
    freezeTableName: true, // 不自动将表名添加复数
  });

  return Admin;
};
