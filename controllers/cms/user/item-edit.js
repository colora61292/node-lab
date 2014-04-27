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
                var formId = this.req.param('formId');
                var itemId = this.req.param('itemId');
                model.loadItem(formId, itemId, function(err){
                    this_.renderView(model);
                });
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }
        }
    },
    updateItem: {
        method: 'post',
        handle: function() {
            if(this.checkUserSessionAlive()){
                var this_ = this;
                var model = new this.Model();
                var formId = this.req.param('formId');
                var itemId = this.req.param('itemId');
                var fields = this.req.param('field');

                model.updateItem(formId,itemId,fields,function(err){
                    this_.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/item-edit.index',{formId:formId,itemId:itemId}));
                });

                /*var itemId = this.req.param('itemId');
                 model.uploadItem(formId,itemId,function(err){
                 this_.res.send(model.callbackFileUrlScript);
                 });*/
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }
        }
    },
    deleteItem: {
        method: 'post',
        handle: function() {
            if(this.checkUserSessionAlive()){
                var this_ = this;
                var model = new this.Model();
                var formId = this.req.param('formId');
                var itemId = this.req.param('itemId');

                model.removeItem(formId,itemId,function(err){
                    this_.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/item-list.index',{formId:formId}));
                });

                /*var itemId = this.req.param('itemId');
                 model.uploadItem(formId,itemId,function(err){
                 this_.res.send(model.callbackFileUrlScript);
                 });*/
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }
        }
    }
};

module.exports = Controller;