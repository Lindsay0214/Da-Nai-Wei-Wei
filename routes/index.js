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
const productHistoryController = require('../controllers/productHistoryController');
const { catchAsyncError } = require('../middlewares/error/errors');

router.get('/', (req, res) => {
  res.json({
    message: 'welcome',
  });
});

// Shop

router.get(
  '/shops',
  // catchAsyncError(checkPermission('isAdmin')), // homePage 頁面會用到，先解除封印
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
router.get(
  '/shops/:id',
  // catchAsyncError(checkPermission('isAdmin')), // menu 頁面會用到，先解除封印，傳出的資料應該要把密碼拿掉？！
  catchAsyncError(adminController.getShop)
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
router.get('/users-shops', catchAsyncError(userController.getShops));
router.get('/user', catchAsyncError(userController.getMyInfo));
router.patch('/user', catchAsyncError(userController.updateMyInfo));
router.patch('/user-URL', catchAsyncError(userController.updateURL));

// Products
router.get(
  '/products',
  catchAsyncError(checkPermission('isShop')),
  catchAsyncError(productController.getProducts)
);
router.post(
  '/product',
  catchAsyncError(checkPermission('isShop')),
  catchAsyncError(productController.addProduct)
);
router.get(
  '/products/:id',
  // catchAsyncError(checkPermission('isShop')), // 這被條擋住，add-to-cart 也要用這個 api
  catchAsyncError(productController.getProduct)
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
router.get('/products-store/:id', catchAsyncError(productController.getStoreProducts));

// Global 暫時假資料
router.get('/products', productController.getProducts);
router.get('/shops', productController.getShops);
router.get('/menu/:brandName', productController.getMenu);

// Order
router.post(
  '/orders',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.addShoppingCart)
);
router.get(
  '/payments',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(paymentController.addOrder)
);
router.post('/result', catchAsyncError(paymentController.paymentResult));
router.get(
  '/orders',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.getOrder)
);
router.get(
  '/orders-history',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.getOrdersHistory)
);
router.patch(
  '/orders',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.updateShoppingCart)
);
router.delete(
  '/orders',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.deleteShoppingCart)
);
router.get(
  '/orders-get-is-paid/:order_id',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.getIsPaid)
);
router.get(
  '/orders/:orderId',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderController.getOrderPaid)
);

// Order_item
router.post(
  '/order-items',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.addOrderItem)
);
router.get(
  '/order-items',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.getOrderItem)
); // 用使用者 id ，搜出她的購物車底下的所有 order items
router.get(
  '/order-item/:id',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.getSingleOrderItem)
); // 用 order-item-id 搜出這個物品的明細
router.patch(
  '/order-items',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.updateOrderItem)
);
router.delete(
  '/order-items',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.deleteOrderItem)
);
router.get(
  '/order-items/:orderId',
  catchAsyncError(checkPermission('isConsumer')),
  catchAsyncError(orderItemController.getOrderHistory)
);

// Product_detail
router.get(
  '/product-details/:size/:sweetness/:ice',
  catchAsyncError(checkPermission('isConsumer')),
  productDetailController.getProductDetail
);

// Product_history
router.post(
  '/product-history',
  catchAsyncError(checkPermission('isConsumer')),
  productHistoryController.addProductHistory
);

module.exports = router;
