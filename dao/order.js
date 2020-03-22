var OrderModel = require('../models/order');

exports.saveOrderModel = async function(data) {
  var order = new OrderModel({
    ...data
  });
  try {
    return await order.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.searchUserOrderByUserId = async function(id) {
  return new Promise((resolve, reject) => {
    OrderModel.find({ userId: id }, (err, doc) => {
      if (err) {
        console.error('数据库查询用户订单列表错误');
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};
