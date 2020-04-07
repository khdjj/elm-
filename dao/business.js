const businessModel = require('../models/business');

const saveCode = function(phone, code, cretime) {
  return new Promise((resolve, reject) => {
    businessModel.findOne({ phone }, (err, doc) => {
      if (err) {
        reject(err);
      } else if (!doc || Object.keys(doc).length === 0) {
        businessModel.updateOne(
          { phone: phone },
          {
            $set: {
              code: code,
              codeSendTime: cretime,
              role: 'business',
              password:'12345678'
            }
          },
          { upsert: true },
          (err, doc) => {
            if (err) {
              reject(err);
            } else {
              resolve(doc);
            }
          }
        );
      } else {
        resolve({
          error: 5001,
          msg: '对不起,该手机号已被注册'
        });
      }
    });
  });
};

const searchByPhone = function(phone) {
  return new Promise((resolve, reject) => {
    businessModel.findOne({ phone: phone }, function(err, doc) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};

const searchPassword = function(id, opassword, npassword) {
  return new Promise((resolve, reject) => {
    businessModel.findOne({ _id: id }, function(err, doc) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const { password = '' } = doc;
        console.error('password',password)
        if (password && password === opassword) {
          businessModel.updateOne(
            { _id: id },
            { $set: { password: npassword } },
            (error, res) => {
              if (error) {
                reject(error);
              }
              resolve(res);
            }
          );
        } else {
          resolve({
            error: 4006,
            msg: '原始密码错误'
          });
        }
      }
    });
  });
};

module.exports = {
  saveCode,
  searchByPhone,
  searchPassword
};
