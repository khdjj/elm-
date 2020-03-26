var MenuModel = require('../models/menu'),
  FoodModel = require('./food');

exports.save = async function(data) {
  var menu = new MenuModel({
    ...data
  });
  try {
    //去重
    const r = await MenuModel.findOne({ id: data.id });
    if (r) return;
    console.error('插入菜单');
    return await menu.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.getFoodCategory = async function(id) {
  return new Promise((resolve, reject) => {
    MenuModel.find({ rstId: id }, { name: 1, name_desc: 1 }, (err, doc) => {
      if (err) {
        reject(err);
        console.error('数据库查询食物种类出错');
      } else {
        resolve(doc);
      }
    });
  });
};

exports.saveFood = async function(id, categoryId, data) {
  const food = new FoodModel({
    ...data
  });
  const doc = await food.save();
  if (doc && Object.keys(doc).length > 0) {
    return await MenuModel.updateOne(
      { _id: categoryId, rstId: id },
      { $push: { foods: data } }
    );
  }
};
