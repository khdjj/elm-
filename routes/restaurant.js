let express = require('express'),
  restController = require('../controller/restaurant');
const router = express.Router()

router.post('/shopping/v3/restaurants',restController.getRestaurant)
router.post('/shopping/detail/restaurants',restController.getShopDetail)

exports.router = router
