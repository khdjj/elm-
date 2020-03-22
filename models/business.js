var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var businessModels = new Scheme({
  crtime: String, //用户创建时间
  status: Number, //用户状态
  phone: String, //手机号
  code: String, //验证码
  codeSendTime: String, //验证码发送时间
  status: { type: Number, default: 0 }, //用户状态
  token: String,
  role:String, //用户角色
  password:{type:String,default:'12345678'},  //用户密码
});
module.exports = mongoose.model('business', businessModels);
