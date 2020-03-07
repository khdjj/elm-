const superagent = require('superagent'),
  api = require('../proxy-pool/getProxyIP'),
  ipDao = require('../dao/ip'),
  getCookie = require('../cookie');
chalk = require('chalk');
require('superagent-proxy')(superagent);

const defaultOptions = {
  Accept: 'application/json'
};

let number = 0;

const get = async function(url, options, data, callback) {
  let ips = await api.getProxyIP();
  let proxy = `${ips.type}://${ips.ip}:${ips.port}`;
  console.error(number);
  if (number > 6) {
    number = 0;
    if (callback)
      callback({
        err: 'TimeOut',
        message: '错误，请重试'
      });
      return;
  }
  superagent
    .get(url)
    .query(data)
    .set('Cookie', getCookie.cookie)
    .set(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    )
    .set(options || defaultOptions)
    .proxy(proxy)
    .timeout(6000)
    .end((err, res) => {
      if (err) {
        number = number + 1;
        ipDao.deleteIpByIp(ips.ip);
        get(url, options, data, callback);
      } else {
        console.log('success');
        number = 0;
        if (callback) callback(res);
        return;
      }
    });
};

const post = async function(url, options, data, callback) {
  let ips = await getIp();
  let proxy = `'${ips.type}://${ips.ip}:${ips.port}`;
  console.error(number);
  if (number > 6) {
    number = 0;
    if (callback)
      callback({
        err: 'TimeOut',
        message: '错误，请重试'
      });
  }
  superagent
    .get(url)
    .query(data)
    .set('Cookie', getCookie.cookie)
    .set(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    )
    .set(options || defaultOptions)
    .proxy(proxy)
    .timeout(6000)
    .end((err, res) => {
      if (err) {
        console.error(err);
        ipDao.deleteIpByIp(ips.ip);
        number = number + 1;
        post(url, options, data, callback);
      } else {
        console.log('success');
        number = 0;
        if (callback) callback(res);
        return res;
      }
    });
};

module.exports = {
  get,
  post
};
