//var express = require('express');
//var app = express();
var config = {};

/*config.route = {
    '/cms':'cms/user/index.index',
    '/cms/login':'cms/user/login.index',
    '/cms/login/auth':'cms/user/login.auth',
    '/cms/category-list':'cms/user/category-list.index',
    '/cms/item-list/:_id':'cms/user/item-list.index'
};*/

config.route = {
    'cms/user/index.index':'/cms',
    'cms/user/login.index':'/cms/login',
    'cms/user/login.auth':'/cms/login/auth',
    'cms/user/form-list.index':'/cms/form-list',
    'cms/user/item-list.index':'/cms/form/:id',
    'cms/user/item-edit.index':'/cms/form/:formId/item-edit/:itemId',
    'cms/user/item-edit.htmlEditorFileUpload':'/cms/item-edit/file-upload',
    'cms/user/item-add.index':'/cms/form/:formId/item-add',
    'web/main/index.index':'/'
};

config.fileUpload = {
    rootUrl:'/uploads/',
    savePath:'public/uploads/'
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