var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
};

require('util').inherits(Model, require('classes/model'));

module.exports = Model;