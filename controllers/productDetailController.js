const db = require('../models');

const { Product_detail } = db;

const productDetailController = {
  // addShoppingCart: async (req, res) => {
  //   try {
  //     const user_id = req.session.userId;
  //     const result = await Order.findOrCreate({
  //       where: { user_id },
  //       defaults: {
  //         status: '未完成',
  //         item_count: 0,
  //         total_price: 0,
  //         is_paid: false
  //       }
  //     });
  //     if (result[1]) {
  //       // 有新增成功是 true , 已經存在所以沒有新增是 false
  //       return res.status(200).json({
  //         ok: 1,
  //         message: '新的購物車建立成功',
  //         order_id: result[0].dataValues.id
  //       });
  //     }
  //     return res.status(200).json({
  //       ok: 1,
  //       message: '此用戶已有購物車存在',
  //       order_id: result[0].dataValues.id
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ ok: 0, message: error });
  //   }
  // },
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
