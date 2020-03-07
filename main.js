let db = require('./mongodb/db'),
  express = require('express'),
  session = require('express-session'),
  cookParser = require('cookie-parser'),
  config = require('./config/default'),
  router = require('./routes/index'),
  bodyParser = require('body-parser'),
  chalk = require('chalk');
db.openDataSource();
const app = express();
app.use(cookParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header('Access-Control-Allow-Origin', '*'); //Access-Control-Allow-Origin 解决跨域请求
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  ); //Access-Control-Allow-Headers  表明它允许跨域请求包含content-type头
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //表明它允许GET、PUT、DELETE的外域请求
  res.header('Access-Control-Allow-Credentials', true); //可以带cookies
  res.header('X-Powered-By', 'Express');
  next();
});
router.routes(app);
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true, //指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    saveUninitialized: false, //是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    cookie: config.session.cookie
  })
);

app.use(express.static('./public'));

app.listen(config.port, () => {
  console.log(chalk.green(`成功监听端口   ${config.port}`));
});
