const request = require('./index'),
  db = require('../mongodb/db');
async function test() {
  await db.openDataSource();
  request.get(
    'https://h5.ele.me/restapi/shopping/v3/restaurants',
    {},
    {
      latitude: 23.116213,
      longitude: 113.326058,
      offset: 0,
      limit: 10,
      'extras[]': 'activities',
      extra_filters: 'home'
    },
    res => {
      console.error('success');
    }
  );
}

test();
