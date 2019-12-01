let routerDiscover = require('./discover'),
    routerV1 = require('./v1'),
    routerWeapi = require('./weapi')

exports.routes = app=>{
    app.use('/discover',routerDiscover.router);
    app.use('/v1',routerV1.router);
    app.use('/weapi',routerWeapi.router);
}