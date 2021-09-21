const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController'); // 引入 controller 檔案
const orderItemController = require('../controllers/orderItemController');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const checkPermission = require('../middlewares/checkPermission');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');
const productDetailController = require('../controllers/productDetailController');
const { catchAsyncError } = require('../middlewares/error/errors');

router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

// Shop

router.get(
  '/shops',
  catchAsyncError(checkPermission('isAdmin')),
  catchAsyncError(adminController.getAllShops)
);
router.post(
  '/shops',
  catchAsyncError(checkPermission('isAdmin')),
  catchAsyncError(adminController.addShop)
);
router.patch(
  '/shops/:id',
  catchAsyncError(checkPermission('isAdmin')),
  catchAsyncError(adminController.updateShop)
);
router.delete(
  '/shops/:id',
  catchAsyncError(checkPermission('isAdmin')),
  catchAsyncError(adminController.deleteShop)
);

// User
router.get('/users/logout', userController.logout);
router.post('/users/login', catchAsyncError(userController.login));
router.post('/users/register', catchAsyncError(userController.register));
router.get('/users/me', catchAsyncError(userController.getMe));

router.get('/users', catchAsyncError(userController.getAllInfo));
router.get('/user', catchAsyncError(userController.getMyInfo));
router.patch('/user', catchAsyncError(userController.updateMyInfo));

// Products

router.get('/products/:userId');
router.post(
  '/products',
  catchAsyncError(checkPermission('isShop')),
  catchAsyncError(productController.addProduct)
);
router.delete(
  '/products/:id',
  catchAsyncError(checkPermission('isShop')),
  catchAsyncError(productController.deleteProduct)
);
router.patch(
  '/products/:id',
  catchAsyncError(checkPermission('isShop')),
  catchAsyncError(productController.updateProduct)
);

// Global 暫時假資料
router.get('/products', productController.getProducts);
router.get('/shops', productController.getShops);

// Order
router.post('/orders', catchAsyncError(orderController.addShoppingCart));
router.post('/payments', catchAsyncError(paymentController.addOrder));
router.post('/result', catchAsyncError(paymentController.paymentResult));
router.get('/orders', catchAsyncError(orderController.getOrder));
router.patch('/orders', catchAsyncError(orderController.updateShoppingCart));
router.delete('/orders', catchAsyncError(orderController.deleteShoppingCart));

// Order_item
router.post('/order-items', catchAsyncError(orderItemController.addOrderItem));
router.get('/order-items', catchAsyncError(orderItemController.getOrderItem));
router.patch('/order-items', catchAsyncError(orderItemController.updateOrderItem));
router.delete('/order-items', catchAsyncError(orderItemController.deleteOrderItem));

// Product_detail
router.post('/product-details', productDetailController.getProductDetail);

module.exports = router;
