//var express = require('express');
//var app = express();
var config = {};

config.route = {
    '/cms':'cms/user/index.index',
    '/cms/login':'cms/user/login.index',
    '/cms/login/auth':'cms/user/login.auth',
    '/cms/category-list':'cms/user/category-list.index'
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