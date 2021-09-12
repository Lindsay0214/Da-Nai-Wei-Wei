module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Order_items', 'histroy_id');
    await queryInterface.addColumn('Order_items', 'history_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Order_items');
  },
};
