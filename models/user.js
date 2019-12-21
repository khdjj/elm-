var mongoose = require('mongoose')
var Scheme = mongoose.Schema

var userModels = new Scheme({
  id: Scheme.Types.ObjectId, //id
  address: Array, //收货地址
  phone: String, //手机号
  code: String, //验证码
  codeSendTime: String, //验证码发送时间
  order: Array, //订单
  love: Array, //收藏
  crtime: String, //用户创建时间
  status: Number, //用户状态
  city: String, //城市
  country: String, //国家
  token: String,
  weapp: {
    nickName: String,
    gender: String,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    nick: String
  } //微信信息
})
module.exports = mongoose.model('userModel', userModels)
