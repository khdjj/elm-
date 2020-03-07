var proxy_pool = require('./proxy_pool');
proxy_pool.check();
// var superaget = require('superagent');
// require('superagent-proxy')(superaget);

// var proxy =  'http://165.227.121.227:3128';
// // proxy_pool.run();
// superaget
//   .get('www.baidu.com/')
//   .proxy(proxy)
//   .end(onresponse);
 
// function onresponse (err, res) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res.status, res.headers);
//     console.log(res);
//   }
// }