const bcrypt = require('bcrypt');
const { GeneralError, BadRequestError } = require('../middlewares/error/errors');
const db = require('../models');

const saltRounds = 10;

const { User } = db;

const userController = {
  register: async (req, res) => {
    const role = 'consumer';
    const { nickname, password, email } = req.body;
    // 空值檢查;
    if (!email || !nickname || !password || !email.trim() || !nickname.trim() || !password.trim())
      throw new GeneralError('上面欄位，填好，填滿');
    const passwordRegEx = /^(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z]).{8,16}$/;
    if (password && password.search(passwordRegEx) === -1)
      throw new BadRequestError('密碼格式有誤，請再次確認！');
    const emailRegEx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (email && email.search(emailRegEx) === -1)
      throw new BadRequestError('信箱格式有誤，請再次確認！');
    const user = await User.findOne({ where: { email } });
    // 重複帳號檢查;
    if (user) throw new GeneralError('這個帳號有人用了，換一個吧～');
    // hash;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) throw new GeneralError('唉唷！遇到了一些狀況呢...');
      await User.create({ email, nickname, password: hash, role });
      res.json({ ok: 1, email });
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    // 空值檢查
    if (!email || !password || !email.trim() || !password.trim())
      throw new GeneralError('都要填喔，再檢查一下！');

    const user = await User.findOne({ where: { email } });
    // 帳號檢查
    if (!user) throw new BadRequestError('再檢查一下，有地方填錯囉！');
    // hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestError('再檢查一下，有地方填錯囉！');
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ ok: 1, role: user.role });
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.json({ ok: 1, message: '成功登出囉～' });
    });
  },

  getAllInfo: async (req, res) => {
    const users = await User.findAll({
      where: { is_deleted: false },
    });
    if (!users) throw new BadRequestError('唉唷！遇到了一些狀況呢...');
    return res.json({ ok: 1, message: 'success', users });
  },

  getMyInfo: async (req, res) => {
    const { userId } = req.session; // get user id
    const user = await User.findByPk(userId);
    if (!user) throw new BadRequestError('唉唷！遇到了一些狀況呢...');
    return res.status(200).json({ ok: 1, data: user });
  },

  updateMyInfo: async (req, res) => {
    const { userId } = req.session; // get user id
    const { nickname, email, address, creditCard } = req.body;
    if (
      !nickname ||
      !email ||
      !address ||
      !creditCard ||
      !nickname.trim() ||
      !email.trim() ||
      !address.trim() ||
      !creditCard.trim()
    )
      throw new GeneralError('上面欄位，填好，填滿');
    const creditCardRegEx = /\d{4}-?\d{4}-?\d{4}-?\d{4}/g; // 先用最基本的
    if (creditCard && creditCard.search(creditCardRegEx) === -1)
      throw new BadRequestError('信用卡資訊有誤，請再次確認！');
    const emailRegEx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (email && email.search(emailRegEx) === -1)
      throw new BadRequestError('信箱格式有誤，請再次確認！');
    const addressRegEx =
      /(?<city>\D+[縣市])(?<district>\D+?(市區|鎮區|鎮市|[鄉鎮市區]))(?<others>.+)/g;
    if (address && address.search(addressRegEx) === -1)
      throw new BadRequestError('地址格式有誤，請再次確認！');
    console.log('驗證通過');

    const user = await User.findByPk(userId);
    if (!user) throw new BadRequestError('查無此筆資料');
    await user.update({
      nickname,
      email,
      address,
      creditCard,
    });
    return res.json({ ok: 1, message: '個人資料修改成功囉！' });
  },
  // requireLogin: async (req, res) => {
  //   const { userId } = req.session;
  //   const user = await User.findByPk(userId);
  //   return res.json({ ok: 1, message: 'success', user });
  // },
  getMe: async (req, res) => {
    const { userId } = req.session; // get user id
    const user = await User.findByPk(userId);
    if (!user) throw new BadRequestError('唉唷！遇到了一些狀況呢...');
    const { role, email, nickname } = user;
    return res.status(200).json({ ok: 1, role, email, nickname });
  },
  updateURL: async (req, res) => {
    const { userId } = req.session; // get user id
    console.log(userId);
    const { URL } = req.body;
    console.log(URL);
    const user = await User.findByPk(userId);
    console.log(user);
    if (!user) throw new BadRequestError('查無此筆資料');
    await user.update({
      URL,
    });
    return res.json({ ok: 1, message: 'URL 更新成功！' });
  },
  getShops: async (req, res) => {
    const shops = await User.findAll({
      where: { role: 'shop', is_deleted: false },
    });
    const data = shops.map((shop) => {
      return {
        user_id: shop.dataValues.id,
        nickname: shop.dataValues.nickname,
        address: shop.dataValues.address,
        brand_name: shop.dataValues.brand_name,
        URL: shop.dataValues.URL,
      };
    });
    if (!data) throw new BadRequestError('唉唷！遇到了一些狀況呢...');
    return res.json({ ok: 1, message: 'success', data });
  },
  getShop: async (req, res) => {
    const shops = await User.findAll({
      where: { role: 'shop', is_deleted: false },
    });
    const data = shops.map((shop) => {
      return {
        user_id: shop.dataValues.id,
        nickname: shop.dataValues.nickname,
        address: shop.dataValues.address,
        brand_name: shop.dataValues.brand_name,
        URL: shop.dataValues.URL,
      };
    });
    if (!data) throw new BadRequestError('唉唷！遇到了一些狀況呢...');
    return res.json({ ok: 1, message: 'success', data });
  },
};

module.exports = userController;
