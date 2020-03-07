var SupportModel = require('../models/support');

exports.save = async function(data) {
  var support = new SupportModel({
    ...data
  });
  try {
    //去重
    const r = await SupportModel.findOne({ id: data.id });
    if (r) return;
    return await support.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};
