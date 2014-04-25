var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadContent = function(){

    var cms = require('classes/cms');

    cms.getItems();


};

module.exports = Model;