/**
 * 餐馆数据模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  act_tag: Number,
  activities: Array,
  supports:Array,
  address: Schema.Types.Mixed,
  authentic_id: Number,
  average_cost: Schema.Types.Mixed,
  baidu_id: Schema.Types.Mixed,
  bidding: Schema.Types.Mixed,
  brand_id: Schema.Types.Mixed,
  business_info: String,
  closing_count_down: Number,
  text_color: String,
  tips: String,
  type: Number,
  delivery_mode: Schema.Types.Mixed,
  description: String,
  distance: String,
  favored: String,
  flavors: Schema.Types.Mixed,
  float_delivery_fee: Number,
  float_minimum_order_amount: Number,
  folding_restaurant_brand: Schema.Types.Mixed,
  folding_restaurants: Array,
  has_story: Boolean,
  id: {type:String,index:true},
  image_path: String,
  is_new: Boolean,
  is_premium: Boolean,
  is_star: Boolean,
  is_stock_empty: Number,
  is_valid: Number,
  latitude: Number,
  longitude: Number,
  max_applied_quantity_per_order: Number,
  name: String,
  next_business_time: String,
  opening_hours: Array,
  order_lead_time: Number,
  out_of_range: Boolean,
  phone: Schema.Types.Mixed,
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
  platform:Number,
  posters:Array,
  promotion_info:String,
  rating:Number,
  rating_count:Number,
  rating_count: Number,
  regular_customer_count:Number,
  restaurant_info:Schema.Types.Mixed,
  scheme:String,
  status:Number,
  target_tag_path:Schema.Types.Mixed,
  type:Number,
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
