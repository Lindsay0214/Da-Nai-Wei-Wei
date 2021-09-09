const express = require('express');
const router = express.Router();

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
router.get('/shops', adminController.getAllShops);
router.post('/shops', adminController.addShop);
router.patch('/shops/:id', adminController.updateShop);
router.delete('/shops/:id', adminController.deleteShop);

// Products
router.get('/products/:userId');
router.post('/products');
router.delete('/products/:id');
router.patch('/products/:id');

// Order
router.post('/orders');
router.patch('/orders/:id');

module.exports = router;
