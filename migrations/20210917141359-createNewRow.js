'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'uid', {
      type: Sequelize.BIGINT(30)
    });
    await queryInterface.changeColumn('Product_details', 'sweetness', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
