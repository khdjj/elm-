const userModel = require('../models/user');

const saveCode = function(phone, code, cretime, userId) {
  return new Promise((resolve, reject) => {
    userModel.updateOne(
      { phone: phone },
      {
        $set: { phone: phone, code: code, codeSendTime: cretime, userId }
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
  });
};

const searchByPhone = function(phone) {
  return new Promise((resolve, reject) => {
    userModel.findOne({ phone: phone }, function(err, doc) {
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

module.exports = {
  saveCode,
  searchByPhone
};
