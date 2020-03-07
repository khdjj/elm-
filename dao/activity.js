var ActivityModel = require('../models/activity');

exports.save = async function(data) {
  var activity = new ActivityModel({
    ...data
  });
  try {
    //去重
    const r = await ActivityModel.findOne({ id: data.id });
    if (r) return;
    console.error('插入活动')

    return await activity.save();
  } catch (err) {
    console.error(err);
    return err;
  }
};
