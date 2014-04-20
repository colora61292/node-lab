var Model = function(model){
    Model.super_.apply(this);
    this.mainUrl = require('kw').url.getUrlByPathInfo('cms/user/index.index');
    this.categoryListUrl = require('kw').url.getUrlByPathInfo('cms/user/category-list.index');
};

//extend super class
require('util').inherits(Model, require('kw').Model);

module.exports = Model;
