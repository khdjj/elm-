/**
 * 菜单数据模型
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'userModels' }, //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
  address: Schema.Types.Mixed,
  arriveTime: String,
  way: String,
  tableNumber: String,
  tableware: String,
  icon_url: String,
  remark: String,
  food: Array,
  money: Schema.Types.Number,
  creatAt: Schema.Types.Date,
  restaurant:Schema.Types.Mixed,
  status: { type: Number, default: 0 } //订单状态  0 初始状态 1 订单已完成 2 订单已评价 -1 订单已取消
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
