let express = require('express'),
  restController = require('../controller/restaurant');
const router = express.Router()

router.post('/shopping/v3/restaurants',restController.getRestaurant)
router.post('/shopping/detail/restaurants',restController.getShopDetail)
router.post('/shopping/v3/saveRestaurants',restController.saveRestaruant)
router.get('/shopping/v3/list',restController.getRestaurantList)
router.post('/food/v3/add/category',restController.addRestaurantCategory)


exports.router = router
