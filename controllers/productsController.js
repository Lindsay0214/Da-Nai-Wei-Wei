const db = require("../models");
const Product = db.Product;

const productController = {
  // 新增、編輯
  addProduct: async (req, res) => {
    const status = ["售完", "還有很多", "剩下一點"];
    // 根據情況不同，給店家選擇 status
    const { categories, name, price } = req.body;
    if (!categories || !name || !price || !status) {
      console.log("欄位請勿留白");
      // 錯誤處理
      //   req.flash("errorMessage", "欄位請勿留白");
      //   return next();
    }
    try {
      await Product.create({
        categories,
        name,
        price,
        // 這邊先假設售完狀態
        status: status[0],
      });
      return await res.json({
        ok: 1,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      //   req.flash("errorMessage", "錯誤，新增失敗");
      //   return next();
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { categories, name, price, status } = req.body;
    let product;
    if (!categories || !name || !price || !status) {
      console.log("欄位請勿留白");
    }
    try {
      product = await Product.findOne({
        where: { id },
      });
      await product.update({
        categories,
        name,
        price,
        status,
      });
      return await res.json({
        ok: 1,
        message: "success",
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    let product;
    try {
      product = await Product.findOne({
        where: { id, is_deleted: false },
      });
      await product.update({
        is_deleted: true,
      });
      return await res.json({
        ok: 1,
        message: "success",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
