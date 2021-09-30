/* eslint-disable no-plusplus */
const iceRange = ['正常冰', '少冰', '微冰', '去冰'];
const sweetnessRange = ['正常糖', '少糖', '半糖', '微糖', '無糖'];
const sizeRange = ['大杯', '中杯'];
const data = [];
let id = 1;
for (let i = 0; i < iceRange.length; i++) {
  for (let j = 0; j < sweetnessRange.length; j++) {
    for (let k = 0; k < sizeRange.length; k++) {
      data.push({
        id,
        ice: iceRange[i],
        sweetness: sweetnessRange[j],
        size: sizeRange[k],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      id++;
    }
  }
}
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Product_details', data);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Product_details', null, {});
  },
};
// 建立 npx sequelize-cli db:seed:all
// 刪除 npx sequelize-cli db:seed:undo:all
