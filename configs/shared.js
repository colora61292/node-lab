//var express = require('express');
//var app = express();
var config = {};

config.route = {
    '/cms/login':'cms/user/login.index',
    '/cms/login/auth':'cms/user/login.auth'
};

// add env config
/*var envConfig = require('../configs/'+app.get('env'));
if(envConfig){
    for(var key in envConfig){
        if(envConfig.hasOwnProperty(key)){
            config[key] = envConfig[key];
        }
    }
}*/

module.exports = config;