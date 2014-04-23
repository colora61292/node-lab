var Model = function(model){
    Model.super_.apply(this);
    this.headTitle = '';
    this.cmsIndexUrl = require('kw').url.getUrlByPathInfo('cms/user/index.index');
    this.formListUrl = require('kw').url.getUrlByPathInfo('cms/user/form-list.index');
    this.leftColumn = false;
    this.rightColumn = false;
};

//extend super class
require('util').inherits(Model, require('kw').Model);

module.exports = Model;
