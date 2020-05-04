const ejsexcel = require('ejsexcel');
const orderDao = require('../dao/order');
const order = require('./format/order');
const utils = require('../service/utils');
const getUser = require('../service/getUser');
const fs = require('fs');

class Export {
  constructor() {
    this.exportOrderFile = this.exportOrderFile.bind(this);
  }

  async exportOrderFile(req, res, next) {
    const _id = getUser.getId(req);
    try {
      //获得Excel模板的buffer对象
      const exlBuf = fs.readFileSync(__dirname + '/template/order.xlsx');
      const data = await orderDao.getBusinessAllOrderList(_id);
      //数据源
      const result = order.formatData(data);
      //用数据源(对象)result渲染Excel模板
      // cachePath为编译缓存路径, 绝对路径, 若不设置, 则无缓存
      const exlBuf2 = await ejsexcel.renderExcel(exlBuf, result, {
        cachePath: __dirname + '/cache/',
      });
      const uuid = utils.random();
      await fs.writeFileSync(`./public/excel/${uuid}_order.xlsx`, exlBuf2);
      res.send({
        code: 200,
        fileName: `${uuid}_order.xlsx`,
      });
    } catch (err) {
      console.error(err);
      res.send({
        error: 400,
        msg: '导出失败，请重试',
      });
    }
  }
}

const exportfile = new Export();
module.exports = {
  exportOrderFile: exportfile.exportOrderFile,
};
