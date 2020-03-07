const chalk = require('chalk'),
  utils = require('../service/utils'),
  spider = require('../spider/index');
class Restaurant {
  constructor() {
    this.getRestaurant = this.getRestaurant.bind(this);
    this.getShopDetail = this.getShopDetail.bind(this);
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
}

const restaurant = new Restaurant();
module.exports = {
  getRestaurant: restaurant.getRestaurant,
  getShopDetail: restaurant.getShopDetail
};
