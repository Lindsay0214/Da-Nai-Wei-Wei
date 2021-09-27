'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        categories: '奶茶',
        name: 'co摳的奶茶',
        user_id: 191, // 用 seeder 灌資料的話會出錯
        price: 50,
        status: '還有',
        is_deleted: 0,
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        categories: '綠茶',
        name: 'co摳的綠茶',
        user_id: 191,
        price: 50,
        status: '還有',
        is_deleted: 0,
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        categories: '紅茶',
        name: 'co摳的紅茶',
        user_id: 191,
        price: 50,
        status: '還有',
        is_deleted: 0,
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
