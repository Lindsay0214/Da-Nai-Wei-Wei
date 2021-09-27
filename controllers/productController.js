const { GeneralError, BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Product, User } = db;

const productController = {
  // 獲取 shops <測試失敗/暫擱>
  getShops: async (req, res) => {
    const shops = await User.findAll({
      where: { is_deleted: false, role: 'shop' },
    });
    if (!shops) throw new BadRequestError('查無資料');
    return res.json({ ok: 1, message: 'success', shops });
  },
  // 獲取 products
  getProducts: async (req, res) => {
    const user_id = req.session.userId;
    const products = await Product.findAll({
      where: { user_id, is_deleted: false },
    });
    if (!products) throw new BadRequestError('查無資料');
    return res.json({ ok: 1, message: 'success', products });
  },
  // 新增、編輯
  addProduct: async (req, res) => {
    const user_id = req.session.userId;
    const { categories, name, price, status } = req.body;
    if (!categories || !name || !price || !status) throw new GeneralError('上面欄位，填好，填滿');
    const newProduct = await Product.create({
      categories,
      name,
      price,
      status,
      user_id,
    });
    if (!newProduct) throw new GeneralError('商品新增失敗');
    return res.json({
      ok: 1,
      message: '新增商品成功～',
    });
  },

  getProduct: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id, is_deleted: false },
    });
    if (!product) throw new BadRequestError('找不到此筆商品');
    return res.json({
      ok: 1,
      product: product,
      message: '找到此筆資料～',
    });
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const user_id = req.session.userId;
    const { categories, name, price, status } = req.body;
    if (!categories || !name || !price || !status) throw new GeneralError('上面欄位，填好，填滿');
    const product = await Product.findOne({
      where: { id, is_deleted: false },
    });
    if (!product) throw new BadRequestError('找不到此筆商品');
    await product.update({
      categories,
      name,
      price,
      status,
      user_id,
    });
    return res.json({
      ok: 1,
      message: '更新商品成功～',
    });
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id, is_deleted: false },
    });
    if (!product) throw new BadRequestError('找不到此筆商品');
    await product.update({
      is_deleted: true,
    });
    return res.json({
      ok: 1,
      message: '刪除商品成功～',
    });
  },
  getStoreProducts: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const products = await Product.findAll({
      where: { user_id: id, is_deleted: false },
    });
    if (!products) throw new BadRequestError('查無資料');
    return res.json({ ok: 1, message: 'success', products });
  },
};

module.exports = productController;
