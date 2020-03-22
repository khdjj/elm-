var AddressModel = require('../models/address');

exports.saveUserAddress = async function(data) {
  var adress = new AddressModel({
    ...data
  });
  try {
    return await adress.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};

exports.searchUserAddressByUserId = async function(id) {
  return new Promise((resolve, reject) => {
    AddressModel.find({ userId: id }, (err, doc) => {
      if (err) {
        console.error('数据库查询用户地址列表错误');
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};

exports.deleteUserAddressById = async function(_id, id) {
  return new Promise((resolve, reject) => {
    AddressModel.deleteOne({ _id: id, userId: _id }, (err, doc) => {
      if (err) {
        console.error('数据库删除用户地址错误');
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};

exports.editUserAddress = async function(id, data) {
  return new Promise((resolve, reject) => {
    AddressModel.updateOne({ _id: id }, { $set: { ...data } }, (err, doc) => {
      if (err) {
        console.error('数据库更新地址失败');
        reject(err);
      } else {
        console.error(doc);
        resolve(doc);
      }
    });
  });
};
