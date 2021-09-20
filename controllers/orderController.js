const { GeneralError, BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Order, Product, Order_item } = db;

const orderController = {
  addShoppingCart: async (req, res) => {
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
    if (!result) throw new GeneralError('查無此筆資料');
    if (result[1]) {
      // 有新增成功是 true , 已經存在所以沒有新增是 false
      return res.status(200).json({
        ok: 1,
        message: '新的購物車建立成功',
        order_id: result[0].dataValues.id,
      });
    }
    return res.status(200).json({
      ok: 1,
      message: '此用戶已有購物車存在',
      order_id: result[0].dataValues.id,
    });
  },

  getOrder: async (req, res) => {
    const user_id = req.session.userId;
    const result = await Order.findOne({
      where: { user_id },
    });
    if (!result) throw new BadRequestError('查無此筆資料');
    if (result === null) {
      return res.json({
        ok: 1,
        message: '這個 user_id 還沒有購物車',
      });
    }
    const { id, status, item_count, total_price, is_paid } = result.dataValues;
    return res.json({
      ok: 1,
      message: '找到了，有一筆符合的資料',
      order_id: id, // order 這張表格裡面的 id
      status, // order 這張表格裡面的 status
      item_count, // order 這張表格裡面的 item_count
      total_price, // order 這張表格裡面的 total_price
      is_paid, // order 這張表格裡面的 is_paid
    });
  },

  updateShoppingCart: async (req, res) => {
    const user_id = req.session.userId;
    // const { id: order_id } = await Order.findOne({ where: { user_id } });
    const orderResult = await Order.findOne({
      where: { user_id },
      include: Order_item, // 關聯到 Order_item 這張表格
    });
    if (!orderResult) throw new GeneralError('查無此筆資料');
    const orderItemData = orderResult.Order_items;
    console.log(orderItemData[1].product_id);
    let item_count = 0;
    let total_price = 0;
    for (let i = 0; i < orderItemData.length; i += 1) {
      const { product_id } = orderItemData[i];
      // eslint-disable-next-line no-await-in-loop
      const productData = await Product.findByPk(product_id);
      if (!productData) throw new GeneralError('查無此筆資料');
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
  },

  deleteShoppingCart: async (req, res) => {
    const user_id = req.session.userId;
    if (!user_id) throw new GeneralError('查無此筆資料');
    // 這邊只有刪除 Order 沒有把 order-items 刪掉，之後看需不需要
    await Order.destroy({ where: { user_id } });
    return res.json({
      ok: 1,
      message: '刪除成功',
    });
  },
};
module.exports = orderController;
