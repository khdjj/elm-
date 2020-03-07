const decrypt = require('./encData');

const random = function random(number) {
  number = number || 6;
  return Math.random()
    .toFixed(number)
    .slice(-6);
};

const phoneisValid = function(phone) {
  if (typeof phone !== 'string') return false;
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(phone);
};

const getUserInfo = function(req) {
  const { Authorization } = req.headers;
  let userInfo = decrypt.decData(Authorization);
  return userInfo;
};

const isEmpty = function(data) {
  console.error(Object.prototype.toString.call(data));
  if (
    Object.prototype.toString.call(data) === '[object String]' ||
    Object.prototype.toString.call(data) === '[object Array]'
  ) {
    if (data.length <= 0) {
      return true;
    }
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    if (Object.keys(data).length <= 0) {
      return true;
    }
  }
  return false;
};

module.exports = {
  random,
  phoneisValid,
  getUserInfo,
  isEmpty
};
