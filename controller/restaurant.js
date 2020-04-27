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
    this.getRestaurantDetail = this.getRestaurantDetail.bind(this);
    this.upperShelf = this.upperShelf.bind(this);
  }
  async getRestaurant(req, res, next) {
    restDao
      .getRestaurantListByParams(req.body)
      .then((data = {}) => {
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: 4004,
          msg: '数据查询错误,请重试'
        });
      });
  }

  async getShopDetail(req, res, next) {
    const { name } = req.query;
    restDao
      .getShopDetail(name)
      .then(data => {
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          code: 5001,
          msg: '对不起，数据查询错误,请重试'
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

  getRestaurantDetail(req, res, next) {
    const { id } = req.query;
    restDao
      .getRestaurantDetail(id)
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

  updateRestaurant(req, res, next) {
    const { id, ...restData } = req.body;

    restDao
      .updateRestaurant(id, restData)
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

  upperShelf(req, res, next) {
    const { id, status } = req.body;
    restDao
      .upperShelf(id, status)
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
  addRestaurantCategory: restaurant.addRestaurantCategory,
  getRestaurantDetail: restaurant.getRestaurantDetail,
  updateRestaurant: restaurant.updateRestaurant,
  upperShelf:restaurant.upperShelf,
};
