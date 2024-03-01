'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Coment, {foreignKey: 'id'});
      User.hasMany(models.Template, {foreignKey: 'id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "member"]
    }
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};