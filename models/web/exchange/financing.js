var util = require('util');
var SuperModel = require('kw').Model;

var mongoose = require('classes/mongoose') || '';
var User = mongoose.model( 'User' );
var url = require('kw').url;

var Model = function(model){
    Model.super_.apply(this,[model]);
};

util.inherits(Model, SuperModel);

Model.prototype.loginFeedback = '';

Model.prototype.loginActionUrl = '';

Model.prototype.auth = function(login, password, callback){

};

module.exports = Model;
