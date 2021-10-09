const { BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Order, Order_item, Product_history, Product_detail } = db;

const productHistoryController = {
  addProductHistory: async (req, res) => {
    const targetProductArr = req.body;
    let result;
    let tempArr = [];
    if (!targetProductArr) throw new BadRequestError('沒有帶上需要的資料');
    targetProductArr.forEach(async (each) => {
      result = await Product_history.create({
        name: each.name,
        price: each.price,
      });
      tempArr.push(result);
    });
    if (!result) throw new BadRequestError('歷史訂單寫入失敗，請稍候再重試');
    return res.json({
      ok: 1,
      message: '歷史訂單寫入成功',
    });
  },
  getProductHistory: async (req, res) => {
    const user_id = req.session.userId;
    const { orderId } = req.params;
    const firstResult = await Order_item.findAll({
      where: { order_id: orderId },
      include: [Product_history, Product_detail],
    });
    if (!firstResult) {
      return res.json({
        ok: 1,
        message: '查詢成功',
        count: 0,
      });
    }
    const { id } = firstResult;
    const result = await Order.findOne({
      where: { id },
      include: [Order_item], // 在 Order_item 這張表格裡面，找出 order_id 吻合的全部資料
    });
    if (!result) throw new BadRequestError('查無此筆資料');
    return res.json({
      ok: 1,
      message: '查詢成功',
      data,
      productInfo,
      count: data.length,
    });
  },
};

module.exports = productHistoryController;
