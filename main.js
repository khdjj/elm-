let db = require('./mongodb/db'),
  express = require('express'),
  session = require('express-session'),
  cookParser = require('cookie-parser'),
  config = require('./config/default'),
  router = require('./routes/index'),
  schedule = require('node-schedule'),
  bodyParser = require('body-parser'),
  dao = require('./dao/order'),
  chalk = require('chalk');
db.openDataSource();
const app = express();
app.use(cookParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
router.routes(app);
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true, //指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    saveUninitialized: false, //是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    cookie: config.session.cookie,
  })
);

app.use(express.static('./public'));

app.listen(config.port, () => {
  console.log(chalk.green(`成功监听端口   ${config.port}`));
});

/**
 * 创建定时任务，每3个小时回滚一次数据库，将订单中超过1个小时未完成订单的数据进行自动完成,
 *  如果一天内没有完成评价的订单进行自动评价
 */
function scheduleCronstyle() {
  // 每23个小时后回滚数据库，将未评价的订单进行五星好评
  schedule.scheduleJob('* * 23 * * *', function () {
    console.error("autoRating")
    dao.autoRating();
  });

  // 每3个小时回滚数据库，将超时1小时未完成订单的数据进行自动完成
  schedule.scheduleJob('* * 3 * * *', function () {
    console.error("autoChangeOrderStatus")
    dao.autoChangeOrderStatus();
  });
}

scheduleCronstyle();
