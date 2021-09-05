"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_details.hasMany(models.Order_items);
    }
  }
  Product_details.init(
    {
      ice: DataTypes.STRING,
      sweetness: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_details",
    }
  );
  return Product_details;
};
