const db = require('../models');
const { User } = db;
const userController = {
  getUser: async (req, res) => {
    // 用 email 拿 user_id
    try {
      // const { email } = req.session;
      const email = '123@gmail.com'; // 測試用
      if (!email) {
        return res.status(400).json({ ok: 0, message: '沒有帶上 email' });
      }
      const userData = await User.findOne({ where: { email } });
      if (!userData) {
        return res.status(400).json({ ok: 0, message: '沒有這個 email' });
      }
      const user_id = userData.dataValues.id;
      return {
        ok: 1,
        user_id,
      };
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: 0, message: error });
    }
  },
};
module.exports = userController;
