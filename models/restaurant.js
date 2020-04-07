/**
 * 餐馆数据模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  act_tag: Number,
  activities: Array, //活动
  supports: Array,
  shop_sign: Schema.Types.Mixed, //店签名
  address: Schema.Types.Mixed, //店地址
  authentic_id: Number,
  average_cost: Schema.Types.Mixed,
  baidu_id: Schema.Types.Mixed,
  bidding: Schema.Types.Mixed,
  brand_id: Schema.Types.Mixed,
  business_info: String,
  closing_count_down: Number,
  text_color: String,
  tips: String,
  location:Schema.Types.Mixed,
  type: Number,
  delivery_mode: Schema.Types.Mixed,
  description: String, //描述
  distance: String,
  favored: String,
  flavors: Schema.Types.Mixed, //美食品类
  float_delivery_fee: Number, //配送费
  float_minimum_order_amount: Number, //最低起送
  folding_restaurant_brand: Schema.Types.Mixed,
  folding_restaurants: Array,
  has_story: Boolean,
  id: { type: String, index: true },
  image_path: String, //店logo
  is_new: Boolean,
  recent_order_num: Number, //月销售量
  is_premium: Boolean,
  is_star: Boolean,
  is_stock_empty: Number,
  is_valid: Number, //是否可用
  latitude: Number,
  longitude: Number,
  max_applied_quantity_per_order: Number,
  name: String, //店名
  albums: Array, //店内照片
  next_business_time: String,
  opening_hours: Array, //开放时间
  startTime:String, //自定义开放时间
  endTime:String,//自定义结束时间
  order_lead_time: Number, //订单送达时间
  out_of_range: Boolean,
  phone: Schema.Types.String, //商家电话
  piecewise_agent_fee: {
    description: String,
    extra_fee: Number,
    is_extra: Boolean,
    no_subsidy_fee: String,
    rules: [
      {
        fee: Number,
        price: Number
      }
    ],
    tips: String
  },
  platform: Number,
  category:Array,//食品分类
  posters: Array,
  promotion_info: String, //公告
  qualification: Array, //营业资质
  rating: Number,
  rating_count: Number,
  regular_customer_count: Number,
  restaurant_info: Schema.Types.Mixed,
  scheme: String,
  status: Number,
  target_tag_path: Schema.Types.Mixed,
  type: Number,
  createAt:Schema.Types.Date,
  businessId: { type: Schema.Types.ObjectId, ref: 'businessModels' } //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
