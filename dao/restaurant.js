var RestModel = require('../models/restaurant'),
  MenuModel = require('../models/menu');

exports.save = async function (data) {
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

exports.getRestaurantListByParams = async function (data) {
  const {
    extra_filters,
    limit = 8,
    offset = 0,
    rank_id,
    search,
    latitude,
    longitude
  } = data;
  const reg = new RegExp(search);
  const location = [Number(longitude), Number(latitude)];
  console.error(location,Number(offset),Number(limit))
  if (!search) {
    return await RestModel.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: location },
          $minDistance: 1000,
          $maxDistance: 5000
        }
      }
    })
      .skip(Number(offset))
      .limit(Number(limit));
  } else if (search) {
    return await RestModel.find({
      $or: [{ name: { $regex: reg } }, { category: { $regex: reg } }],
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: location },
          $minDistance: 1000,
          $maxDistance: 5000
        }
      }
    });
  }
};

exports.saveRestaurant = async function (id, data) {
  var restaurant = new RestModel({
    ...data,
    businessId: id,
    tag: 1,
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

exports.getRestaurantList = async function (id) {
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

exports.addRestaurantCategory = async function (id, name, desc) {
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

exports.getRestaurantDetail = async function (id) {
  return new Promise((resolve, reject) => {
    RestModel.findOne({ _id: id }, (err, doc) => {
      if (err) {
        reject(err);
        console.error('对不起，查询餐饮详情错误');
      } else {
        resolve(doc);
      }
    });
  });
};

exports.updateRestaurant = async function (id, data) {
  return new Promise((resolve, reject) => {
    RestModel.updateOne(
      { _id: id },
      {
        $set: { ...data },
        $push: { qualification: data.qualify, albums: data.alb }
      },
      (err, doc) => {
        if (err) {
          reject(err);
          console.error('对不起，修改餐饮数据错误');
        } else {
          resolve(doc);
        }
      }
    );
  });
};

//其他用途
exports.getAll = function () {
  return new Promise((resolve, reject) => {
    RestModel.find({}, (err, doc) => {
      if (err) {
        reject(err);
        console.error('对不起，查找餐饮数据错误');
      } else {
        resolve(doc);
      }
    });
  });
};

//其他用途

exports.saveAll = function (data) {
  return new Promise((resolve, reject) => {
    RestModel.insertMany(data, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

//其他用途

exports.update = function (data) {
  return new Promise((resolve, reject) => {
    RestModel.updateOne(
      { _id: data.id },
      { $set: { location: data.location } },
      { upsert: true },
      (err, doc) => {
        if (err) {
          console.error(err);
        } else {
          console.error('插入loction成功');
        }
      }
    );
  });
};

// db.getCollection('restaurants').find({
//   location: {
//     $nearSphere: {
//       $geometry: { type: 'Point', coordinates: [113.454134, 22.567851] },
//       $minDistance: 1000,
//       $maxDistance: 5000
//     }
//   }
// });
