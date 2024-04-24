'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categori extends Model {
    static associate(models) {
      Categori.hasMany(models.Template, { foreignKey: 'id_categori' }); // Satu kategori memiliki banyak template
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