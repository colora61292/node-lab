var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.pageContent = '';
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadContent = function(callback){
    var this_ = this;
    var cms = require('classes/cms');

    Model.super_.prototype.loadContent.apply(this, [function(err){

        cms.getItems('535c6683d68d6200008f523a',{'_id':'535c66d5d68d6200008f523c'},function(err, docs){

            this_.pageContent = docs[0].pageContent;
            callback(err);

        });

    }]);
};

module.exports = Model;