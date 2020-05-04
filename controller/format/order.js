exports.formatData = (data) => {
  return {
    title: getTitle(),
    data: getData(data),
  };
};

const statusType = [
  {
    status: 1,
    label: '订单已完成',
  },
  {
    status: 2,
    label: '订单已评价',
  },
  {
    status: -1,
    label: '订单已取消',
  },
];

const statusMap = {};
statusType.map((item) => {
  statusMap[item.status] = item;
});

function getFood(food) {
  const foodname = [];
  (food || []).forEach((f) => {
    foodname.push(f.name);
  });
  return foodname.join(',');
}

function getData(data) {
  const list = [];
  (data || []).forEach((item) => {
    const { comments,restaurant={} } = item;
    const cm = comments.length > 0 ? comments[0] : {};
    console.error(cm.food)
    list.push({
      orderId: item._id,
      money: item.money,
      commend: cm.rating_text || '',
      reply: cm.reply || '',
      rating: cm.rating || 5,
      food: getFood(cm.food),
      restaurant:restaurant.name,
      status:statusMap[item.status].label,
      createdAt:item.creatAt
    });
  });
  return list;
}

function getTitle() {
  return [
    '订单号',
    '订单金额',
    '订单评价',
    '订单回复',
    '订单评价星级',
    '订单食品',
    '所属店铺',
    '订单状态',
    '订单创建时间',
  ];
}
