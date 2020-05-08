var CommendModel = require('../models/commend'),
  orderDao = require('./order');

exports.saveCommennd = async function (data) {
  var commend = new CommendModel({
    ...data,
  });
  try {
    await commend.save();
    return await orderDao.changeOrderStatus(data.orderId, 2);
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.getRestaurantCommend = async function (id, offset = 0, limit = 8) {
  return await CommendModel.find({ rstId: id }).limit(limit).skip(offset);
};
