var mongoose = require( 'mongoose' ) || '';
var User = mongoose.model( 'User' );

var util = require('util');
var SuperModel = require('../../classes/model');

var Model = function(model){
    Model.super_.apply(this,[model]);
    this.title = 'Login!';
    this.loginFeedback = 'X_X';
    this.loginActionUrl = '/cms/login/auth';
};

util.inherits(Model, SuperModel);

Model.prototype.loginFeedback = '';

Model.prototype.loginAction = '';

Model.prototype.timtest = '';

Model.prototype.auth = function(){};

module.exports = Model;
