var FoodModel = require('../models/food');

exports.save = async function(data) {
  var food = new FoodModel({
    ...data
  });
  try {
    //去重
    const r = await FoodModel.findOne({ item_id: data.item_id });
    if (r) return;
    console.error('插入食物');
    return await food.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.updateFood = async function(id, data) {
  console.error(id,data)
  return new Promise((resolve, reject) => {
    FoodModel.updateOne(
      { _id: id },
      {
        $set: { ...data },
      },
      (err, doc) => {
        if (err) {
          reject(err);
          console.error('对不起，修改食品数据错误');
        } else {
          console.error(doc)
          resolve(doc);
        }
      }
    );
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
  return new Promise((resolve, reject) => {
    FoodModel.insertMany(data,(err,doc)=>{
      if(err){
        reject(err);
      }else{
        console.error("保存食品成功")
        resolve(doc)
      }
    });
  });
};