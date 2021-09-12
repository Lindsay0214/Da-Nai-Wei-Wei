const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      Order.hasMany(models.Order_item, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      item_count: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      is_paid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
