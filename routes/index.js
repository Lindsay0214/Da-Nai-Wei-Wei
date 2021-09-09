const express = require('express');
const router = express.Router();
const checkPermission = require('../middleware/checkPermission');


const adminController = require('../controllers/adminController');
const productController = require('../controllers/productsController');
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

function redirectBack(req, res) {
  res.redirect('back')
}

// User
router.get('/users/logout', userController.logout);
router.post('/users/login', userController.login, redirectBack);
router.post('/users/register', userController.register, redirectBack);
// router.get('/users/:id', userController.getMyInfo);
// router.patch('/users/:id', userController.updateMyInfo);

// Shop
// router.get('/shops/:nickname');
// router.post('/shops', adminController.addShop);
// router.post('/shops', adminController.addShop);
// router.patch('/shops/:id', adminController.updateShop);
// router.delete('/shops/:id', adminController.deleteShop);

// Products
router.get('/products/:userId');
router.post('/products', productController.addProduct);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id', productController.updateProduct);

// Order
router.post('/orders');
router.patch('/orders/:id');

module.exports = router;
