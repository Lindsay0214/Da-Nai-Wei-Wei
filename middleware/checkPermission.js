const db = require('../models');
const { User } = db;

const checkPermission = (role) => async(req, res, next) => {
    const { email } = req.session
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(400).json({"ok":0,"message":"User not found"});
    switch (role) {
      case 'isAdmin':
        if (req.user.role !== 'admin') return res.status(400).json({"ok":0,"message":"permission denied"});
        next();
        break;
      case 'isShop':
        if (req.user.role !== 'shop') return res.status(400).json({"ok":0,"message":"permission denied"});
        next();
        break;
      default:
        next();
    }
  }

  module.exports = checkPermission;