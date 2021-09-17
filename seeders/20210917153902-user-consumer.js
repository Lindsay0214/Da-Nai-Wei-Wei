'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        nickname: 'John Doe',
        password: 'John111',
        email: 'JohnDoe@gmail.com',
        creditcard: '0000-0000-0000-0111',
        address: '台北市快樂區無常街111號3樓',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45'
      },
      {
        nickname: 'Pablo Murphy',
        password: 'Pablo222',
        email: 'PabloMurphy@gmail.com',
        creditcard: '0000-0000-0000-0222',
        address: '台北市快樂區無常街222號3樓',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45'
      },
      {
        nickname: 'Devin McMahon',
        password: 'Devin333',
        email: 'DevinMcMahon@gmail.com',
        creditcard: '0000-0000-0000-0333',
        address: '台北市快樂區無常街333號3樓',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45'
      },
      {
        nickname: 'Brendan Hall',
        password: 'Brendan444',
        email: 'BrendanHall@gmail.com',
        creditcard: '0000-0000-0000-0444',
        address: '台北市快樂區無常街444號3樓',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45'
      },
      {
        nickname: 'Carly McQueen',
        password: 'Carly555',
        email: 'CarlyMcQueen@gmail.com',
        creditcard: '0000-0000-0000-0555',
        address: '台北市快樂區無常街555號3樓',
        createdAt: '2021-09-10 06:05:45',
        updatedAt: '2021-09-18 06:05:45'
      },
      {
        nickname: 'Guerrero',
        password: '666',
        email: 'Guerrero@gmail.com',
        creditcard: '0000-0000-0000-0000',
        address: '台北市快樂區無常街22號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Graver',
        password: 'Graver666',
        email: 'Graver@gmail.com',
        creditcard: '0000-0000-0000-0666',
        address: '台北市快樂區無常街666號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Warner',
        password: 'Warner777',
        email: 'Warner@gmail.com',
        creditcard: '0000-0000-0000-0777',
        address: '台北市快樂區無常街777號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Paul',
        password: 'Paul888',
        email: 'Paul@gmail.com',
        creditcard: '0000-0000-0000-0888',
        address: '台北市快樂區無常街888號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Hunter Hopper',
        password: 'Hunter999',
        email: 'Hunter@gmail.com',
        creditcard: '0000-0000-0000-0999',
        address: '台北市快樂區無常街999號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Griffin',
        password: 'Griffin101010',
        email: 'Griffin@gmail.com',
        creditcard: '0000-0000-0000-1010',
        address: '台北市快樂區無常街101010號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Molly Blanchard',
        password: 'Molly111111',
        email: 'MollyBlanchard@gmail.com',
        creditcard: '0000-0000-0000-1111',
        address: '台北市快樂區無常街1111號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Noelle Blackwood',
        password: 'Noelle121212',
        email: 'NoelleBlackwood@gmail.com',
        creditcard: '0000-0000-0000-1212',
        address: '台北市快樂區無常街1212號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Lindsay',
        password: 'Aa000000',
        email: 'lindsay@gmail.com',
        creditcard: '0000-0000-0000-0000',
        address: '台北市小樹屋區微笑街000號整棟',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Harry',
        password: 'Aa111111',
        email: 'harry@gmail.com',
        creditcard: '0000-0000-0011-1111',
        address: '台北市小樹屋區微笑街黃金屋2號',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Hsuan',
        password: 'Aa222222',
        email: 'hsuan@gmail.com',
        creditcard: '0000-0000-0022-2222',
        address: '台北市小樹屋區微笑街狗屋',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Jason',
        password: 'Aa333333',
        email: 'jason@gmail.com',
        creditcard: '0000-0000-0033-3333',
        address: '台北市小樹屋區微笑街黃金屋2號',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Caroline',
        password: 'Caroline212',
        email: 'Caroline@gmail.com',
        creditcard: '0000-0000-0212-0000',
        address: '台北市快樂區無常街212號212樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Mindy',
        password: 'Mindy213',
        email: 'Mindy@gmail.com',
        creditcard: '0000-0000-0213-0000',
        address: '台北市快樂區無常街213號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
      {
        nickname: 'Brittany',
        password: 'Brittany214',
        email: 'Brittany@gmail.com',
        creditcard: '0000-0000-0214-0000',
        address: '台北市快樂區無常街214號3樓',
        createdAt: '2021-09-18 06:05:45',
        updatedAt: '2021-09-28 06:05:45'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};