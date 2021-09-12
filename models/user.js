const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, { foreignKey: 'user_id' });

      User.hasMany(models.Product, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      creditCard: DataTypes.STRING,
      address: DataTypes.STRING,
      brand_name: DataTypes.STRING,
      URL: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
