const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_detail.hasMany(models.Order_item, {
        foreignKey: 'detail_id',
      });
    }
  }
  Product_detail.init(
    {
      ice: DataTypes.STRING,
      sweetness: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product_detail',
    }
  );
  return Product_detail;
};
