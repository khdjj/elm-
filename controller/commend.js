const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/commend');

class Commend {
  constructor() {
    this.saveCommend = this.saveCommend.bind(this);
    this.getRestaurantCommend == this.getRestaurantCommend.bind(this);
  }

  async saveCommend(req, res, next) {
    const _id = getUser.getId(req);
    dao
      .saveCommennd({
        ...req.body,
        userId: _id
      })
      .then(data => {
        console.error(data);
        res.send({
          ret: data,
          msg: 'ok'
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: err,
          msg: '对不起，服务器错误'
        });
      });
  }
  async getRestaurantCommend(req, res, next) {
    const {id}  = req.query;
    dao
      .getRestaurantCommend(id)
      .then(data => {
        res.send({
          ret: data,
          msg: 'ok'
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: err,
          msg: '对不起，服务器错误'
        });
      });
  }
}

const commend = new Commend();
module.exports = {
  saveCommend: commend.saveCommend,
  getRestaurantCommend: commend.getRestaurantCommend
};
