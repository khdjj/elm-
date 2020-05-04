var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var commentModels = new Scheme({
  id: Scheme.Types.ObjectId, //id
  reply: String, //回复,
  rating: Number, //星级
  rated_at: String, //评论时间
  raging_images: Array, //评论图片
  rating_text: String, //评价
  food: Array,
  orderId: { type: Scheme.Types.ObjectId, ref: 'OrderSchema' },
  rstId: { type: Scheme.Types.ObjectId, ref: 'RestaurantSchema' },
  userId: { type: Scheme.Types.ObjectId, ref: 'userModels' } //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
});
module.exports = mongoose.model('comment', commentModels);
