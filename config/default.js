/*
 * @Descripttion: 程序默认设置
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-16 11:10:20
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-26 18:39:59
 */


'use strict';

module.exports = {
	url: 'mongodb://localhost:27017/music',
	port: parseInt(process.env.PORT, 10) || 8001,
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		}
	},
	email:{
		host:'2994230021@qq.com',
		port:'25',
		auth:{
			user:'2994230021@qq.com',
			pass:'mpynxvrmxluzdeag'
		}
	}
}