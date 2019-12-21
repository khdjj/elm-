/*
 * @Descripttion: 实现对用户信息的加密和解密主要用于token用户身份验证
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-27 10:30:36
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-27 11:22:17
 */


let crypto = require('crypto');
let key = "YWuHRHqSLsNt0AP3";

encData = function(data){
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64';
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-128-cbc', key, '0102030405060708');   //该方法使用指定的算法、密码与初始向量、来创建cipher对象 方法返回一个被创建的cipher对象。
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));  //使用该对象的update方法来指定需要被加密的数据
    cipherChunks.push(cipher.final(cipherEncoding));  //可以使用cipher对象的final方法来返回加密数据。当该方法被调用时，任何cipher对象中所缓存的数据都将被加密。在使用了cipher对象的final方法
    return cipherChunks.join('');
}
decData = function(data){
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64';
    let cipherChunks = [];
    let cipher = crypto.createDecipheriv('aes-128-cbc', key, '0102030405060708');   //该方法使用指定的算法、密码与初始向量、来创建cipher对象 方法返回一个被创建的cipher对象。
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, cipherEncoding, clearEncoding ));  //使用该对象的update方法来指定需要被加密的数据
    cipherChunks.push(cipher.final(clearEncoding));  //可以使用cipher对象的final方法来返回加密数据。当该方法被调用时，任何cipher对象中所缓存的数据都将被加密。在使用了cipher对象的final方法
    return cipherChunks.join('');
}

module.exports={
    encData,
    decData
}

// 示例数据
// let data = "{userId:'552525525'}";
// let enc = encData(data,key);
// console.log("加密后的数据\n"+enc);
// console.log("解密后的数据\n"+decData(enc,key));
