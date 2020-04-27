let express = require('express'),
  orderController = require('../controller/order');
const router = express.Router();

router.post('/v1/saveUser', orderController.saveUserOrder);
router.get('/v1/list', orderController.getUserOrderList);
router.post('/v1/change/status', orderController.changeOrderStatus);
router.get('/v1/detail', orderController.getOrderDetail);
router.get('/v1/business/list', orderController.getBusinessOrderList);
router.post('/v1/reply', orderController.replyCommend);
router.get('/v3/getMonthSales',orderController.getMonthSales)
// router.get('/v3/getstatData',orderController.getSalesData)


exports.router = router;
