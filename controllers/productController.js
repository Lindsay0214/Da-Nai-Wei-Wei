const db = require('../models');
const { Product } = db;

const productController = {
  // 新增、編輯
  addProduct: async (req, res) => {
    const status = ['售完', '還有很多', '剩下一點'];
    // 根據情況不同，給店家選擇 status
    const { categories, name, price } = req.body;
    if (!categories || !name || !price || !status) {
      return res.status(400).json({ ok: 0, message: '上面欄位，填好，填滿' });
    }
    try {
      await Product.create({
        categories,
        name,
        price,
        // 這邊先假設售完狀態
        status: status[0],
      });
      return res.json({
        ok: 1,
        message: '新增商品成功～',
      });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: err });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { categories, name, price, status } = req.body;
    if (!categories || !name || !price || !status) {
      return res.status(400).json({ ok: 0, message: '上面欄位，填好，填滿' });
    }
    try {
      const product = await Product.findOne({
        where: { id, is_deleted: false },
      });
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
    } catch (error) {
      return res.status(400).json({ ok: 0, message: err });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findOne({
        where: { id, is_deleted: false },
      });
      await product.update({
        is_deleted: true,
      });
      return res.json({
        ok: 1,
        message: '刪除商品成功～',
      });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: err });
    }
  },
};

module.exports = productController;
