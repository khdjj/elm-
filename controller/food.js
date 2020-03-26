const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/menu');

class Food {
  constructor() {
    this.getFoodCategory = this.getFoodCategory.bind(this);
    this.saveFood = this.saveFood.bind(this);
  }

  async getFoodCategory(req, res, next) {
    const { id } = req.body;
    dao
      .getFoodCategory(id)
      .then(data => {
        res.send({
          data,
          msg: 'ok'
        });
      })
      .catch(err => {
        res.send({
          error: err,
          msg: '对不起，服务器错误'
        });
      });
  }

  async saveFood(req, res, next) {
    const { id, categoryId, data } = req.body;
    dao
      .saveFood(id, categoryId, data)
      .then(data => {
        res.send({
          data,
          msg: 'ok'
        });
      })
      .catch(err => {
        res.send({
          error: err,
          msg: '对不起，服务器错误'
        });
      });
  }
}

const food = new Food();
module.exports = {
  getFoodCategory: food.getFoodCategory,
  saveFood:food.saveFood,
};
