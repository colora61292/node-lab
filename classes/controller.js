var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
    this.layout = 'layout';
};

//extend super class
require('util').inherits(Controller, require('kw').Controller);

Controller.prototype.beforeAction = function(){
    Controller.super_.prototype.beforeAction.apply(this);

};

Controller.prototype.afterAction = function(){
    Controller.super_.prototype.afterAction.apply(this);
};

Controller.prototype.checkUserSessionAlive = function(){
        return this.req.session['user'];
};

Controller.prototype.setUserSession = function(login){
    this.req.session['user'] = {
        login: login,
        party: 'shanghai'
    };
};

Controller.prototype.getUserSession = function(){
    return this.req.session['user'];
};

module.exports = Controller;
