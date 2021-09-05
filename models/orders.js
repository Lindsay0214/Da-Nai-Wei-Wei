"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users);
      Orders.hasMany(models.Order_items);
    }
  }
  Orders.init(
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      item_count: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      is_paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
