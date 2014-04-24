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
        for(var key in doc.itemList){
            if(doc.itemList.hasOwnProperty(key)){
                if(doc.itemList[key].active == 1){
                    this_.itemList[key] = doc.itemList[key];
                }
            }
        }

        callback(err);

    });


};

module.exports = Model;