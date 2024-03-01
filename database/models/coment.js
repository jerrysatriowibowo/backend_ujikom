'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coment extends Model {
    static associate(models) {
      Coment.hasMany(models.User, {foreignKey: 'id'});
    }
  }
  Coment.init({
    des: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Coment',
  });
  return Coment;
};