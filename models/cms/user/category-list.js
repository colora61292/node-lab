var util = require('util');
var SuperModel = require('classes/model');

var mongoose = require('mongoose') || '';
var User = mongoose.model( 'User' );
var url = require('classes/url');

var Model = function(model){
    Model.super_.apply(this,[model]);
};

util.inherits(Model, SuperModel);

Model.prototype.loginFeedback = '';

Model.prototype.loginActionUrl = '';

Model.prototype.auth = function(login, password, callback){

};

module.exports = Model;
