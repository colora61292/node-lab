var Model = function(model){
    Model.super_.apply(this);
    this.headTitle = '';
    this.cmsIndexUrl = require('kw').url.getUrlByPathInfo('cms/user/index.index');
    this.formListUrl = require('kw').url.getUrlByPathInfo('cms/user/form-list.index');
    this.leftColumn = false;
    this.rightColumn = false;
    this.levelOneMenuList = [];
    this.levelTwoMenuList = [];
    this.pageContent = '';
};

//extend super class
require('util').inherits(Model, require('kw').Model);

Model.prototype.loadContent = function(callback){

    this.loadMainMenu(callback);

};

Model.prototype.loadMainMenu = function(callback){

    var cms = require('classes/cms');

    /* cms.getItems();*/
    var this_ = this;

    var formId = '535c5d2d51cfe4000010e37b';

    var Form = require('classes/mongoose').model('Form');

    var LevelOneItem = require('classes/mongoose').model('Item_'+formId);

    LevelOneItem.find({}).exec(function(err, docs){

        this_.levelOneMenuList = docs;

    });

    Form.find({"parentItem.formId":formId}).exec(function(err, levelOneDocs){

        var finishCount = levelOneDocs.length;

        for(var i=0;i<levelOneDocs.length; i++){

            var LevelTwoItem = require('classes/mongoose').model('Item_'+levelOneDocs[i]._id);

            LevelTwoItem.find({}).exec((function(parentItem){

                return function(err, levelTwoDocs){
                    //console.log(levelTwoDocs);
                    for(var j=0;j<levelTwoDocs.length; j++){

                        //console.log(parentItem);
                        levelTwoDocs[j].parentItem = parentItem;
                        this_.levelTwoMenuList.push(levelTwoDocs[j]);

                    }

                    if(--finishCount == 0 || err != null) {
                        //console.log(this_.levelTwoMenuList);
                        callback(err);
                    }
                }

            })(levelOneDocs[i].parentItem));
        }

    });

};

module.exports = Model;
