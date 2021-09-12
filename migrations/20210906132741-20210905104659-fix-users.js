module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'is_delete');
    await queryInterface.addColumn('Users', 'is_deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
