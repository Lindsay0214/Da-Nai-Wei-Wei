const checkPermission = (roleName) => async (req, res, next) => {
  const { role } = req.session;
  if (!role) return res.status(400).json({ ok: 0, message: 'User not found' });
  switch (roleName) {
    case 'isAdmin':
      if (req.session.role !== 'admin')
        return res.status(400).json({ ok: 0, message: 'permission denied' });
      next();
      break;
    case 'isShop':
      if (req.session.role !== 'shop')
        return res.status(400).json({ ok: 0, message: 'permission denied' });
      next();
      break;
    default:
      next();
  }
};

module.exports = checkPermission;
