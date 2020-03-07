var FoodModel = require('../models/food');

exports.save = async function(data) {
  var food = new FoodModel({
    ...data
  });
  try {
    //去重
    const r = await FoodModel.findOne({ item_id: data.item_id });
    if (r) return;
    console.error('插入食物')
    return await food.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};
