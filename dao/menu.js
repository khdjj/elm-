var MenuModel = require('../models/menu'),
  FoodModel = require('../models/food');

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
    ...data,
    restaurant_id:id,
  });
  const doc = await food.save();
  console.error(doc)
  if (doc && Object.keys(doc).length > 0) {
    return await MenuModel.updateOne(
      { _id: categoryId, rstId: id },
      { $push: { foods: doc._id } }
    );
  }
};

exports.getFoodList = async function(id) {
  return new Promise((resolve, reject) => {
    FoodModel.find({ restaurant_id: id }, (err, doc) => {
      if (err) {
        reject(err);
        console.error('数据库查询食物种类出错');
      } else {
        resolve(doc);
      }
    });
  });
};


exports.getFoodDetail = async function(id) {
  return new Promise((resolve, reject) => {
    FoodModel.findOne({ _id: id }, (err, doc) => {
      if (err) {
        reject(err);
        console.error('数据库查询食物详情出错');
      } else {
        resolve(doc);
      }
    });
  });
};




//其他用途
exports.getAll = function() {
  return new Promise((resolve, reject) => {
    FoodModel.find({},(err, doc) => {
      if (err) {
        reject(err);
        console.error('对不起，修改餐饮数据错误');
      } else {
        resolve(doc);
      }
    });
  });
};

//其他用途

exports.saveAll = function(data) {
  console.error("MenusaveALl")
  return new Promise((resolve, reject) => {
    MenuModel.insertMany(data,(err,doc)=>{
      if(err){
        reject(err);
      }else{
        console.error("保存菜单成功")
        resolve(doc)
      }
    });
  });
};