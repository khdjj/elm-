var CommendModel = require('../models/commend'),
  orderDao = require('./order');

exports.saveCommennd = async function (data) {
  var commend = new CommendModel({
    ...data
  });
  try {
    await commend.save();
    return await orderDao.changeOrderStatus(data.orderId, 2);
  } catch (err) {
    console.error(err);
    return err;
  }
};


exports.getRestaurantCommend = function (id) {
  return new Promise((resolve,reject)=>{
    CommendModel.find({rstId:id},(err,doc)=>{
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
}