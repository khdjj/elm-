const chalk = require('chalk'),
  businessDao = require('../dao/business'),
  util = require('../service/utils'),
  getUser = require('../service/getUser'),
  dataEncPro = require('../service/encData'),
  ZhenzismsClient = require('../service/zhenzisms'),
  config = require('../config/default');
class Business {
  constructor() {
    this.getCode = this.getCode.bind(this);
    this.bindAccount = this.bindAccount.bind(this);
  }
  async getCode(req, res, next) {
    const { phone } = req.body;
    let errMsg = '错误信息',
      isValid = true,
      errcode = 400;

    if (!phone || !util.phoneisValid(phone)) {
      errcode = 4001;
      errMsg = '手机号格式错误';
      isValid = false;
    }
    console.error(phone);
    const cretime = Number(new Date());
    const code = util.random();
    console.error(chalk.red(code));
    //发送短信
    // let client = new ZhenzismsClient(
    //   config.zhenzi.ApiUrl,
    //   config.zhenzi.AppId,
    //   config.zhenzi.AppSecret
    // )
    // let params = { message: `验证码为:${code}`, number: phone }
    // let response = await client.send(params)
    // if (response.code !== 0) {
    // errcode = 5001
    //   errMsg = '对不起，短信发送失败，请重试'
    //   isValid = false
    // }
    if (!isValid) {
      res.send({
        error: errcode,
        code: 500,
        msg: errMsg
      });
    } else {
      businessDao
        .saveCode(phone, code, cretime)
        .then(doc => {
          console.error(doc);
          if (doc.error) {
            res.send({
              error: doc.error,
              msg: doc.msg
            });
          } else {
            res.send({
              ret: 1,
              code: 200
            });
          }
        })
        .catch(err => {
          res.send({
            error: errcode,
            code: 500,
            msg: err
          });
        });
    }
  }
  async bindAccount(req, res, next) {
    const { phone, code } = req.body;
    const currTime = Number(new Date());
    let msg = '验证成功';
    let sendCode = 200;
    let ret = 1;
    if (!phone || !util.phoneisValid(phone)) {
      res.send({
        error: 4001,
        code: 500,
        msg: '参数格式错误'
      });
    }
    businessDao
      .searchByPhone(phone)
      .then(doc => {
        const { codeSendTime, code: dbcode } = doc;
        if (dbcode && dbcode != code) {
          msg = '对不起，验证码错误，请重试';
          ret = 0;
          sendCode = 4002;
        }
        if (codeSendTime && (currTime - codeSendTime) / (1000 * 60) > 30) {
          msg = '验证码已过期，请重试';
          ret = 0;
          sendCode = 4003;
        }
        if (!codeSendTime || !dbcode) {
          msg = '对不起，服务器出错了';
          ret = 0;
          sendCode = 5001;
        }
        if (ret == 1) {
          res.send({
            ret,
            msg,
            userInfo: {
              phone: doc.phone,
              role: doc.role
            },
            token: dataEncPro.encData(JSON.stringify({ _id: doc._id }))
          });
        } else {
          res.send({
            error: sendCode,
            msg,
            ret
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: 5001,
          msg: '对不起，服务器错误，请重试',
          ret: 0
        });
      });
  }

  async login(req, res, next) {
    const { phone, password } = req.body;
    if (!phone || !util.phoneisValid(phone)) {
      res.send({
        error: 4001,
        code: 500,
        msg: '参数格式错误'
      });
    }
    businessDao
      .searchByPhone(phone)
      .then(doc => {
        if (!doc || Object.keys(phone).length === 0) {
          res.send({
            error: 4005,
            code: 500,
            msg: '对不起,该用户不存在'
          });
        } else if (doc.password !== password) {
          res.send({
            error: 4006,
            code: 500,
            msg: '无效密码'
          });
        } else {
          res.send({
            msg: '登录成功',
            ret: 1,
            userInfo: {
              phone: doc.phone,
              role: doc.role
            },
            token: dataEncPro.encData(JSON.stringify({ _id: doc._id }))
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.send({
          error: 5001,
          msg: '对不起，服务器错误，请重试',
          ret: 0
        });
      });
  }

  async modifyPassword(req, res, next) {
    const { opassword, npassword } = req.body;
    const _id = getUser.getId(req);
    console.error(req.body);
    businessDao
      .searchPassword(_id, opassword, npassword)
      .then(doc => {
        console.error('doc', doc);
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
      })
      .catch(err => {
        res.send({
          error: 5001,
          msg: '对不起，服务器错误，请重试',
          ret: 0
        });
      });
  }
}

const business = new Business();
module.exports = {
  getCode: business.getCode,
  bindAccount: business.bindAccount,
  login: business.login,
  modifyPassword: business.modifyPassword
};
