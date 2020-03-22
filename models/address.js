var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var adressModels = new Scheme({
  id: Scheme.Types.ObjectId, //id
  name: String,
  phone: String,
  address: Scheme.Types.Mixed,
  houseNumber: String,
  tag: String,
  sex: String,
  userId: { type: Scheme.Types.ObjectId, ref: 'userModels' } //这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
});
module.exports = mongoose.model('adress', adressModels);
