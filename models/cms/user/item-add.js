var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.pageTitle = '物品管理 - 新增';
    this.itemPrototype = {};
    this.callbackFileUrlScript = '';
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadForm = function(formId, callback){

    this.formActionUrl = require('kw').url.getUrlByPathInfo('cms/user/item-add.createItem',{formId:formId});

    var this_ = this;
    var Form = require('classes/mongoose').model('Form');
    Form.findOne({'_id': formId}).exec(function(err, doc){

        this_.itemPrototype = doc.itemPrototype;
        callback(err);

    });

};

Model.prototype.addItem = function(formId, fields, callback){

    var this_ = this;
    var Form = require('classes/mongoose').model('Form');
    var set = {};

    fields.active = 1;
    set['itemList.'+require('kw').util.guid()] = fields;
    Form.update({_id: formId}, {$set: set}).exec(function(err, result){
        callback(err);
    });

    /*Form.findOne({'_id': formId}).exec(function(err, doc){
     //this_.itemPrototype = doc.itemPrototype;
     for(var key in fields){
     if(fields.hasOwnProperty(key)){
     doc.itemList[itemId][key] = fields[key];
     }
     }


     doc.save(function(err, result){
     console.log(result);
     callback(err);
     });
     });*/

};

module.exports = Model;