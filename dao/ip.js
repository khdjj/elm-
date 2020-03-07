var ipModel = require('../models/ip');
exports.readIP = async function() {
  return await ipModel.find({});
};

exports.deleteIpByIp = async function(ip) {
  console.error('删除ip',ip);
  return await ipModel.deleteOne({ ip: ip });
};
