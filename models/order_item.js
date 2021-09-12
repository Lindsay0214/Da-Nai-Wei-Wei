const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_item.belongsTo(models.Order, { foreignKey: 'order_id' });
      Order_item.belongsTo(models.Product, { foreignKey: 'product_id' });
      Order_item.belongsTo(models.Product_history, {
        foreignKey: 'history_id',
      });
      Order_item.belongsTo(models.Product_detail, {
        foreignKey: 'detail_id',
      });
    }
  }
  Order_item.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      history_id: DataTypes.INTEGER,
      detail_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order_item',
    }
  );
  return Order_item;
};
