const { GeneralError, BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Order_item, Order, Product, Product_detail } = db;
const orderItemController = {
  addOrderItem: async (req, res) => {
    try {
      const user_id = req.session.userId;
      const { id: order_id } = await Order.findOne({ where: { user_id, is_paid: false } });
      if (!order_id) {
        return res.status(400).json({
          ok: 0,
          message: '此用戶沒有 order_id',
        });
      }
      const { product_id, detail_id, quantity } = req.body;
      if (quantity <= 0) {
        res.status(400).json({
          ok: 0,
          message: '數量不得為 0 或是負數',
        });
      }
      if (!product_id || !detail_id || !quantity) {
        return res.status(400).json({
          ok: 0,
          message: '商品編號或是冰糖編號或是數量沒有填寫',
        });
      }
      const result = await Order_item.create({
        order_id,
        product_id,
        detail_id,
        quantity,
      });
      return res.status(200).json({
        ok: 1,
        message: '新的物品已加入購物車',
      });
    } catch (err) {
      return res.status(200).json({
        ok: 1,
        message: '此物品已存在購物車裡面',
      });
    }
  },
  getOrderItem: async (req, res, next) => {
    const user_id = req.session.userId;
    const firstResult = await Order.findOne({ where: { user_id, is_paid: false } });
    console.log(firstResult);
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
    const data = result.Order_items;
    const productInfo = [];
    for (let i = 0; i < data.length; i += 1) {
      const { product_id } = data[i];
      const { detail_id } = data[i];
      const order_item_id = data[i].id;
      // eslint-disable-next-line no-await-in-loop
      const productData = await Product.findByPk(product_id);
      const productDetail = await Product_detail.findByPk(detail_id);
      const { ice, sweetness, size } = productDetail;
      if (!productData) throw new BadRequestError('查無此筆資料');
      productInfo.push({
        name: productData.name,
        price: productData.price,
        quantity: data[i].quantity,
        detail_id,
        ice,
        sweetness,
        size,
        order_item_id,
      });
    }
    return res.json({
      ok: 1,
      message: '查詢成功',
      data,
      productInfo,
      count: data.length,
    });
  },
  getSingleOrderItem: async (req, res, next) => {
    const { id } = req.params;
    const result = await Order_item.findOne({
      where: { id },
      include: [Product, Product_detail], // 關聯到 Product 這張表格
    });
    const { quantity } = result.dataValues;
    const { name: productName, price } = result.Product.dataValues;
    const { ice, sweetness, size } = result.Product_detail.dataValues;
    const data = { order_item_id: result.id, productName, price, ice, sweetness, size, quantity };
    return res.json({
      ok: 1,
      message: '查詢成功',
      data,
    });
  },
  updateOrderItem: async (req, res) => {
    const { id, detail_id, quantity } = req.body;
    if (quantity <= 0) {
      res.status(400).json({
        ok: 0,
        message: '數量不得為 0 或是負數',
      });
    }
    if (!id || !detail_id || !quantity)
      throw new GeneralError('order_item 的 id 或 detail_id 或 quantity 沒有填寫');
    await Order_item.update({ detail_id, quantity }, { where: { id } });
    return res.json({
      ok: 1,
      message: '修改成功',
    });
  },
  deleteOrderItem: async (req, res) => {
    const { id } = req.body; // 如果資料庫沒有這個 id ，執行 sql 語句也不會發生事情，就不用處理囉？！
    if (!id) throw new GeneralError('id 沒有填寫');
    await Order_item.destroy({ where: { id } });
    return res.json({
      ok: 1,
      message: '刪除成功',
    });
  },

  getOrderHistory: async (req, res) => {
    const { orderId } = req.params;
    const ordersBelowCart = await Order_item.findAll({
      where: { order_id: orderId },
      include: [Product],
    });
    const targetProductArr = [];
    if (!ordersBelowCart) throw new BadRequestError('查無此筆購物車資料，請稍候再重新整理');
    for (let i = 0; i < ordersBelowCart.length; i += 1) {
      targetProductArr.push({
        name: ordersBelowCart[i].dataValues.Product.name,
        price: ordersBelowCart[i].dataValues.Product.price,
      });
    }
    return res.json({
      ok: 1,
      message: '查詢成功',
      targetProductArr,
    });
  },
};
module.exports = orderItemController;
