const db = require('../models');
const ecpay_payment = require('../node_modules/ecpay_aio_nodejs/lib/ecpay_payment');
const options = require('../node_modules/ecpay_aio_nodejs/conf/config-example');

const { Order } = db;

const randomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
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
  addOrder: (req, res) => {
    const uid = `${randomValue(10, 99)}1234567890234567${randomValue(10, 99)}`;
    console.log(req.body);
    let ItemName = '';
    const { total, productInfo } = req.body;
    productInfo.forEach((element) => {
      ItemName += `${element.name}/${element.price}/${element.quantity}#`;
    });
    console.log(ItemName);
    const base_param = {
      MerchantTradeNo: uid, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      MerchantTradeDate: onTimeValue(), //ex: 2017/02/13 15:45:30
      TotalAmount: total,
      TradeDesc: '感謝您的訂購',
      ItemName,
      ReturnURL: 'http://localhost:3000/result', // 付款結果通知URL
      // OrderResultURL: 'https://rocky-harbor-38721.herokuapp.com/paymentactionresult', // 在使用者在付款結束後，將使用者的瀏覽器畫面導向該URL所指定的URL
      // EncryptType: 1,
      // ItemURL: 'http://item.test.tw',
      // Remark: '該服務繳費成立時，恕不接受退款。',
      // HoldTradeAMT: '1',
      // StoreID: '',
      // UseRedeem: ''
    };
    const create = new ecpay_payment(options);
    let parameters = {};
    const invoice = {};
    try {
      const htm = create.payment_client.aio_check_out_credit_onetime((parameters = base_param));
      // res.render('payment_action', {
      //     result: htm
      // })
      res.send(htm);
    } catch (err) {
      console.log(err);
      // let error = {
      //     status: '500',
      //     stack: ""
      // }
      // res.render('error', {
      //     message: err,
      //     error: error
      // })
    }
  },
  paymentResult: (req, res) => {
    const rtnCode = req.body.RtnCode;
    const simulatePaid = req.body.SimulatePaid;
    const merchantID = req.body.MerchantID;
    const merchantTradeNo = req.body.MerchantTradeNo;
    const storeID = req.body.StoreID;
    const rtnMsg = req.body.RtnMsg;
    // var tradeNo = req.body.TradeNo;
    const tradeAmt = req.body.TradeAmt;
    // var payAmt = req.body.PayAmt;
    const paymentDate = req.body.PaymentDate;
    const paymentType = req.body.PaymentType;
    // var paymentTypeChargeFee = req.body.PaymentTypeChargeFee;

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
    if (rtnCode === '1' && simulatePaid === '1') {
      // 這部分可與資料庫做互動
      res.json(paymentInfo);
    } else {
      res.json({});
    }
  },
};

module.exports = paymentController;
