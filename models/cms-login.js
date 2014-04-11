var mongoose = require( 'mongoose' ) || '';
var user = mongoose.model( 'user' );

var util = require('util');
var SuperModel = require('../classes/model');

var Model = function(model){
    Model.super_.apply(this,[model]);
};

util.inherits(Model, SuperModel);

Model.prototype.loginFeedback = '';

Model.prototype.loginAction = '';

Model.prototype.timtest = '';

Model.prototype.init = function(){
    this.title = 'Login!';
    this.loginFeedback = 'X_X';
    this.loginAction = '/cms/login/auth';
};

Model.prototype.auth = function(){};

module.exports = Model;
