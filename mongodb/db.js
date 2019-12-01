/*
 * @Descripttion: 数据库连接
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-16 11:06:48
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:16:40
 */

'use strict';

var mongoose = require('mongoose'),
    config = require('../config/default'),
    chalk = require('chalk');

db = mongoose.connection;

mongoose.Promise = global.Promise;

var db ;

db.once('open' ,() => {
	console.log(chalk.green('连接数据库成功'));
})

db.on('error', function(error) {
    console.error(chalk.red('Error in MongoDb connection: ' + error));
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

const data_source = {
  
}

data_source.openDataSource = function(){
    mongoose.connect(config.url, {useNewUrlParser: true});
 }


module.exports = data_source;
