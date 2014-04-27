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
                this_.renderView(model);
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }
        }
    },
    createForm: {
        method: 'post',
        handle: function() {
            if(this.checkUserSessionAlive()){
                //<!--//id, party, formName, order, parentFormId, parentItemId, permission, itemPrototype, callback-->
                var this_ = this;
                var model = new this.Model();
                var party = this.req.param('party');
                var formName = this.req.param('formName');
                var order = this.req.param('order');
                var parentItem = this.req.param('parentItem');
                var permission = this.req.param('permission');
                var itemPrototype = this.req.param('itemPrototype');

                //this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/form-add.index'))
                model.addForm({
                    party:party,
                    formName:formName,
                    order:order,
                    parentItem:parentItem,
                    permission:permission,
                    itemPrototype:itemPrototype
                },function(err){
                    this_.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/form-list.index'))
                });
            }else{
                this.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/login.index'));
            }
        }
    }
};

module.exports = Controller;