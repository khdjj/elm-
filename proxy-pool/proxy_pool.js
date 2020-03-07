'use strict';
var request = require('request'),
  superagent = require('superagent'),
  cheerio = require('cheerio'),
  db = require('../mongodb/db'),
  ipDao = require('../dao/ip'),
  ipModel = require('../models/ip');

//打开数据库
db.openDataSource();

//添加数据文件
var insertDb = function(ip, port, type) {
  ipModel.insertMany(ipList, function(err, res) {
    if (err) {
      console.log('插入ip错误');
      console.log(err);
    } else {
      console.log('插入ip成功');
    }
  });
};

var ipList = [];

//分析网页内容
var loadHtml = function(response) {
  let ip;
  let port;
  let type;
  var proxies_list = response.split('\n');
  proxies_list.forEach(item => {
    if (typeof item === 'string' && item) {
      const proxy_json = JSON.parse(item);
      ip = proxy_json.host;
      port = proxy_json.port;
      type = proxy_json.type;
      const d = {
        ip,
        port,
        type
      };
      ipList.push(d);
    }
  });
  insertDb(ipList);
};

//链接网络
var requestProxy = function(options) {
  return new Promise((resolve, reject) => {
    request(options, function(err, response, body) {
      if (err === null && response.statusCode === 200) {
        loadHtml(body);
        resolve();
      } else {
        console.log('68      链接失败');
        reject();
      }
    });
  });
};

var useragent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
var headers = {
  'User-Agent': useragent
};

//生成网址
var ipUrl = function(resolve) {
  var url =
    'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list';
  var options = {
    url: url,
    headers
  };
  requestProxy(options);
};

//从数据库提取所有ip
var allIp = function(callback) {
  // return db.all('select * from proxy', callback)
  return ipModel.find({}, callback);
};

//代理ip对象
var Proxys = function(ip, port, type) {
  this.ip = ip;
  this.port = port;
  this.type = type;
};

//提取所有ip，通过check函数检查
var runIp = function(resolve) {
  var arr = [];
  allIp((err, response) => {
    console.error(response.length);
    for (let i = 0; i < response.length; i++) {
      var ips = response[i];
      var proxy = new Proxys(ips.ip, ips.port, ips.type);
      arr.push(check(proxy, headers));
    }
    Promise.all(arr).then(function() {
      allIp((err, response) => {
        console.log('\n\n可用ip为:');
        console.log(response);
      });
    });
  });
};

//检测ip
var check = function(proxy, headers) {
  return new Promise((resolve, reject) => {
    let p = `${proxy.type}://${proxy.ip}:${proxy.port}`;
    superagent
      .get('www.baidu.com')
      .set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
      )
      .proxy(p)
      .timeout(6000)
      .end((err, res) => {
        if (err) {
          ipDao.deleteIpByIp(proxy.ip);
        } else {
          console.log('success');
          resolve();
        }
      });
  });
};

//删除命令
var removeIp = function(ip) {
  ipModel.remove({ ip: ip }, function(err, res) {
    if (err) {
      console.log('删除ip错误');
      console.log(err);
    } else {
      console.log('删除ip成功', ip);
    }
  });
};

exports.run = function() {
  new Promise(ipUrl).then(runIp);
};

exports.check = function() {
  runIp();
};

exports.ips = function(callback) {
  allIp(callback);
};
