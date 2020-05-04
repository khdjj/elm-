let express = require('express'),
  commendController = require('../controller/commend');
const router = express.Router();

router.post('/v2/order', commendController.saveCommend);
router.get('/v2/restaurant',commendController.getRestaurantCommend)

exports.router = router;


// db.getCollection('orders').aggregate([
//   {$group:{
//           _id:{ $dateToString: { format: "%Y-%m", date: "$creatAt" } },
//            count:{$sum:"$money"},
                 
//           }
//   }])