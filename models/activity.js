/**
 * 店铺活动模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  attribute: String,
  description: String,
  icon_color: String,
  icon_name: String,
  id: {type:String,index:true},
  image_hash: Schema.Types.Mixed,
  is_exclusive_with_food_activity: Boolean,
  name: String,
  text_color: String,
  tips: String,
  type: Number
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
