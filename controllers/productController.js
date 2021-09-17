const { GeneralError, BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const { Product, User } = db;

const productController = {
  // 獲取 shops <測試失敗/暫擱>
  getShops: async (req, res) => {
    try {
      const shops = await User.findAll({
        where: { is_deleted: false, role: 'shop' },
      });
      return res.json({ ok: 1, message: 'success', shops });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
  // 獲取 products
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { is_deleted: false },
      });
      console.log("---------------test---------------------")
      return res.json({ ok: 1, message: 'success', products });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
  // 新增、編輯
  addProduct: async (req, res) => {
    const status = ['售完', '還有很多', '剩下一點'];
    // 根據情況不同，給店家選擇 status
    const { categories, name, price } = req.body;
    if (!categories || !name || !price || !status) throw new GeneralError('上面欄位，填好，填滿');
    const newProduct = await Product.create({
      categories,
      name,
      price,
      // 這邊先假設售完狀態
      status: status[0],
    });
    if (!newProduct) throw new GeneralError('商品新增失敗');
    return res.json({
      ok: 1,
      message: '新增商品成功～',
    });
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
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
};

module.exports = productController;
