const { BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Products, Order, Order_item, Product_history, Product_detail } = db;

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
    // if (!result) throw new BadRequestError('查無此筆資料');
    // const data = result.Order_items;
    // const productInfo = [];
    // for (let i = 0; i < data.length; i += 1) {
    //   const { product_id } = data[i];
    //   const { detail_id } = data[i];
    //   const order_item_id = data[i].id;
    //   // eslint-disable-next-line no-await-in-loop
    //   const productData = await Product.findByPk(product_id);
    //   // eslint-disable-next-line no-await-in-loop
    //   const productDetail = await Product_detail.findByPk(detail_id);
    //   const { ice, sweetness, size } = productDetail;
    //   if (!productData) throw new BadRequestError('查無此筆資料');
    //   productInfo.push({
    //     name: productData.name,
    //     price: productData.price,
    //     quantity: data[i].quantity,
    //     detail_id,
    //     ice,
    //     sweetness,
    //     size,
    //     order_item_id,
    //   });
    // }
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
