let express = require('express'),
  orderController = require('../controller/order');
const router = express.Router();

router.post('/v1/saveUser', orderController.saveUserOrder);
router.get('/v1/list', orderController.getUserOrderList);


exports.router = router;
