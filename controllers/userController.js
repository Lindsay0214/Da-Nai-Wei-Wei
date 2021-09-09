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
        await User.create({ email, nickname, password: hash });
        res.json({ ok: 1, email });
      });
    } catch (err) {
      console.log('唉唷！遇到了一些狀況呢...', err);
      res.status(400).json({ ok: 0, message: '失敗' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    // 空值檢查
    if (!email || !password) return res.json({ ok: 0, message: '都要填喔，再檢查一下！' });
    try {
      const user = await User.findOne({ where: { email } });
      // 帳號檢查
      if (!user) return res.json({ ok: 0, message: '再檢查一下，有地方填錯囉！' });
      // hash
      bcrypt.compare(password, user.password, async (err, isSuccess) => {
        if (err || !isSuccess) return res.json({ ok: 0, message: '再檢查一下，有地方填錯囉！' });
        req.session.email = email;
        res.json({ ok: 1, email });
      });
    } catch (err) {
      console.log('唉唷！遇到了一些狀況呢...', err);
      return res.status(400).json({ ok: 0, message: '失敗' });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.json({ ok: 1, message: '成功登出囉～' });
  },
};

module.exports = userController;
