let express = require('express'),
  foodController = require('../controller/food');
const router = express.Router();

router.post('/v4/category', foodController.getFoodCategory);
router.post('/v4/save/food', foodController.saveFood);


exports.router = router;
