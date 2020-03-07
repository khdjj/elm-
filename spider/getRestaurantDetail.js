var request = require('../request/index'),
  menuDao = require('../dao/menu'),
  result = require('./shopDetail'),
  db = require('../mongodb/db'),
  foodDao = require('../dao/food');

saveMenu = async res => {
  // await db.openDataSource();
  if (!res) return;
  const { menu } = res;
  menu.forEach(m => {
    delete m.foods;
    menuDao.save(m);
  });
};

saveFood = async res => {
  if (!res) return;
  const { menu } = res;
  const foodIds = [];
  menu.forEach(m => {
    const { foods } = m;
    foods.forEach(food => {
      foodDao.save(food);
    });
  });
};

// saveMenu(result.data);
// saveFood(result.data);

exports.getMenu = async function(data) {
  console.error(data);
  return new Promise((resolve, reject) => {
    // saveRestaurant(result.data);
    // saveActivity(result.data);
    // saveSupport(result.data);
    resolve(result.data);

    // request.get(
    //   'https://h5.ele.me/restapi/shopping/v3/restaurants',
    //   {},
    //   data,
    //   res => {
    //     console.error('res', res);
    //     if (res.err) {
    //       reject(res);
    //     } else {
    //       if (res.text) {
    //         const d = JSON.parse(res.text);
    //         saveRestaurant(d);
    //         saveActivity(d);
    //         saveSupport(d);
    //         resolve(d);
    //       }
    //     }
    //   }
    // );
  });
};
