var util = require('util');
var SuperModel = require('kw').Model;

var mongoose = require('mongoose') || '';
var User = mongoose.model( 'User' );
var url = require('kw').url;

var Model = function(model){
    Model.super_.apply(this,[model]);
    this.title = 'CMS Login';
    this.loginActionUrl = url.getUrlByPathInfo('cms/user/login.auth');
    //this.loginActionUrl = '/cms/login/auth';
};

util.inherits(Model, SuperModel);

Model.prototype.loginFeedback = '';

Model.prototype.loginActionUrl = '';

Model.prototype.auth = function(login, password, callback){

    User.find({
        login:login,
        password:password
    },function ( err, result ){
        if(result.length == 1)
        {
            callback(null, {
                result:true,
                message:''
            });
            //req.session.user = result[0];
            //res.redirect('/list');
        }
        else
        {
            callback(err, {
                result:false,
                message:''
            });
            //req.flash('login_feedback', feedback);
            //res.redirect('/cms/login');
        }
    });

};

module.exports = Model;
