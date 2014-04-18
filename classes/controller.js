var Controller = function(req, res){
    this.req = req;
    this.res = res;
};

Controller.prototype.beforeAction = function(){
    //console.log(Controller.actions);
};

Controller.prototype.afterAction = function(){

};

Controller.prototype.beforeRender = function(){

};

Controller.prototype.afterRender = function(){

};

/*Controller.prototype.renderModel = function(model, layout, callack) {
    if(typeof layout == 'undefined'){
        this.res.render(this.name,model);
    }else{
        var _this = this;
        this.res.render(this.name,model,function(err, html) {
            _this.res.locals.body_ = html;
            if(typeof callack != 'function'){
                _this.res.render(layout,model);
            }else{
                _this.res.render(layout,model,function(err, html){
                    callack(err, html);
                });
            }
        });
    }
};*/

Controller.prototype.cacheClient = null;
/*
Controller.prototype.renderWidget = function(controllerName, actionName, params ) {
    var Controller = require('../controller/'+controllerName);
    var controller = new Controller(this.req, this.res);
    controller.beforeAction();
    controller.actions[actionName].handle.apply(this);
    controller.afterAction();
    controller = null;

    if(typeof layout == 'undefined'){
        this.res.render(this.name,model);
    }else{
        var _this = this;
        this.res.render(this.name,model,function(err, html) {
            _this.res.locals._body = html;
            _this.res.render(layout,model);
        });
    }
};
 */
Controller.prototype.session = function(key, value) {
    if(typeof value == 'undefined'){
        return this.req.session[key];
    }else{
        this.req.session[key] = value;
    }
};

Controller.prototype.setCache = function(key, value, expireInMs) {
    this.cacheClient.set(key,JSON.stringify(value));
    if(expireInMs){
        this.cacheClient.pexpire(key,expireInMs);
    }
};

Controller.prototype.getCache = function(key, callback) {
    this.cacheClient.get(key,function(err, result){
        callback(err, JSON.parse(result));
    });
};

Controller.prototype.renderView = function(model, callack) {
    var this_ = this;
    this.res.render('./'+this.pathInfo,model,function(err, html) {
        if(err){
            html = err;
        }
        if(this_.layout && this_.layout != ''){
            this_.res.locals.body_ = html;
            if(typeof callack != 'function'){
                this_.res.render('./layouts_/'+this_.layout,model);
            }else{
                this_.res.render('./layouts_/'+this_.layout,model,function(err, html){
                    callack(err, html);
                });
            }
        }else{
            if(typeof callack != 'function'){
                this_.res.send(html);
            }else{
                callack(err, html);
            }
        }
    });
};

module.exports = Controller;
