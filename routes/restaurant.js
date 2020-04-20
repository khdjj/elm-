let express = require('express'),
  restController = require('../controller/restaurant');
const router = express.Router()

router.post('/shopping/v3/restaurants',restController.getRestaurant)
router.get('/shopping/detail/restaurants',restController.getShopDetail)
router.post('/shopping/v3/saveRestaurants',restController.saveRestaruant)
router.get('/shopping/v3/list',restController.getRestaurantList)
router.post('/food/v3/add/category',restController.addRestaurantCategory)
router.post('/food/v3/add/category',restController.addRestaurantCategory)
router.get('/v3/detail',restController.getRestaurantDetail),
router.post('/v3/update',restController.updateRestaurant)
exports.router = router
