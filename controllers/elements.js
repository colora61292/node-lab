var util = require('util');
var SuperController = require('../classes/controller');
var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
};
util.inherits(Controller, SuperController);

Controller.prototype.layout = 'cms-layout'

Controller.prototype.beforeAction = function(){
    Controller.super_.prototype.beforeAction.apply(this);

};

Controller.prototype.afterAction = function(){
    Controller.super_.prototype.afterAction.apply(this);
};

Controller.prototype.actions = {
    index: {
        method: 'get',
        handle: function() {
            var model = new this.Model(cache);
            this.renderView(model);
        }
    },
    create : {
        method: 'post',
        handle: function(req, res) {


        }
    }
};

module.exports = Controller;
