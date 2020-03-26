var RestModel = require('../models/restaurant'),
  MenuModel = require('../models/menu');

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
    businessId: id,
    createAt: new Date()
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

exports.getRestaurantList = async function(id) {
  return new Promise((resolve, reject) => {
    RestModel.find({ businessId: id }, (err, doc) => {
      if (err) {
        reject(err);
        console.error('对不起，查询餐饮列表错误');
      } else {
        resolve(doc);
      }
    });
  });
};

exports.addRestaurantCategory = async function(id, name, desc) {
  const menu = new MenuModel({
    rstId: id,
    name,
    name_desc: desc
  });
  try {
    return await menu.save();
  } catch (err) {
    return {
      error: 5002,
      msg: '对不起,数据库错误'
    };
  }
};
