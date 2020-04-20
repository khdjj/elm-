let express = require('express'),
  orderController = require('../controller/order');
const router = express.Router();

router.post('/v1/saveUser', orderController.saveUserOrder);
router.get('/v1/list', orderController.getUserOrderList);
router.post('/v1/change/status',orderController.changeOrderStatus);
router.get('/v1/detail',orderController.getOrderDetail)


exports.router = router;
