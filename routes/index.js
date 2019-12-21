let routerUser = require('./user');

exports.routes = app=>{
    app.use('/user',routerUser.router)
}