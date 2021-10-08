'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Order_items', 'history_id');
    await queryInterface.addColumn('Order_items', 'history_price', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Order_items', 'history_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
