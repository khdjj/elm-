let express = require('express'),
  foodController = require('../controller/food');
const router = express.Router();

router.post('/v4/category', foodController.getFoodCategory);
router.post('/v4/save', foodController.saveFood);
router.get('/v4/list', foodController.getFoodList);
router.get('/v4/detail', foodController.getFoodDetail);
router.post('/v4/update', foodController.updateFood);


exports.router = router;
