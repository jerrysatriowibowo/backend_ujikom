'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categori extends Model {
    static associate(models) {
      Categori.belongsTo(models.Template, {foreignKey: 'id'});
    }
  }
  Categori.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categori',
  });
  return Categori;
};