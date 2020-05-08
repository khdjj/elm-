var OrderModel = require('../models/order'),
  mongoose = require('mongoose'),
  moment = require('moment'),
  RestaurantModel = require('../models/restaurant'),
  FoodModal = require('../models/food'),
  CommendModal = require('../models/commend');

exports.saveOrderModel = async function (data) {
  var order = new OrderModel({
    ...data,
  });
  try {
    await order.save();
    /**
     * 评分计算
     */
    const { food = [], restaurant = {} } = data;
    if (!restaurant.recent_order_num) restaurant.recent_order_num = 0;
    console.error(restaurant.id);
    RestaurantModel.updateOne(
      { _id: mongoose.Types.ObjectId(restaurant.id) },
      { $set: { recent_order_num: restaurant.recent_order_num + 1 } },
      (err, doc) => {
        console.error('修改餐饮数据', doc);
        console.error(err);
      }
    );
    food.forEach((f) => {
      if (!f.month_sales) f.month_sales = 0;
      console.error(f._id);
      FoodModal.updateOne(
        {
          _id: mongoose.Types.ObjectId(f._id),
        },
        {
          $set: { month_sales: f.month_sales + f.num },
        },
        (err, doc) => {
          console.error('修改食物数据');
        }
      );
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};

changeRstRate = async (rstId) => {
  const rate = await CommendModal.aggregate([
    {
      $match: {
        rstId: rstId,
      },
    },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 },
      },
    },
  ]);
  let total = 0;
  rate.forEach((r) => {
    total += r.count;
  });
  const obj = ArrayToObject(rate, total);
  let rstRate = 0;
  Object.keys(obj).forEach((o) => {
    rstRate += Number(o) * Number(obj[o]);
  });
  return await RestaurantModel.updateOne(
    { _id: rstId },
    { $set: { rating: rstRate } }
  );
};

function ArrayToObject(arr, total) {
  const obj = {};
  total = total === 0 ? 1 : total;
  arr.forEach((arr) => {
    obj[arr._id] = (arr.count / total).toFixed(2);
    console.error((arr.count / total).toFixed(2));
  });
  return obj;
}

exports.searchUserOrderByUserId = async function (id, offset, limit) {
  return await OrderModel.find({ userId: id }).skip(offset).limit(limit);
};

exports.changeOrderStatus = async function (id, status) {
  return await OrderModel.updateOne({ _id: id }, { $set: { status } });
};

exports.getOrderDetail = async function (id) {
  return await OrderModel.findOne({ _id: id });
};

exports.getBusinessAllOrderList = async function (id) {
  let restaurantId = [];
  restaurantId = await RestaurantModel.find(
    {
      $and: [{ businessId: id }],
    },
    {
      _id: 1,
    }
  );
  restaurantId = restaurantId.map((rst) => {
    return rst._id.toString();
  });
  const order = await OrderModel.aggregate([
    {
      $match: {
        'restaurant.id': { $in: restaurantId },
        status: { $ne: 0 },
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'orderId',
        as: 'comments',
      },
    },
    {
      $project: {
        food: 0,
        address: 0,
      },
    },
  ]);
  return order;
};

exports.getBusinessOrderList = async function (
  id,
  offset = 0,
  limit = 8,
  search = '',
  startTime,
  endTime
) {
  let restaurantId = [];
  search = search.replace(
    /(\+|\-|\&|\||\!|\(|\)|\{|\}|\[|\]|\^|\”|\~|\*|\?|\:|\\)/g,
    function ($0) {
      return '\\' + $0;
    }
  );
  const reg = new RegExp(search);
  restaurantId = await RestaurantModel.find(
    {
      $and: [{ businessId: id }, { name: { $regex: reg } }],
    },
    {
      _id: 1,
    }
  );
  console.error(startTime, endTime);
  let query = {};
  if (startTime && endTime) {
    query = {
      creatAt: {
        $gt: new Date(new Date(startTime).toISOString()),
        $lt: new Date(new Date(endTime).toISOString()),
      },
    };
  }
  console.error('query', query);

  restaurantId = restaurantId.map((rst) => {
    return rst._id.toString();
  });
  const total = await OrderModel.find({
    'restaurant.id': { $in: restaurantId },
  }).count();
  const order = await OrderModel.aggregate([
    {
      $match: {
        'restaurant.id': { $in: restaurantId },
        ...query,
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'orderId',
        as: 'comments',
      },
    },
    {
      $limit: limit,
    },
    {
      $skip: offset,
    },
    {
      $project: {
        food: 0,
        address: 0,
      },
    },
  ]);
  console.error(total, offset, limit);
  return {
    data: order,
    pagination: {
      total,
      current: total / limit,
      pageSize: limit,
    },
  };
};

