const db = require('../models');
const { Order, User } = db;

const orderController = {
  getOrder: async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ ok: 0, message: '沒有帶上 user_id' });
    }
    try {
      const result = await Order.findOne({
        where: { user_id },
      });
      if (result === null) {
        return res.json({
          ok: 1,
          message: '這個 user_id 還沒有購物車',
        });
      }
      const { id, status, item_count, total_price, is_paid } =
        result.dataValues;
      return res.json({
        ok: 1,
        message: '找到了，有一比符合的資料',
        order_id: id, // order 這張表格裡面的 id
        status, // order 這張表格裡面的 status
        item_count, // order 這張表格裡面的 item_count
        total_price, // order 這張表格裡面的 total_price
        is_paid, // order 這張表格裡面的 is_paid
      });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
  addShoppingCart: async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ ok: 0, message: '沒有帶上 user_id' });
    }
    try {
      const result = await Order.create({
        user_id,
        status: '未完成',
        item_count: 0,
        total_price: 0,
        is_paid: false,
      });
      return res.json({
        ok: 1,
        message: 'success',
        order_id: result.dataValues.id, // order 這張表格裡面的 id
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  updateShoppingCart: async (req, res) => {
    const { user_id, item_count, total_price, is_paid } = req.body;
    if (!user_id || !item_count || !total_price || !is_paid) {
      return res.status(400).json({ ok: 0, message: '資料不齊全' });
    }
    try {
      const result = await Order.update({
        user_id,
        item_count,
        total_price,
        is_paid,
      });
      return res.json({
        ok: 1,
        message: 'success',
        order_id: result.dataValues.id, // order 這張表格裡面的 id
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
};
module.exports = orderController;
