let routerUser = require('./user'),
    routerRestaurant = require('./restaurant')

exports.routes = app=>{
    app.use('/user',routerUser.router);
    app.use('/restapi',routerRestaurant.router);
}