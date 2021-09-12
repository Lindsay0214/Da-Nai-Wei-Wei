const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;

const saltRounds = 10;

const adminController = {
  getAllShops: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { is_deleted: false, role: 'shop' },
      });
      return res.json({ ok: 1, message: 'success', users });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
  addShop: async (req, res) => {
    const role = 'shop';
    const { nickname, password, email, address, brand_name, URL } = req.body;
    if (!nickname || !password || !email || !address || !brand_name || !URL)
      return res.status(400).json({ ok: 0, message: '上面欄位，填好，填滿' });
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) return res.status(400).json({ ok: 0, message: err });
      try {
        await User.create({
          nickname,
          password: hash,
          email,
          role,
          address,
          brand_name,
          URL,
        });
        return res.json({ ok: 1, message: '新增店家成功～' });
      } catch (error) {
        return res.status(400).json({ ok: 0, message: error });
      }
    });
  },
  updateShop: async (req, res) => {
    const { id } = req.params;
    const { nickname, email, address, brand_name, URL } = req.body;
    if (!nickname || !email || !address || !brand_name || !URL)
      return res.status(400).json({ ok: 0, message: '上面欄位，填好，填滿' });
    try {
      const user = await User.findByPk(id);
      await user.update({
        nickname,
        email,
        address,
        brand_name,
        URL,
      });
      return res.json({ ok: 1, message: '修改店家成功～' });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
  deleteShop: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      await user.update({
        is_deleted: true,
      });
      return res.json({ ok: 1, message: '刪除店家成功～' });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
};

module.exports = adminController;
