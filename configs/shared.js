//var express = require('express');
//var app = express();
var config = {};

config.route = {
    'cms/user/index.index':'/cms',
    'cms/user/login.index':'/cms/login',
    'cms/user/login.auth':'/cms/login/auth',
    'cms/user/form-list.index':'/cms/form-list',
    'cms/user/item-list.index':'/cms/form/:formId',
    'cms/user/item-edit.index':'/cms/form/:formId/item-edit/:itemId',
    'cms/user/item-edit.updateItem':'/cms/form/:formId/item-edit/:itemId/update',
    'cms/user/item-edit.deleteItem':'/cms/form/:formId/item-edit/:itemId/delete',
    'cms/user/item-add.index':'/cms/form/:formId/item-add',
    'cms/user/item-add.createItem':'/cms/form/:formId/item-add/create',
    'cms/process/ckeditor.htmlEditorFileUpload':'/cms/ckeditor-file-upload',
    'cms/user/form-add.index':'/cms/form-add',
    'cms/user/form-add.createForm':'/cms/form-add/create',
    'web/main/index.index':'/',
    'web/about/contact.index':'/about/contact',
    'web/about/five-lead.index':'/about/five-lead',
    'web/about/honor.index':'/about/honor',
    'web/about/introduction.index':'/about/introduction',
    'web/about/six-service.index':'/about/six-service',
    'web/exchange/download.index':'/exchange/download',
    'web/exchange/faq.index':'/exchange/faq',
    'web/exchange/financing.index':'/exchange/financing',
    'web/exchange/law.index':'/exchange/law',
    'web/exchange/notice.index':'/exchange/notice',
    'web/exchange/product.index':'/exchange/product',
    'web/exchange/receipt.index':'/exchange/receipt',
    'web/exchange/register.index':'/exchange/register',
    'web/exchange/settlement.index':'/exchange/settlement',
    'web/exchange/trade.index':'/exchange/trade',
    'web/news/coal.index':'/exchange/coal',
    'web/news/farm.index':'/exchange/farm',
    'web/news/metal.index':'/exchange/metal',
    'web/news/oil.index':'/exchange/oil',
    'web/research/achievement.index':'/research/achievement',
    'web/research/apply-service.index':'/research/apply-service',
    'web/research/recommend.index':'/research/recommend',
    'web/research/video.index':'/research/video',
    'web/research/workshop.index':'/research/workshop',
    'web/rule/exchange.index':'/rule/exchange',
    'web/rule/law.index':'/rule/law'
};

config.fileUpload = {
    rootUrl:'/uploads/',
    savePath:'public/uploads/'
};

module.exports = config;