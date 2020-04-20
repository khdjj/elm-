const business = [
  '5e75b4f023af6687d0463c17',
  '5e75b57223af6687d0463c36',
  '5e7f423ac4238e91ff3bedb2',
  '5e7f437ac4238e91ff3bee4f'
];

const category = [
  ['快餐便当', '黄焖鸡米饭'],
  ['快餐便当', '简餐'],
  ['快餐便当', '米粉面馆'],
  ['果蔬生鲜', '水果'],
  ['鲜花蛋糕', '蛋糕'],
  ['甜品饮品', '甜品'],
  ['小吃夜宵', '烧烤']
];

const restaurantDao = require('./dao/restaurant');
const db = require('./mongodb/db');

async function changeRestaurant() {
  await db.openDataSource();
  restaurantDao.getAll().then(data => {
    data.forEach(items => {
      const d = {
        id: items._id,
        location: [items.longitude, items.latitude]
      };
      console.error(d.location)
      restaurantDao.update(d);
    });
  });
}

changeRestaurant();

// const result = require('./spider/data');
// const menuData = require('./spider/shopDetail');
// const foodDao = require('./dao/food');
// const menuDao = require('./dao/menu');
// const db = require('./mongodb/db');

// async function changeRestaurant() {
//   await db.openDataSource();
//   const rstData = [];
//   result.data.items.forEach(items => {
//     const rst = items.restaurant;
//     const n = Math.floor(Math.random() * business.length + 1) - 1;
//     const b = Math.floor(Math.random() * category.length + 1) - 1;
//     const businessId = business[n];
//     rst.businessId = businessId;
//     rst.category = category[b];
//     rst.shop_sign = { image_hash: '171204347d7.jpg' };
//     rst.createAt = new Date();
//     rstData.push(rst);
//   });
//   restaurantDao.saveAll(rstData).then(doc => {});
// }

// async function changeRestaurantDetail() {
//   await db.openDataSource();
//   const rstData = [];
//   restaurantDao.getAll().then(data => {
//     data.forEach(items => {
//       const d = {
//         startTime: '06:30',
//         endTime: '23:59',
//         phone: '15874495074'
//       };
//       restaurantDao.updateRestaurant(items._id, d);
//     });
//   });
// }

// async function changeMenuAndFood() {
//   await  db.openDataSource();
//   let menuList = [];
//   let foodList = [];
//   restaurantDao.getAll().then(doc => {
//     const rst = doc.slice(12,13)
//     rst.forEach(r => {
//       const menus = menuData.data.menu;
//       menus.forEach(menu => {
//         const { foods } = menu;
//         foodList = [];
//         foods.forEach(f => {
//           f.restaurant_id = r._id;
//           foodList.push(f);
//         });
//         foodDao.saveAll(foodList).then(doc => {
//           const foodId = [];
//           doc.forEach(df => {
//             foodId.push(df._id);
//           });
//           menu.rstId = r._id;
//           menu.foods = foodId;
//           menuList = [];
//           menuList.push(menu);
//           menuDao.saveAll(menuList);
//         });
//       });
//     });
//   });
// }

// // changeRestaurant();
// changeMenuAndFood();
