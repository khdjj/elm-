/*
 * @Descripttion:
 * @version:
 * @Author: khdjj
 * @Date: 2019-06-27 22:01:49
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-12 21:44:42
 */
let formidable = require('formidable'), //处理文件上传模块
  fs = require('fs'),
  path = require('path'),
  gm = require('gm'); //处理图片模块

module.exports = function(req, res) {

  const form = formidable.IncomingForm();
  form.uploadDir = './public/img';
  form.parse(req, function(err, fields, files) {
    const hashName = (
      new Date().getTime() + Math.ceil(Math.random() * 10000)
    ).toString(16);
    console.error(files,fields)
    const extname = path.extname(files.file.name);
    if (!['.jpg', '.jpeg', '.png', '.bmp'].includes(extname)) {
      fs.unlinkSync(files.file.path);
      res.send({
        error: 400,
        msg: '图片格式错误'
      });
      res.send({
        error: 4007,
        msg: '文件上传失败'
      });
      return;
    }
    const realpath = './public/img/' + hashName + extname;
    console.log(realpath);
    try {
      fs.renameSync(files.file.path, realpath);
      res.send({
        code: 200,
        imgPath: hashName + extname,
        fields: fields
      });
      // gm(realpath).resize(200,200).write(realpath,(err)=>{
      //     if(err){
      //         console.log("图片裁剪失败");
      //         reject("图片裁剪失败");
      //         console.log(err);
      //     }else{
      //         let data = {};
      //         data.imgpath = hashName+extname;
      //         data.fields = fields;
      //         resolve(data);
      //     }
      // });
    } catch (err) {
      console.log('保存图片失败' + err);
      if (fs.existsSync(realpath)) {
        fs.unlinkSync(realpath);
      } else {
        fs.unlinkSync(realpath);
      }
      res.send({
        error: 4007,
        msg: '文件上传失败'
      });
    }
  });
};
