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
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/index.index'));
            }
            var model = new this.Model(this.loadModelAttr(true));
            this.renderView(model);

        }
    },
    auth : {
        method: 'post',
        handle: function() {

            var login = this.req.param('login');
            var password = this.req.param('password');
            var model = new this.Model();

            model.auth(login, password);

            if(model.loginResult == true){
                this.setUserSession(login);
            }

            this.saveModelAttr(model);
            this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));

        }
    }
};

module.exports = Controller;