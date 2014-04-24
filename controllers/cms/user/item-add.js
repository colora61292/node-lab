var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
    this.layout = 'cms-layout';
};

require('util').inherits(Controller, require('classes/controller'));

Controller.prototype.actions = {
    index: {
        method: 'get',
        handle: function() {
            var this_ = this;
            var model = new this.Model();
            var formId = this.req.param('formId');
            model.loadForm(formId, function(err){
                this_.renderView(model);
            });
        }
    },
    createItem: {
        method: 'post',
        handle: function() {
            var this_ = this;
            var model = new this.Model();
            var formId = this.req.param('formId');
            var fields = this.req.param('field');

            model.addItem(formId,fields,function(err){
                this_.res.redirect(require('kw').url.getUrlByPathInfo('cms/user/item-list.index',{formId:formId}));
            });
        }
    }
};

module.exports = Controller;