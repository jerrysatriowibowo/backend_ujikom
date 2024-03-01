'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    static associate(models) {
      Template.belongsTo(models.Categori, {foreignKey: 'id'});
      Template.belongsTo(models.User, {foreignKey: 'id'});
    }
  }
  Template.init({
    title: DataTypes.STRING,
    des: DataTypes.STRING,
    image: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    id_categori: DataTypes.INTEGER,
    source: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};