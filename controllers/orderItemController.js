const db = require('../models');
const { getOrderId } = require('./orderController');
const { Order_item, Order } = db;
const orderItemController = {
  gg: async (req, res) => {
    try {
      const aa = await getOrderId();
      console.log(aa);
    } catch (error) {
      console.log(error);
      return res.json(123);
    }
  },
  addOrderItem: async (req, res) => {
    try {
      const { ok, order_id } = await orderController.getOrderId();
      if (ok === 0) {
        return res.status(200).json({
          ok: 0,
          message: '某個地方出錯了',
        });
      }
      const { product_id, detail_id, quantity } = req.body;
      if (!product_id || !detail_id || !quantity) {
        return res.status(400).json({
          ok: 0,
          message: '商品編號或是冰糖編號或是數量沒有填寫',
        });
      }
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
    try {
      const { ok, order_id } = await orderController.getOrderId();
      if (ok === 0) {
        return res.status(200).json({
          ok: 0,
          message: '某個地方出錯了',
        });
      }
      const result = await Order.findOne({
        where: { id: order_id },
        include: Order_item, // 在 Order_item 這張表格裡面，找出 order_id 吻合的全部資料
      });
      const data = result.Order_items;
      return res.json({
        ok: 1,
        message: '查詢成功',
        data,
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
  getOrderItemObjectType: async (req, res) => {
    try {
      const { ok, order_id } = await orderController.getOrderId();
      if (ok === 0) {
        return {
          ok: 0,
          message: '某個地方出錯了',
        };
      }
      const result = await Order.findOne({
        where: { id: order_id },
        include: Order_item, // 在 Order_item 這張表格裡面，找出 order_id 吻合的全部資料
      });
      const data = result.Order_items;
      return {
        ok: 1,
        message: '查詢成功',
        data,
      };
    } catch (error) {
      console.log(error);
      return { ok: 0, message: error };
    }
  },
};
module.exports = orderItemController;
