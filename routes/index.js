let routerUser = require('./user'),
  routerAddress = require('./address'),
  routerOrder = require('./order'),
  routerBusiness = require('./business'),
  routerUpload = require('./upload'),
  routerFood = require('./food'),
  routerCommend = require('./commend'),
  routerExport = require('./export'),
  routerRestaurant = require('./restaurant');

exports.routes = app => {
  app.use('/user', routerUser.router);
  app.use('/restapi', routerRestaurant.router);
  app.use('/address', routerAddress.router);
  app.use('/order', routerOrder.router);
  app.use('/business', routerBusiness.router);
  app.use('/upload', routerUpload.router);
  app.use('/food', routerFood.router);
  app.use('/commend', routerCommend.router);
  app.use('/export', routerExport.router);
};
