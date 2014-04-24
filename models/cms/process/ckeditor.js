var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.uploadFile = function(path, funcNum, callback){

    var this_ = this;
    require('kw').file.upload(path, function(err, feedback){
        this_.callbackFileUrlScript = require('classes/ck-editor').callbackFileUrlScript(funcNum,feedback.fileUrl);
        callback(err);
    });

};

module.exports = Model;