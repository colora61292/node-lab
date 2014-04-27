var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
    this.layout = 'cms-layout';
};

require('util').inherits(Controller, require('classes/controller'));

Controller.prototype.actions = {
    index: {
        method: 'get',
        handle: function() {
            if(this.checkUserSessionAlive()){
                var this_ = this;
                var model = new this.Model();
                model.loadList(this.getUserSession().party, function(err){
                    if(err){
                        this_.res.send(err);
                    }
                    this_.renderView(model);
                });
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }

        }
    }
};

module.exports = Controller;