exports.saveReplyCommend = async function (id, reply) {
  return new Promise((resolve, reject) => {
    console.error(id);
    CommendModal.updateOne({ _id: id }, { $set: { reply } }, (err, doc) => {
      if (err) {
        console.error('回复失败');
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};

exports.getMonthSales = async function (id) {
  const month = await OrderModel.aggregate([
    {
      $match: { 'restaurant.id': id },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$creatAt' } },
        count: { $sum: '$money' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const salesData = await getSalesData(id);
  return {
    month,
    salesData,
  };
};

// 自动评分
exports.autoRating = async function () {
  const orders = await OrderModel.find({});
  orders.forEach((o) => {
    // 超过1天
    if (moment() > moment(o.creatAt).add(23, 'h')) {
      CommendModal.updateOne({ orderId: o._id }, { $set: { rating: 5 } });
    }
    changeRstRate(o.restaurant.id);
  });
};

exports.autoChangeOrderStatus = async function () {
  const orders = await OrderModel.find({});
  orders.forEach((o) => {
    // 超过3小时订单状态自动完成
    if (moment() > moment(o.creatAt).add(3, 'h')) {
      CommendModal.updateOne({ orderId: o._id }, { $set: { status: 3 } });
    }
  });
};

const getSalesData = async function (id) {
  // 获取订单的每月好评数量和差评数量
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  month = month.length > 1 ? month : '0' + month;
  day = day.length > 1 ? day : '0' + day;
  const order = await OrderModel.aggregate([
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'orderId',
        as: 'comments',
      },
    },
    {
      $project: {
        restaurant: 1,
        'comments.rating': 1,
        money: 1,
        year: { $substr: ['$creatAt', 0, 10] },
      },
    },
    {
      $match: {
        year: `${year}-${month}-${day}`,
        'restaurant.id': id,
      },
    },
  ]);

  const food = await OrderModel.aggregate([
    { $match: { 'restaurant.id': id } },
    { $unwind: '$food' },
    {
      $group: {
        _id: '$food.name',
        count: {
          $sum: 1,
        },
      },
    },
    {
      $limit: 15,
    },
    {
      $sort: { count: -1 },
    },
  ]);

  let good = 0;
  let bad = 0;
  let sales = 0;
  order.forEach((o) => {
    sales += o.money;
    const { comments } = o;
    if (comments.length > 0) {
      if (comments[0].rating >= 4) {
        good += 1;
      } else {
        bad += 1;
      }
    }
  });

  const type = await OrderModel.aggregate([
    {
      $project: {
        money: 1,
        restaurant: 1,
        way: 1,
        year: { $substr: ['$creatAt', 0, 10] },
      },
    },
    {
      $match: {
        year: `${year}-${month}-${day}`,
        'restaurant.id': id,
      },
    },
    {
      $group: {
        _id: '$way',
        count: { $sum: '$money' },
      },
    },
  ]);

  return {
    goodnum: good,
    badnum: bad,
    sales,
    ordernum: order.length,
    food,
    type,
  };
};

// 获取年度销量

// db.getCollection('orders').aggregate([
//   {
//     $group: {
//       _id: { $dateToString: { format: '%Y-%m', date: '$creatAt' } },
//       count: { $sum: '$money' }
//     }
//   }
// ]);

// 获取当月订单数

// db.getCollection('orders').aggregate([
//   { $project: { year: { $substr: ['$creatAt', 0, 7] } } },
//   { $match: { year: '2020-04' } },
//   {
//     $group: {
//       _id: 'creatAt',
//       count: { $sum: 1 }
//     }
//   }
// ]);

// return await OrderModel.aggregate([
//   {
//       $match:{"restaurant.id":id}
//   },
//   {
//     $group: {
//       _id: { $dateToString: { format: '%Y-%m', date: '$creatAt' } },
//       count: { $sum: '$money' }
//     }
//   }
// ])

// db.getCollection('orders').aggregate([
//   {
//     $match: { 'restaurant.id': { $in: ['5e7ef7dd6500d6200c7745ed'] },
//     creatAt:{"$gt":'2020-03-20',"$lt":'2020-03-40'} }
//   },
//   {
//     $lookup: {
//       from: 'comments',
//       localField: '_id',
//       foreignField: 'orderId',
//       as: 'comments'
//     }
//   },
//   {
//     $limit: 10
//   },
//   {
//     $skip: 0
//   },
//   {
//     $project: {
//       food: 0,
//       address: 0
//     }
//   }
// ]);

// db.getCollection('orders').aggregate([
//   {
//     $match: { 'restaurant.id': { $in: ['5e7ef7dd6500d6200c7745ed'] },
//     creatAt:{"$gt":new Date(new Date('2020-04-19').toISOString())} }
//   },
//   {
//     $lookup: {
//       from: 'comments',
//       localField: '_id',
//       foreignField: 'orderId',
//       as: 'comments'
//     }
//   },
//   {
//     $limit: 10
//   },
//   {
//     $skip: 0
//   },
//   {
//     $project: {
//       food: 0,
//       address: 0
//     }
//   }
// ]);
