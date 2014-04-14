var util = require('util');
var SuperController = require('../classes/controller');
var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
};
util.inherits(Controller, SuperController);

Controller.prototype.layout = 'layout'

Controller.prototype.beforeAction = function(){
    Controller.super_.prototype.beforeAction.apply(this);

};

Controller.prototype.afterAction = function(){
    Controller.super_.prototype.afterAction.apply(this);
};

Controller.prototype.actions = {
    index: {
        method: 'get',
        //url: ['/cms/login'],
        handle: function() {
            var this_ = this;
            this.getCache(this_.sessionID+'-'+this_.name,function(err,cache){
                var model;
                if(cache){
                    model = new this_.Model(cache);
                }else{
                    model = new this_.Model();
                    model.init();

                    this_.setCache(this_.sessionID+'-'+this_.name,model);
                }
                this_.renderView(model);
            });
        }
    },
    auth : {
        method: 'post',
        //url: ['/cms/login/auth'],
        handle: function(req, res) {

            /*var feedback = [];

             user.find({
             login:req.param('login'),
             password:req.param('password')
             },function ( err, result ){
             if(result.length == 1)
             {
             req.session.user = result[0];
             res.redirect('/list');
             }
             else
             {
             feedback.push("Login invalid.");
             req.flash('login_feedback', feedback);
             res.redirect('/cms/login');
             }
             });*/

        }
    }
};

module.exports = Controller;
