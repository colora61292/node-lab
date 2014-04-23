var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.item = {};
    this.itemPrototype = {};
    this.callbackFileUrlScript = '';
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadItem = function(formId, itemId, callback){

    var this_ = this;
    var Form = require('classes/mongoose').model('Form');
    Form.findOne({'_id': formId}).exec(function(err, doc){

        this_.itemPrototype = doc.itemPrototype;
        this_.item = doc.itemList[itemId]
        callback(err);

    });


};

Model.prototype.uploadFile = function(path, funcNum, callback){

    var this_ = this;
    require('kw').file.upload(path, function(err, feedback){
        this_.callbackFileUrlScript = require('classes/ck-editor').callbackFileUrlScript(funcNum,feedback.fileUrl);
        callback(err);
    });

};

module.exports = Model;