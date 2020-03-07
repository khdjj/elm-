/**
 * 分段代理费数据模型 如春节假需加钱
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportSchema = new Schema({
  description: String,
  icon_name: String,
  icon_color:String,
  id:{type:Number,index:true},
  name: String,
  text_color:String,
  border:String,
  two_characters_icon_name:String,
});

const Support = mongoose.model('Support', SupportSchema);

module.exports = Support;
