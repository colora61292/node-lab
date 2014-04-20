var Model = function(model){
    Model.super_.apply(this);
    this.loginResult = null;
    this.loginFeedback = '';
    this.loginActionUrl = require('kw').url.getUrlByPathInfo('cms/user/login.auth');
    this.initByJSON(model);
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.auth = function(login, password){

    //TODO login
    var result = false;
    var messages = [];

    if(login == 'admin' && password == '12345678'){
        result = true;
        messages = ['Login success.'];
    }else{
        result = false;
        messages = ['Login fail.'];
    }

    for(var message in messages){
        this.loginFeedback = '<br>'+messages[message];
    }

    this.loginResult = result;

    /*callback(null,{
        result: result,
        messages: messages
    });*/

    //var cacheClient = require('classes/cache-client');

    /*User.find({
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
     });*/

};

module.exports = Model;