const db = require('../models');
const User = db.User;

const adminController = {
  addUser: async (req, res) => {
    const role = 'shop';
    const { nickname, password, email, address, brand_name, Url } = req.body;
    try {
      await User.create({
        nickname,
        password,
        email,
        role,
        address,
        brand_name,
        Url,
      });
      return await res.json({
        message: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { nickname, password, email, role, address, brand_name, Url } =
      req.body;
    try {
      const user = await User.findOne({
        where: { id },
      });
      await user.update({
        nickname,
        password,
        email,
        role,
        address,
        brand_name,
        Url
      });
      return await res.json({
        message: 'success',
      });
    } catch (error) {
      console.log(456)
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
      });
      await user.update({
        is_delete: true
      });
      return await res.json({
        message: 'success',
      });
    } catch (error) {
      console.log(456)
    }
  },
};

module.exports = adminController;
