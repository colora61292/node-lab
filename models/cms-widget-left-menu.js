var mongoose = require( 'mongoose' ) || '';
var user = mongoose.model( 'user' );

var util = require('util');
var SuperModel = require('../classes/model');

var Model = function(model){
    Model.super_.apply(this,[model]);
};

util.inherits(Model, SuperModel);

module.exports = Model;
