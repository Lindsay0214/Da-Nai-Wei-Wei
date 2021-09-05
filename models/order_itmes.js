"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_items.belongsTo(models.Orders);
      Order_items.belongsTo(models.Products);
      Order_items.belongsTo(models.Products_history);
      Order_items.belongsTo(models.Product_details);
    }
  }
  Order_items.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      history_id: DataTypes.INTEGER,
      detail_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_items",
    }
  );
  return Order_items;
};
