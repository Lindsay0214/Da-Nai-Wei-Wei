const db = require('../models');

const { Order, Product, Order_item } = db;

const orderController = {
  addShoppingCart: async (req, res) => {
    try {
      const user_id = req.session.userId;
      const result = await Order.findOrCreate({
        where: { user_id },
        defaults: {
          status: '未完成',
          item_count: 0,
          total_price: 0,
          is_paid: false,
        },
      });
      if (result[1]) {
        // 有新增成功是 true , 已經存在所以沒有新增是 false
        return res.status(200).json({
          ok: 1,
          message: '新的購物車建立成功',
          order_id: result[0].dataValues.id,
        });
      } else {
        return res.status(200).json({
          ok: 1,
          message: '此用戶已有購物車存在',
          order_id: result[0].dataValues.id,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  getOrder: async (req, res) => {
    try {
      const user_id = req.session.userId;
      const result = await Order.findOne({
        where: { user_id },
      });
      if (result === null) {
        return res.json({
          ok: 1,
          message: '這個 user_id 還沒有購物車',
        });
      }
      const { id, status, item_count, total_price, is_paid } = result.dataValues;
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
      console.log(error);
      return res.json({ ok: 0, message: error });
    }
  },
  updateShoppingCart: async (req, res) => {
    try {
      const user_id = req.session.userId;
      const { id: order_id } = await Order.findOne({ where: { user_id } });
      const orderResult = await Order.findOne({
        where: { id: order_id },
        include: Order_item, // 在 Order_item 這張表格裡面，找出 order_id 吻合的全部資料
      });
      const orderItemData = orderResult.Order_items;
      let item_count = 0;
      let total_price = 0;
      for (let i = 0; i < orderItemData.length; i++) {
        const { product_id } = orderItemData[i];
        const productData = await Product.findByPk(product_id);
        total_price += productData.price * orderItemData[i].quantity;
        item_count += orderItemData[i].quantity;
      }
      const result = await Order.update(
        {
          item_count,
          total_price,
        },
        { where: { user_id } }
      );
      if (result[0] === 1) {
        return res.json({
          ok: 1,
          message: '更新購物車成功',
          item_count,
          total_price,
        });
      }
      if (result[0] !== 1) {
        return res.json({
          ok: 1,
          message: '更新購物車失敗',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
  deleteShoppingCart: async (req, res) => {
    try {
      const user_id = req.session.userId;
      if (!user_id) {
        return res.json({ ok: 0, message: '' });
      }
      await Order.destroy({ where: { user_id } });
      return await res.json({
        ok: 1,
        message: '刪除成功',
      });
    } catch (error) {
      console.log(error);
      return res.json({ ok: 0, message: error });
    }
  },
};
module.exports = orderController;
