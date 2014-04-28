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

        cms.getItems('535c608c371e280000883c23',{'_id':'535c64b2d68d6200008f5237'},function(err, docs){

            this_.pageContent = docs[0].pageContent;
            callback(err);

        });

    }]);
};

module.exports = Model;