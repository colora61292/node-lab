var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.pageTitle = '物品管理 - 修改';
    this.item = {};
    this.itemPrototype = {};
    this.callbackFileUrlScript = '';
    this.formActionUrl = '';
    this.backUrl = '';
    this.deleteUrl = '';
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadItem = function(formId, itemId, callback){

    this.formActionUrl = require('kw').url.getUrlByPathInfo('cms/user/item-edit.updateItem',{formId:formId,itemId:itemId});
    this.backUrl = require('kw').url.getUrlByPathInfo('cms/user/item-list.index',{formId:formId});
    this.deleteUrl = require('kw').url.getUrlByPathInfo('cms/user/item-edit.deleteItem',{formId:formId,itemId:itemId});

    var this_ = this;
    var Form = require('classes/mongoose').model('Form');
    Form.findOne({'_id': formId}).exec(function(err, doc){

        /*var itemPrototype = [];
        for(var i=0;i<doc.itemPrototype.length; i++){
            itemPrototype.push(doc.itemPrototype[i]);
        }
        itemPrototype.sort(function(a,b){
            return a.order- b.order;
        });*/
        doc.itemPrototype.sort(function(a,b){
            return a.order- b.order;
        });
        this_.itemPrototype = doc.itemPrototype;

        var Item = require('classes/mongoose').model('Item_'+doc._id);
        Item.findOne({'_id': itemId}).exec(function(err, doc){
            this_.item = doc;
            callback(err);
        });
    });

};

Model.prototype.updateItem = function(formId, itemId, fields, callback){

    var this_ = this;
    var Item = require('classes/mongoose').model('Item_'+formId);
    //var set = {};
    //set['itemList.'+itemId] = fields;
    Item.update({_id: itemId}, fields).exec(function(err, result){
        callback(err);
    });

};

Model.prototype.removeItem = function(formId, itemId, callback){

    var this_ = this;
    //var Form = require('classes/mongoose').model('Form');
    var Item = require('classes/mongoose').model('Item_'+formId);
    Item.remove({_id: itemId}).exec(function (err) {
        callback(err);
    });
    /*var set = {};
    set['itemList.'+itemId+'.active'] = 0;
    Form.update({_id: formId}, {$set: set}).exec(function(err, result){
        callback(err);
    });*/

};

module.exports = Model;