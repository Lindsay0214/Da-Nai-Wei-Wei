const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')
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
router.get('/users',adminController.getAllShops);
router.post('/users', adminController.addShop);
router.patch('/users/:id', adminController.updateShop);
router.delete('/users/:id', adminController.deleteShop);

// Products
router.get('/products/:userId');
router.post('/products');
router.delete('/products/:id');
router.patch('/products/:id');

// Order
router.post('/orders');
router.patch('/orders/:id');

module.exports = router;
