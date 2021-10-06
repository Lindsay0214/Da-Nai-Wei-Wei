/* eslint-disable new-cap */
const { customAlphabet } = require('nanoid');
const db = require('../models');
const ecpay_payment = require('../node_modules/ecpay_aio_nodejs/lib/ecpay_payment');
const options = require('../node_modules/ecpay_aio_nodejs/conf/config-example');
const { BadRequestError } = require('../middlewares/error/errors');

const { Order, Order_item, Product } = db;

const onTimeValue = function () {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  return [
    date.getFullYear(),
    `/${mm > 9 ? '' : '0'}${mm}`,
    `/${dd > 9 ? '' : '0'}${dd}`,
    ` ${hh > 9 ? '' : '0'}${hh}`,
    `:${mi > 9 ? '' : '0'}${mi}`,
    `:${ss > 9 ? '' : '0'}${ss}`,
  ].join('');
};
const paymentController = {
  addOrder: async (req, res) => {
    const nanoid = customAlphabet(process.env.RANDOM, 20);
    const uid = nanoid();
    const user_id = req.session.userId;
    const { id: order_id } = await Order.findOne({ where: { user_id, is_paid: false } });
    const result = await Order.findOne({
      where: { id: order_id },
      include: [Order_item], // 在 Order_item 這張表格裡面，找出 order_id 吻合的全部資料
    });
    if (!result) throw new BadRequestError('查無此筆資料');
    await result.update({
      uid,
    });
    const data = result.Order_items;
    const productInfo = [];
    for (let i = 0; i < data.length; i += 1) {
      const { product_id } = data[i];
      // eslint-disable-next-line no-await-in-loop
      const productData = await Product.findByPk(product_id);
      if (!productData) throw new BadRequestError('查無此筆資料');
      productInfo.push({
        name: productData.name,
        price: productData.price,
        quantity: data[i].quantity,
      });
    }
    let ItemName = '';
    productInfo.forEach((element) => {
      ItemName += `${element.name}/${element.price}/${element.quantity}#`;
    });
    const base_param = {
      MerchantTradeNo: uid, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      MerchantTradeDate: onTimeValue(), // ex: 2017/02/13 15:45:30
      TotalAmount: `${result.total_price}`,
      TradeDesc: '感謝您的訂購',
      ItemName,
      ReturnURL: 'https://da-nai-wei-wei.herokuapp.com/result', // 付款結果通知URL
    };
    const create = new ecpay_payment(options);
    let parameters = {};
    const htm = create.payment_client.aio_check_out_credit_onetime((parameters = base_param));
    if (!htm) throw new BadRequestError('查無此筆資料');
    res.send(htm);
  },

  paymentResult: async (req, res) => {
    const merchantID = req.body.MerchantID;
    const merchantTradeNo = req.body.MerchantTradeNo;
    const storeID = req.body.StoreID;
    const rtnMsg = req.body.RtnMsg;
    const tradeAmt = req.body.TradeAmt;
    const paymentDate = req.body.PaymentDate;
    const paymentType = req.body.PaymentType;

    const paymentInfo = {
      merchantID: merchantID,
      merchantTradeNo: merchantTradeNo,
      storeID: storeID,
      rtnMsg: rtnMsg,
      paymentDate: paymentDate,
      paymentType: paymentType,
      tradeAmt: tradeAmt,
    };
    console.log(paymentInfo);
    if (rtnMsg === '交易成功') {
      // 這部分可與資料庫做互動
      const target = await Order.findOne({ where: { uid: merchantTradeNo } });
      return target.update({ is_paid: true });
    }
    res.json({ rtnMsg });
  },
};

module.exports = paymentController;
