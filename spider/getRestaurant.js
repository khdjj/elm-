var request = require('../request/index'),
  activityDao = require('../dao/activity'),
  supportDao = require('../dao/support'),
  result = require('./data'),
  db = require('../mongodb/db'),
  restaurantDao = require('../dao/restaurant');

saveRestaurant = async res => {
  // await db.openDataSource();
  if (!res) return;
  const { items } = res;
  console.error(Array.isArray(items));
  let activityId = [],
    supportId = [];
  if (Array.isArray(items)) {
    items.forEach(items => {
      console.error('restautant items');
      const { restaurant } = items;
      const { activities = [], supports = [] } = restaurant;
      activities.forEach(ac => {
        console.error('activities items');
        activityId.push(ac.id);
      });
      supports.forEach(su => {
        console.error('supports items');
        supportId.push(su.id);
      });
      delete restaurant.activities;
      delete restaurant.supports;
      const data = {
        ...restaurant,
        activities: activityId,
        supports: supportId
      };

      restaurantDao.save(data);
    });
  }
};

saveActivity = async res => {
  if (!res) return;
  const { items } = res;
  if (Array.isArray(items)) {
    items.forEach(items => {
      const { restaurant } = items;
      const { activities = [] } = restaurant;
      activities.forEach(items => {
        activityDao.save(items);
      });
    });
  }
};

saveSupport = async res => {
  if (!res) return;
  const { items } = res;
  if (Array.isArray(items)) {
    items.forEach(items => {
      const { restaurant } = items;
      const { supports = [] } = restaurant;
      supports.forEach(items => {
        supportDao.save(items);
      });
    });
  }
};

// saveRestaurant(data.data);
// saveActivity(data.data);
// saveSupport(data.data);

exports.getRestaurant = async function(data) {
  console.error(data)
  return new Promise((resolve, reject) => {
    saveRestaurant(result.data);
    saveActivity(result.data);
    saveSupport(result.data);
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
