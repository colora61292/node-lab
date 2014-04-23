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
            var formId = this.req.param('id');
            model.loadList(formId, function(err){
                this_.renderView(model);
            });
        }
    }
};

module.exports = Controller;