const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  foodDao = require('../dao/food'),
  dao = require('../dao/menu');

class Food {
  constructor() {
    this.getFoodCategory = this.getFoodCategory.bind(this);
    this.saveFood = this.saveFood.bind(this);
    this.getFoodList = this.getFoodList.bind(this);
    this.updateFood = this.updateFood.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
  }

  async getFoodCategory(req, res, next) {
    const { id } = req.body;
    dao
      .getFoodCategory(id)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }

  async deleteFood(req, res, next) {
    const { id, menusId } = req.body;
    dao
      .deleteFood(id, menusId)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }

  async saveFood(req, res, next) {
    const { id, categoryId, data } = req.body;
    console.error(req.body);
    dao
      .saveFood(id, categoryId, data)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }

  async getFoodList(req, res, next) {
    const { id } = req.query;
    console.error(id, req.body, req.query);
    dao
      .getFoodList(id)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }

  async getFoodDetail(req, res, next) {
    const { id } = req.query;
    console.error(id);
    dao
      .getFoodDetail(id)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }

  async updateFood(req, res, next) {
    const { id, ...restData } = req.body;
    foodDao
      .updateFood(id, restData)
      .then((data) => {
        res.send({
          data,
          msg: 'ok',
        });
      })
      .catch((err) => {
        res.send({
          error: err,
          msg: '对不起，服务器错误',
        });
      });
  }
}

const food = new Food();
module.exports = {
  getFoodCategory: food.getFoodCategory,
  saveFood: food.saveFood,
  getFoodList: food.getFoodList,
  getFoodDetail: food.getFoodDetail,
  updateFood: food.updateFood,
  deleteFood: food.deleteFood,
};
