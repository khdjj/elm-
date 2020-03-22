var RestModel = require('../models/restaurant');

exports.save = async function(data) {
  var restaurant = new RestModel({
    ...data
  });
  try {
    //去重
    const r = await RestModel.findOne({ id: data.id });
    if (r) return;
    return await restaurant.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.saveRestaurant = async function(id, data) {
  var restaurant = new RestModel({
    ...data,
    businessId: id
  });
  try {
    return await restaurant.save();
  } catch (err) {
    return {
      error: 5002,
      msg: '对不起,插入数据错误'
    };
  }
};
