"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.hasMany(models.Order_item);
    }
  }
  Product.init(
    {
      categories: DataTypes.STRING,
      name: DataTypes.STRING,
      user_id: DataTypes.NUMBER,
      price: DataTypes.NUMBER,
      status: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
