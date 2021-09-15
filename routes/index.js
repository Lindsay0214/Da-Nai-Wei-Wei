const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController'); // 引入 controller 檔案
const orderItemController = require('../controllers/orderItemController');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const passport = require('../config/passport');

// router.get('/', (req, res) => {
//   res.json({
//     message: 'welcome',
//   });
// });



// ====================================================================
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  
  // router.get('/', function(req, res, next) {
  //   res.render('index', { title: 'Express' });
  // });
  
  // router.get('/success', function(req, res, next) {
  //     // console.log(req.user);
  //     res.render('success', {data: req.user});
  // })
  
  // router.get('/auth/facebook', passport.authenticate('facebook'));
  
  // router.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', { successRedirect: '/success',
  //                                       failureRedirect: '/' }));
// ====================================================================
// Shop
router.get('/shops', adminController.getAllShops);
router.post('/shop', adminController.addShop);
router.patch('/shop', adminController.updateShop);
router.delete('/shop', adminController.deleteShop);

// User
router.get('/users/logout', userController.logout);
router.post('/users/login', userController.login);
router.post('/users/register', userController.register);
router.get('/users', userController.getAllInfo);
router.get('/user', userController.getMyInfo);
router.patch('/user', userController.updateMyInfo);

// Products
router.get('/products/:userId');
router.post('/product', productController.addProduct);
router.delete('/product', productController.deleteProduct);
router.patch('/product', productController.updateProduct);

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
