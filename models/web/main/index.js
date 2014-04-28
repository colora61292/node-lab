var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.levelOneMenuList = [];
    this.levelTwoMenuList = [];
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadContent = function(callback){

    Model.super_.prototype.loadContent.apply(this, [function(err){

        callback(err);

    }]);
};

module.exports = Model;