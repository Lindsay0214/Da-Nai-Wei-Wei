const bcrypt = require('bcrypt');
const { BadRequestError, GeneralError } = require('../middlewares/error/errors');
const db = require('../models');

const { User } = db;

const saltRounds = 10;

const adminController = {
  getAllShops: async (req, res) => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      where: { is_deleted: false, role: 'shop' },
    });
    if (!users) throw new BadRequestError('找不到使用者');
    return res.json({ ok: 1, message: 'success', users });
  },
  getShop: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new GeneralError('查無此店家');
    return res.json({ ok: 1, message: 'success', user });
  },
  addShop: async (req, res) => {
    const role = 'shop';
    const { nickname, password, email, address, brand_name, URL } = req.body;
    if (!nickname || !password || !email || !address || !brand_name || !URL)
      throw new GeneralError('上面欄位，填好，填滿');
    const validPassword = bcrypt.hash(password, saltRounds);
    if (!validPassword) throw new GeneralError('新增店家失敗');
    const newShop = await User.create({
      nickname,
      password: validPassword,
      email,
      role,
      address,
      brand_name,
      URL,
    });
    return res.json({ ok: 1, message: '新增店家成功～' });
  },
  updateShop: async (req, res) => {
    const { id } = req.params;
    const { address, brand_name } = req.body;
    if (!address || !brand_name) throw new GeneralError('上面欄位，填好，填滿');
    const user = await User.findByPk(id);
    await user.update({
      address,
      brand_name,
    });
    if (!user) throw new BadRequestError('查無此店家');
    return res.json({ ok: 1, message: '修改店家成功～' });
  },

  deleteShop: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new GeneralError('查無此店家');
    await user.update({
      is_deleted: true,
    });
    return res.json({ ok: 1, message: '刪除店家成功～' });
  },
};

module.exports = adminController;
