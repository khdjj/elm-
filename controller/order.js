const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/order');

class Order {
  constructor() {
    this.saveUserOrder = this.saveUserOrder.bind(this);
  }

  async saveUserOrder(req, res, next) {
    const _id = getUser.getId(req);
    dao
      .saveOrderModel({
        ...req.body,
        userId: _id
      })
      .then(data => {
        res.send({
          ret: data,
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

  async getUserOrderList(req, res, next) {
    const _id = getUser.getId(req);
    dao
      .searchUserOrderByUserId(_id)
      .then(data => {
        res.send({
          ret: data,
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

const order = new Order();
module.exports = {
  saveUserOrder: order.saveUserOrder,
  getUserOrderList:order.getUserOrderList
};
