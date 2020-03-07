/*
 * @Descripttion:代理池ip Model
 * @version:
 * @Author: khdjj
 * @Date: 2019-05-18 21:16:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:15:10
 */
'use strict';
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipSchema = new Schema({
  ip: String,
  port: String,
  type: String
});

const Ip = mongoose.model('Ip', ipSchema);

module.exports = Ip;
