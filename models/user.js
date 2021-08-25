'use strict';
const {hashPassword} = require("../helpers/bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Item, {foreignKey: "sellerId"})
      User.belongsToMany(models.Item, {through: models.Wishlist, foreignKey: "buyerId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: "email is required" },
        isEmail: { msg: "Should be email format" },
        notNull: { msg: "email is required" },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "password is required" },
        notNull: { msg: "password is required" }
      }
    },
    steamId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "steamId is required" },
        notNull: { msg: "steamId is required" }
      }
    },
    steamURL: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};