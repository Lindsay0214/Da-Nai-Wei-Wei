const { BadRequestError, UnauthorizedError } = require('./error/errors');

const checkPermission = (roleName) => async (req, res, next) => {
  const { role } = req.session;
  if (!role) throw new BadRequestError('找不到使用者');
  switch (roleName) {
    case 'isAdmin':
      if (req.session.role !== 'admin') throw new UnauthorizedError('permission denied');
      next();
      break;
    case 'isShop':
      if (req.session.role !== 'shop') throw new UnauthorizedError('permission denied');
      next();
      break;
    case 'isConsumer':
      if (req.session.role !== 'consumer') throw new UnauthorizedError('permission denied');
      next();
      break;
    default:
      next();
  }
};

module.exports = checkPermission;
