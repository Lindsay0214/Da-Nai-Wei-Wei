const { BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Products, Order_item, Product_history } = db;

const productHistoryController = {
  addProductHistory: async (req, res) => {
    const { targetProductArr } = req.body;
    let result;
    if (!targetProductArr) throw new BadRequestError('查詢失敗，請稍候再重試');
    targetProductArr.forEach((each) => {
      result = Product_history.create({
        name: each.name,
        price: each.price,
      });
    });
    if (!result) throw new BadRequestError('歷史訂單寫入失敗，請稍候再重試');
    return res.json({
      ok: 1,
      message: '歷史訂單寫入成功',
    });
  },

  getProductHistory: async (req, res) => {
    const { orderId } = req.body;
    if (!orderId) throw new BadRequestError('查詢失敗，請稍候再重試');
    const result = Product_history.findOne({
      where: {
        id: orderId,
      },
    });
    if (!result) throw new BadRequestError('查詢失敗，請稍候再重試');
    return res.json({
      ok: 1,
      message: '歷史訂單 gotcha!',
    });
  },
};

module.exports = productHistoryController;
