var dao = require('../dao/ip');
exports.getProxyIP =async function(){
    let ips = await dao.readIP();
    if(ips){
        return ips[parseInt(Math.random() * ips.length)];
    }
}