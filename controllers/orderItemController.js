const db = require('../models');
const { Order_item } = db;
const orderItemController = {
  addOrderItem: async (req, res) => {
    const { order_id, product_id, detail_id, quantity } = req.body;
    if (!order_id || !product_id || !detail_id || !quantity) {
      return res.status(400).json({
        ok: 0,
        message: '購物車編號或是商品編號或是冰糖編號或是數量沒有填寫',
      });
    }
    try {
      await Order_item.create({
        order_id,
        product_id,
        history_id: 0, // 用 null sql 語句會說不能是 null
        detail_id,
        quantity,
      });
      return res.json({
        ok: 1,
        message: '新增 order_item 成功',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  getOrderItem: async (req, res) => {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).json({
        ok: 0,
        message: 'order_id 沒有填寫',
      });
    }
    try {
      const result = await Order_item.findAll({
        where: { order_id },
      });
      let data = [];
      for (let i = 0; i < result.length; i++) {
        const { order_id, product_id, detail_id, quantity } =
          result[i].dataValues;
        data.push({ order_id, product_id, detail_id, quantity });
      }
      console.log(data);
      return res.json({
        ok: 1,
        message: '新增 order_item 成功',
        data, // 可以看出有幾筆資料，每一筆資料包含 product_id, detail_id, quantity
        // 如果這個 order_id 底下沒有 order_item 的話， data 會是空陣列
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  updateOrderItem: async (req, res) => {
    const { id, detail_id, quantity } = req.body;
    if (!id || !detail_id || !quantity) {
      return res.status(400).json({
        ok: 0,
        message: 'order_item 的 id 或 detail_id 或 quantity 沒有填寫',
      });
    }
    try {
      await Order_item.update({ detail_id, quantity }, { where: { id } });
      return res.json({
        ok: 1,
        message: '修改成功',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  deleteOrderItem: async (req, res) => {
    const { id } = req.body; // 如果資料庫沒有這個 id ，執行 sql 語句也不會發生事情，就不用處理囉？！
    if (!id) {
      return res.status(400).json({
        ok: 0,
        message: 'id 沒有填寫',
      });
    }
    try {
      await Order_item.destroy({ where: { id } });
      return await res.json({
        ok: 1,
        message: '刪除成功',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
};
module.exports = orderItemController;
