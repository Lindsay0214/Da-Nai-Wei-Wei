const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;

const { User } = db;

const userController = {
  register: async (req, res) => {
    const role = 'consumer';
    const { nickname, password, email } = req.body;
    // 空值檢查
    if (!email || !nickname || !password || !email.trim() || !nickname.trim() || !password.trim())
      res.json({ ok: 0, message: '上面欄位，填好，填滿' });
    try {
      const user = await User.findOne({ where: { email } });
      // 重複帳號檢查
      if (user) return res.json({ ok: 0, message: '這個帳號有人用了，換一個吧～' });
      // hash
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) return res.json({ ok: 0, message: err });
        await User.create({ email, nickname, password: hash, role });
        res.json({ ok: 1, email });
      });
    } catch (error) {
      console.log('唉唷！遇到了一些狀況呢...', error);
      res.status(400).json({ ok: 0, message: '失敗' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    // 空值檢查
    if (!email || !password || !email.trim() || !password.trim())
      return res.json({ ok: 0, message: '都要填喔，再檢查一下！' });
    try {
      const user = await User.findOne({ where: { email } });
      // 帳號檢查
      if (!user) return res.json({ ok: 0, message: '再檢查一下，有地方填錯囉！' });
      // hash
      bcrypt.compare(password, user.password, async (err, isSuccess) => {
        if (err || !isSuccess) return res.json({ ok: 0, message: '再檢查一下，有地方填錯囉！' });
        req.session.userId = user.id;
        req.session.role = user.role;
        res.json({ ok: 1, id: user.id });
      });
    } catch (error) {
      console.log('唉唷！遇到了一些狀況呢...', error);
      return res.status(400).json({ ok: 0, message: '失敗' });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.json({ ok: 1, message: '成功登出囉～' });
  },

  getAllInfo: async (req, res) => {
    try {
      const users = await User.findAll({
        where: { is_deleted: false },
      });
      return res.json({ ok: 1, message: 'success', users });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },

  getMyInfo: async (req, res) => {
    const { userId } = req.session; // get user id
    try {
      const user = await User.findByPk(userId);
      return res.status(200).json({ ok: 1, data: user });
    } catch (error) {
      console.log('唉唷！遇到了一些狀況呢...', error);
      res.status(400).json({ ok: 0, message: '失敗' });
    }
  },

  updateMyInfo: async (req, res) => {
    const { id } = req.params; // get user id
    const { nickname, email, address, creditcard } = req.body;

    if (
      !nickname ||
      !email ||
      !address ||
      !creditcard ||
      !nickname.trim() ||
      !email.trim() ||
      !address.trim() ||
      !creditcard.trim()
    )
      return res.status(400).json({ ok: 0, message: '上面欄位，填好，填滿' });

    const creditcardRegEx = /\d{4}-?\d{4}-?\d{4}-?\d{4}/g; // 先用最基本的
    if (creditcard && creditcard.search(creditcardRegEx) === -1) {
      return res.status(400).json({ ok: 0, message: '信用卡資訊有誤，請再次確認！' });
    }
    const emailRegEx = /^([\w]+)(.[\w]+)*@([\w]+)(.[\w]{2,3}){1,2}$/g;
    if (email && email.search(emailRegEx) === -1) {
      return res.status(400).json({ ok: 0, message: '信箱格式有誤，請再次確認！' });
    }
    const addressRegEx =
      /(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(?<others>.+)/g;
    if (address && address.search(addressRegEx) === -1) {
      return res.status(400).json({ ok: 0, message: '地址格式有誤，請再次確認！' });
    }
    console.log('驗證通過');
    try {
      const user = await User.findByPk(id);
      await user.update({
        nickname,
        email,
        address,
        creditcard,
      });
      return res.json({ ok: 1, message: '個人資料修改成功囉！' });
    } catch (error) {
      return res.status(400).json({ ok: 0, message: error });
    }
  },
};

module.exports = userController;
