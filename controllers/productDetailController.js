const db = require('../models');

const { Product_detail } = db;

const productDetailController = {
  getProductDetail: async (req, res) => {
    try {
      const { size, sweetness, ice } = req.params;
      const result = await Product_detail.findOne({
        where: { size, sweetness, ice },
      });
      if (result === null) {
        return res.json({
          ok: 0,
          message: '沒有相對應的 size, sweetness, ice',
        });
      }
      const { id: detail_id } = result.dataValues;
      return res.json({
        ok: 1,
        message: '找到了，有一比符合的資料',
        detail_id,
      });
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: error });
    }
  },
};
module.exports = productDetailController;
