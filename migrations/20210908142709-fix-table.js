module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'is_deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.changeColumn('Order_items', 'history_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
