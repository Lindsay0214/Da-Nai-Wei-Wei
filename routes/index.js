const express = require('express');
const router = express.Router();

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
router.post('/users/:id');
router.patch('/users/:id');
router.delete('/users', (req, res) => {
  res.json({
    message: 'delete',
  });
});

// Products
router.get('/products/:userId');
router.post('/products');
router.delete('/products/:id');
router.patch('/products/:id');

// Order
router.post('/orders');
router.patch('/orders/:id');

module.exports = router;
