const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/order');

class Order {
  constructor() {
    this.saveUserOrder = this.saveUserOrder.bind(this);
    this.getUserOrderList = this.getUserOrderList.bind(this);
    this.changeOrderStatus = this.changeOrderStatus.bind(this);
    this.getOrderDetail = this.getOrderDetail.bind(this);
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
  changeOrderStatus(req, res, next) {
    const { id, status } = req.body;
    dao
      .changeOrderStatus(id, status)
      .then(data => {
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        console.error(err)
        res.send({
          code: 5001,
          msg: '对不起,服务器错误'
        });
      });
  }
  getOrderDetail(req, res, next) {
    const { id } = req.query;
    dao
      .getOrderDetail(id)
      .then(data => {
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        console.error(err)
        res.send({
          code: 5001,
          msg: '对不起,服务器错误'
        });
      });
  }
}

const order = new Order();
module.exports = {
  saveUserOrder: order.saveUserOrder,
  getUserOrderList: order.getUserOrderList,
  changeOrderStatus: order.changeOrderStatus,
  getOrderDetail: order.getOrderDetail
};
