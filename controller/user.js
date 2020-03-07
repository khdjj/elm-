const chalk = require('chalk'),
  userDao = require('../dao/user'),
  util = require('../service/utils'),
  ZhenzismsClient = require('../service/zhenzisms'),
  config = require('../config/default');
class User {
  constructor() {
    this.getCode = this.getCode.bind(this);
    this.bindAccount = this.bindAccount.bind(this);
  }
  async getCode(req, res, next) {
    const { phone } = req.body;
    let errMsg = '错误信息',
      isValid = true,
      errcode = 400;

    if (!util.phoneisValid(phone)) {
      errcode = 4001;
      errMsg = '手机号格式错误';
      isValid = false;
    }
    console.error(phone);
    console.error(req);
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
      userDao
        .saveCode(phone, code, cretime)
        .then(doc => {
          res.send({
            ret: 1,
            code: 200
          });
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
    console.error(phone, code);
    const currTime = Number(new Date());
    let msg = '验证成功';
    let sendCode = 200;
    let ret = 1;
    if (!phone) {
      res.send({
        error: 4001,
        code: 500,
        msg: '参数格式错误'
      });
    }
    userDao
      .searchByPhone(phone)
      .then(doc => {
        const { codeSendTime, code: dbcode } = doc[0];
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
            msg
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
        res.send({
          error: 5001,
          msg: '对不起，服务器错误，请重试',
          ret: 0
        });
      });
  }
}

const user = new User();
module.exports = {
  getCode: user.getCode,
  bindAccount: user.bindAccount
};
