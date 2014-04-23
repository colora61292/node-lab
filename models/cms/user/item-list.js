var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.itemPrototype = [];
    this.itemList = [];
    this.formId = 0;
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadList = function(formId, callback){

    this.formId = formId;
    var this_ = this;
    var Form = require('classes/mongoose').model('Form');
    Form.findOne({'_id': formId}).exec(function(err, doc){

        this_.itemPrototype = doc.itemPrototype;
        this_.itemList = doc.itemList;
        callback(err);

    });


};

module.exports = Model;