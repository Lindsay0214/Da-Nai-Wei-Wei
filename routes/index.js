const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController')
const userController = require('../controllers/user')
router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

function redirectBack(req, res) {
  res.redirect('back')
}

// User
router.get('/users/:id');
router.get('/users/:nickname');
router.get('/logout', userController.logout);
router.get('/users/register', userController.register);
router.post('/register', userController.register);
router.post('/users/login', userController.login);
router.post('/login', userController.login)

router.post('/users', adminController.addUser);
router.patch('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Products
router.get('/products/:userId');
router.post('/products');
router.delete('/products/:id');
router.patch('/products/:id');

// Order
router.post('/orders');
router.patch('/orders/:id');

module.exports = router;
