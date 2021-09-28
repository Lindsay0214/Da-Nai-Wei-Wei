'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1000,
        nickname: '',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'c@gmail.com',
        creditcard: '0000-0000-0000-0111',
        address: '台北市快樂區無常街111號3樓',
        role: 'shop',
        brand_name: '麻谷茶坊',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        id: 1001,
        nickname: '',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: '5@gmail.com',
        creditcard: '0000-0000-0000-0222',
        address: '台北市快樂區無常街222號3樓',
        brand_name: '50嵐',
        role: 'shop',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        id: 1002,
        nickname: '',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'n@gmail.com',
        creditcard: '0000-0000-0000-0444',
        address: '台北市快樂區無常街444號3樓',
        role: 'shop',
        brand_name: '迷客夏',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
