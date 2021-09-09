const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // 引入 controller 檔案
const orderItemController = require('../controllers/orderItemController');
const adminController = require('../controllers/adminController');
router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

// User
router.get('/users/:id');
router.get('/users/:nickname');
router.post('/users/register');
router.post('/users/login');
router.post('/users', adminController.addUser);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Products
router.get('/products/:userId');
router.post('/products');
router.delete('/products/:id');
router.patch('/products/:id');

// Order
router.post('/orders', orderController.addShoppingCart);
router.get('/orders', orderController.getOrder);
router.patch('/orders', orderController.updateShoppingCart);

router.get('/orders');
// Order_item
router.post('/order-items', orderItemController.addOrderItem);
router.get('/order-items', orderItemController.gg);
router.patch('/order-items', orderItemController.updateOrderItem);
router.delete('/order-items', orderItemController.deleteOrderItem);

module.exports = router;
