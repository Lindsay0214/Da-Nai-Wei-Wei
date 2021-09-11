const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController'); // 引入 controller 檔案
const orderItemController = require('../controllers/orderItemController');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const checkPermission = require('../middleware/checkPermission');
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

function redirectBack(req, res) {
  res.redirect('back');
}

// Shop
router.get('/shops', adminController.getAllShops);
router.post('/shops', adminController.addShop);
router.patch('/shops/:id', adminController.updateShop);
router.delete('/shops/:id', adminController.deleteShop);

// User
router.get('/users/logout', userController.logout);
router.post('/users/login', userController.login, redirectBack);
router.post('/users/register', userController.register, redirectBack);

router.get('/users', userController.getAllInfo);
router.get('/users/:id', userController.getMyInfo);
router.patch('/users/:id', userController.updateMyInfo);

// Products
router.get('/products/:userId');
router.post('/products', productController.addProduct);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id', productController.updateProduct);

// Order
router.post('/orders', orderController.addShoppingCart);
router.get('/orders', orderController.getOrder);
router.patch('/orders', orderController.updateShoppingCart);
router.delete('/orders', orderController.deleteShoppingCart);

// Order_item
router.post('/order-items', orderItemController.addOrderItem);
router.get('/order-items', orderItemController.getOrderItem);
router.patch('/order-items', orderItemController.updateOrderItem);
router.delete('/order-items', orderItemController.deleteOrderItem);

module.exports = router;
