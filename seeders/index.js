"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          nickname: "茶湯會公館店",
          password: "123",
          email: "123@gmail.com",
          role: "shop",
          address: "台北市陽光里快樂路 13 巷",
          brand_name: "茶湯會",
          URL: "drinkGoodTea.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
