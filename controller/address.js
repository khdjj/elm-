const chalk = require('chalk'),
  getUser = require('../service/getUser'),
  dao = require('../dao/address');

class Address {
  constructor() {
    this.saveUserAddress = this.saveUserAddress.bind(this);
    this.searchUserAddress = this.searchUserAddress.bind(this);
  }

  async saveUserAddress(req, res, next) {
    const _id = getUser.getId(req);
    console.error('id', _id);
    console.error(req.body);
    // const { name, phone, houseNumber, tag, sex, address } = req.body;
    dao
      .saveUserAddress({
        ...req.body,
        userId: _id
      })
      .then(data => {
        console.error('data', data);
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

  async searchUserAddress(req, res, next) {
    console.error('searchUserAddress');
    const _id = getUser.getId(req);
    try {
      dao.searchUserAddressByUserId(_id).then(data => {
        console.error('data', data);
        res.send({
          ret: data,
          msg: 'ok'
        });
      });
    } catch (err) {
      console.error(err);
      res.send({
        error: 5001,
        msg: '对不起,数据库查询错误'
      });
    }
  }

  async deleteUserAddress(req, res, next) {
    console.error('deleteUserAddress');
    const _id = getUser.getId(req);
    const { id } = req.body;
    console.error(id, _id);
    try {
      dao.deleteUserAddressById(_id, id).then(data => {
        console.error('data', data);
        res.send({
          ret: data,
          msg: 'ok'
        });
      });
    } catch (err) {
      res.send({
        error: 5001,
        msg: '对不起,数据库删除错误'
      });
    }
  }

  async editUserAddress(req, res, next) {
    const { id, ...reqData } = req.body;
    console.error(id)
    try {
      dao.editUserAddress(id, reqData).then(data => {
        res.send({
          ret: data,
          msg: 'ok'
        });
      });
    } catch (err) {
      res.send({
        error: 5001,
        msg: '对不起,数据库错误'
      });
    }
  }
}

const address = new Address();
module.exports = {
  saveUserAddress: address.saveUserAddress,
  searchUserAddress: address.searchUserAddress,
  deleteUserAddress: address.deleteUserAddress,
  editUserAddress: address.editUserAddress
};
