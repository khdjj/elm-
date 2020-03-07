var MenuModel = require('../models/menu');

exports.save = async function(data) {
  var menu = new MenuModel({
    ...data
  });
  try {
    //去重
    const r = await MenuModel.findOne({ id: data.id });
    if (r) return;
    console.error('插入菜单')
    return await menu.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};


