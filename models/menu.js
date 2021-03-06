/**
 * 菜单数据模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  activity: Schema.Types.Mixed,
  anchor: Schema.Types.Mixed,
  description: String,
  description_pattern: Schema.Types.Mixed,
  global_id: Schema.Types.Mixed,
  grey_icon_url: String,
  icon_url: String,
  foods:Array,
  index: Schema.Types.Mixed,
  is_activity: Number,
  is_selected: Boolean,
  item_ids: Schema.Types.Array,
  name: String,
  name_desc: String,
  rank_id: Schema.Types.Mixed,
  restaurant_id: String,
  sold_out: Boolean,
  sticky: Boolean,
  sticky_time: Schema.Types.Mixed,
  sub_categories: Schema.Types.Mixed,
  total_preferential_price: Schema.Types.Mixed,
  type: Number,
  rstId: { type: Schema.Types.ObjectId, ref: 'RestaurantSchema' } //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
