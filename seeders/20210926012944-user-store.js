'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        nickname: '即時通',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'c@gmail.com',
        creditcard: '0000-0000-0000-0111',
        address: '台北市快樂區無常街111號3樓',
        role: 'shop',
        brand_name: 'Co摳',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        nickname: '浮誇',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: '5@gmail.com',
        creditcard: '0000-0000-0000-0222',
        address: '台北市快樂區無常街222號3樓',
        brand_name: '85嵐',
        role: 'shop',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        nickname: '有點甜',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'l@gmail.com',
        creditcard: '0000-0000-0000-0333',
        address: '台北市快樂區無常街333號3樓',
        role: 'shop',
        brand_name: '親親福全',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        nickname: '卷煙店',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'n@gmail.com',
        creditcard: '0000-0000-0000-0444',
        address: '台北市快樂區無常街444號3樓',
        role: 'shop',
        brand_name: '泥客夏',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
      {
        nickname: '歡迎光臨店',
        password: '$2b$10$TYObVm4oh9XZmwH1Is/ZbO6sygo9zfdsWXPP/M9nNSPvAbJd9IUPu',
        email: 'k@gmail.com',
        creditcard: '0000-0000-0000-0555',
        address: '台北市快樂區無常街555號3樓',
        role: 'shop',
        brand_name: '可以不可以紅茶',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
