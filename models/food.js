/**
 * 餐馆数据模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  activity: Schema.Types.Mixed,
  activity_tags: Schema.Types.Mixed,
  attributes: Array,
  attrs: Array,
  attrs2: Array,
  category_id: String,
  checkout_mode: Number,
  coupons: Array,
  descPhotos: Array,
  description: { type: String, default: '' },
  display_times: Array,
  enable_brand_content: Boolean,
  extCode: String,
  image_mark: Schema.Types.Mixed,
  image_path: String,
  is_essential: Boolean,
  is_featured: Number,
  join_hot: Boolean,
  limitation: Schema.Types.Mixed,
  lowest_price: Number,
  materials: String,
  min_purchase: Number,
  month_sales: { type: Number, default: 0 },
  name: String,
  package_item_ids: Array,
  photos: Array,
  pinyin_name: String,
  pic_change_type: Schema.Types.Mixed,
  rating: Number,
  rating_count: Number,
  sale_status: Boolean,
  satisfy_count: Number,
  satisfy_rate: Number,
  scheme: Schema.Types.Mixed,
  selected: Schema.Types.Mixed,
  server_utc: Number,
  show_photo_hash_type: Number,
  sku_ids: Array,
  sold_out: Boolean,
  spec_stock: Schema.Types.Mixed,
  specfoods: Array,
  specifications: Array,
  specifications2: Array,
  step: Schema.Types.Mixed,
  sub_item_ids: Array,
  tag_info_detail: Schema.Types.Mixed,
  tips: String,
  type: Number,
  vfood_id: String,
  video: Schema.Types.Mixed,
  virtual_food_id: Schema.Types.Mixed,
  menusId: { type: Schema.Types.ObjectId, ref: 'MenuSchema' },
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'RestaurantSchema' }, //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
