const userModel = require('../models/user')

const saveCode = function(phone, code, cretime) {
  return new Promise((resolve, reject) => {
    userModel.updateOne(
      { phone: phone },
      { $set: { phone: phone, code: code, codeSendTime: cretime } },
      { upsert: true },
      (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      }
    )
  })
}

const searchByPhone = function(phone) {
  return new Promise((resolve, reject) => {
    userModel.find({ phone: phone }, function(err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}

module.exports = {
  saveCode,
  searchByPhone
}
