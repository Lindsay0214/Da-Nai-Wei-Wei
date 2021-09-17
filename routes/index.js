const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController'); // 引入 controller 檔案
const orderItemController = require('../controllers/orderItemController');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const checkPermission = require('../middleware/checkPermission');
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');

router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

// Shop
router.get('/admin', checkPermission('isAdmin'), adminController.getAllShops);
router.post('/admin', checkPermission('isAdmin'), adminController.addShop);
router.patch('/admin/:id', checkPermission('isAdmin'), adminController.updateShop);
router.delete('/admin/:id', checkPermission('isAdmin'), adminController.deleteShop);

// User
router.get('/users/logout', userController.logout);
router.post('/users/login', userController.login);
router.post('/users/register', userController.register);

router.get('/users', userController.getAllInfo);
router.get('/user', userController.getMyInfo);
router.patch('/user', userController.updateMyInfo);

// Products
router.post('/products', checkPermission('isShop'), productController.addProduct);
router.delete('/products/:id', checkPermission('isShop'), productController.deleteProduct);
router.patch('/products/:id', checkPermission('isShop'), productController.updateProduct);

// Global 暫時假資料
router.get('/products', productController.getProducts);
router.get('/shops', productController.getShops);

// Order
router.post('/orders', orderController.addShoppingCart);
router.post('/payments', paymentController.addOrder);
router.post('/result', paymentController.paymentResult);
router.get('/orders', orderController.getOrder);
router.patch('/orders', orderController.updateShoppingCart);
router.delete('/orders', orderController.deleteShoppingCart);

// Order_item
router.post('/order-items', orderItemController.addOrderItem);
router.get('/order-items', orderItemController.getOrderItem);
router.patch('/order-items', orderItemController.updateOrderItem);
router.delete('/order-items', orderItemController.deleteOrderItem);

module.exports = router;
