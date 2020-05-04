const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/order');

class Order {
  constructor() {
    this.saveUserOrder = this.saveUserOrder.bind(this);
    this.getUserOrderList = this.getUserOrderList.bind(this);
    this.changeOrderStatus = this.changeOrderStatus.bind(this);
    this.getOrderDetail = this.getOrderDetail.bind(this);
    this.getBusinessOrderList = this.getBusinessOrderList.bind(this);
    this.replyCommend = this.replyCommend.bind(this);
    this.getMonthSales = this.getMonthSales.bind(this);
    // this.getSalesData = this.getSalesData.bind(this);
    // this.statistics = this.statistics.bind(this);

    // 1、获取每个月的订单金额
    // 2、获取当天的好评数
    //3、获取当天的差评数
    // 4、获取今日销售额
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
    const {offset,limit} = req.query;
    dao
      .searchUserOrderByUserId(_id,Number(offset),Number(limit))
      .then(data => {
        res.send({
          ret: data,
          msg: 'ok'
        });
      })
      .catch(err => {
        console.error(err)
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
        console.error(err);
        res.send({
          code: 5001,
          msg: '对不起,服务器错误'
        });
      });
  }
  getOrderDetail(req, res, next) {
    const { id, offset, limit } = req.query;
    dao
      .getOrderDetail(id)
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
          msg: '对不起,服务器错误'
        });
      });
  }

  getBusinessOrderList(req, res, next) {
    let { offset, limit, search, startTime, endTime } = req.query;
    const id = getUser.getId(req);
    offset = Number(offset) || 0;
    limit = Number(limit) || 8;
    dao
      .getBusinessOrderList(id, offset, limit, search, startTime, endTime)
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
          msg: '对不起,服务器错误'
        });
      });
  }

  replyCommend(req, res, next) {
    const { id, reply } = req.body;
    console.error(req.body);
    dao
      .saveReplyCommend(id, reply)
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
          msg: '对不起,服务器错误'
        });
      });
  }

  getMonthSales(req, res, next) {
    const { id } = req.query;
    dao
      .getMonthSales(id)
      .then(data => {
        console.error(data);
        res.send({
          code: 200,
          ret: data
        });
      })
      .catch(err => {
        console.error(err);
        res.send({
          code: 5001,
          msg: '对不起,服务器错误'
        });
      });
  }

  //   getSalesData(req, res, next) {
  //     const { id } = req.query;
  //     console.error(id)
  //     dao
  //       .getSalesData(id)
  //       .then(data => {
  //         console.error(data);
  //         res.send({
  //           code: 200,
  //           ret: data
  //         });
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         res.send({
  //           code: 5001,
  //           msg: '对不起,服务器错误'
  //         });
  //       });
  //   }
}

const order = new Order();
module.exports = {
  saveUserOrder: order.saveUserOrder,
  getUserOrderList: order.getUserOrderList,
  changeOrderStatus: order.changeOrderStatus,
  getOrderDetail: order.getOrderDetail,
  getBusinessOrderList: order.getBusinessOrderList,
  replyCommend: order.replyCommend,
  getMonthSales: order.getMonthSales
  // getSalesData: order.getSalesData
};
