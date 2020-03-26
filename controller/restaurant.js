const chalk = require('chalk'),
  utils = require('../service/utils'),
  getUser = require('../service/getUser'),
  restDao = require('../dao/restaurant'),
  spider = require('../spider/index');
class Restaurant {
  constructor() {
    this.getRestaurant = this.getRestaurant.bind(this);
    this.getShopDetail = this.getShopDetail.bind(this);
    this.saveRestaruant = this.saveRestaruant.bind(this);
    this.getRestaurantList = this.getRestaurantList.bind(this);
    this.addRestaurantCategory = this.addRestaurantCategory.bind(this);
  }
  async getRestaurant(req, res, next) {
    const {
      latitude,
      longitude,
      offset = 0,
      limit = 10,
      extras,
      extra_filters,
      rank_id
    } = req.body;
    spider.rst
      .getRestaurant({
        latitude,
        longitude,
        offset,
        'extras[]': extras,
        limit,
        extra_filters,
        rank_id,
        terminal: 'h5'
      })
      .then((data = {}) => {
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        res.send({
          error: 4004,
          message: '数据查询错误,请重试'
        });
      });
  }

  async getShopDetail(req, res, next) {
    const {
      user_id,
      latitude,
      longitude,
      offset = 0,
      limit = 10,
      extras
    } = req.body;
    if (utils.isEmpty(req.body)) {
      res.send({
        error: 4001,
        message: '数据参数格式错误'
      });
    }
    spider.menu
      .getMenu({
        user_id,
        latitude,
        longitude,
        offset,
        limit,
        extras
      })
      .then(data => {
        res.send({
          ret: data,
          code: 200
        });
      })
      .catch(err => {
        res.send({
          error: 4004,
          message: '数据查询错误,请重试',
          err
        });
      });
  }

  saveRestaruant(req, res, next) {
    const _id = getUser.getId(req);
    restDao.saveRestaurant(_id, req.body).then(doc => {
      if (doc.error) {
        res.send({
          ...doc
        });
      } else {
        res.send({
          ret: 1,
          code: 200
        });
      }
    });
  }

  getRestaurantList(req, res, next) {
    const _id = getUser.getId(req);
    restDao
      .getRestaurantList(_id)
      .then(doc => {
        console.error('doc', doc);
        res.send({
          ret: 1,
          data: doc
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: 4004,
          msg: err
        });
      });
  }

  //也是创建menu
  addRestaurantCategory(req, res, next) {
    const { id, name, desc } = req.body;
    restDao
      .addRestaurantCategory(id, name, desc)
      .then(doc => {
        res.send({
          ret: 1,
          data: doc
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: 4004,
          msg: err
        });
      });
  }
}

const restaurant = new Restaurant();
module.exports = {
  getRestaurant: restaurant.getRestaurant,
  getShopDetail: restaurant.getShopDetail,
  saveRestaruant: restaurant.saveRestaruant,
  getRestaurantList: restaurant.getRestaurantList,
  addRestaurantCategory: restaurant.addRestaurantCategory
};
