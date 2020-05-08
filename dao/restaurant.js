var RestModel = require('../models/restaurant'),
  foodDao = require('./food'),
  MenuModel = require('../models/menu');

exports.save = async function (data) {
  var restaurant = new RestModel({
    ...data,
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
    search,
    key,
    latitude,
    longitude,
  } = data;
  const reg = new RegExp(search);
  const location = [Number(longitude), Number(latitude)];
  console.error(location)
  console.error(data)
  if (!search) {
    return await RestModel.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: location },
          $minDistance: 1000,
          $maxDistance: 100000,
        },
      },
      status: 1,
    })
      .skip(Number(offset))
      .sort(key)
      .limit(Number(limit));
  } else if (search) {
    console.error(search,reg)
    return await RestModel.find({
      $or: [
        { name: { $regex: reg } },
        { category: { $elemMatch: { $regex: reg } } },
      ],
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: location },
          $minDistance: 1000,
          $maxDistance: 100000,
        },
      },
      status: 1,
    })
      .skip(Number(offset))
      .sort(key)
      .limit(Number(limit));
  }
};

exports.saveRestaurant = async function (id, data) {
  var restaurant = new RestModel({
    ...data,
    businessId: id,
    tag: 1,
    location: [parseFloat(data.longitude), parseFloat(data.latitude)],
    createAt: new Date(),
  });
  console.error(data);
  return await restaurant.save();
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
    name_desc: desc,
  });
  try {
    return await menu.save();
  } catch (err) {
    return {
      error: 5002,
      msg: '对不起,数据库错误',
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

exports.getShopDetail = async function (name) {
  const doc = await RestModel.aggregate([
    { $match: { name: name } },
    {
      $lookup: {
        from: 'menus',
        localField: '_id',
        foreignField: 'rstId',
        as: 'menus',
      },
    },
  ]);
  let rst = {};
  if (doc.length > 0) rst = doc[0];
  const docMenus = [];
  let docRst = {};
  const { menus = [] } = rst;
  for (let i = 0; i < menus.length; i++) {
    const { foods } = menus[i];
    const food = await foodDao.findFoodByMenus(foods);
    docMenus.push({
      ...menus[i],
      foods: food,
    });
  }
  delete rst.menus;
  docRst = rst;
  console.error(docMenus);
  return {
    menus: docMenus,
    rst: docRst,
  };
};

exports.updateRestaurant = async function (id, data) {
  return new Promise((resolve, reject) => {
    RestModel.updateOne(
      { _id: id },
      {
        $set: { ...data },
        $push: { qualification: data.qualify, albums: data.alb },
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

exports.upperShelf = async function (id, status) {
  return new Promise((resolve, reject) => {
    RestModel.updateOne(
      { _id: id },
      {
        $set: { status },
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

exports.sort = async function (key) {
  return new Promise((resolve, reject) => {
    RestModel.find(
      { _id: id },
      {
        $set: { status },
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
