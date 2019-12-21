const decrypt = require('./encData')

const random = function random(number){
  number = number || 6;
  return Math.random().toFixed(number).slice(-6)
}

const phoneisValid = function(phone){
  if(typeof phone !== 'string') return false
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(phone)
}

const getUserInfo = function(req){
  const {Authorization} = req.headers;
  let userInfo = decrypt.decData(Authorization)
  return userInfo
}

module.exports = {
  random,
  phoneisValid,
  getUserInfo
}