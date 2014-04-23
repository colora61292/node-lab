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
            var itemId = this.req.param('itemId');
            model.loadItem(formId, itemId, function(err){
                this_.renderView(model);
            });
        }
    },
    htmlEditorFileUpload: {
        method: 'post',
        handle: function() {
            console.log(this.req.files);
            var this_ = this;
            var model = new this.Model();
            var funcNum = this_.req.param('CKEditorFuncNum');
            var filePath = this.req.files.upload.path;
            model.uploadFile(filePath,funcNum,function(err){
                this_.res.send(model.callbackFileUrlScript);
            });
        }
    }
};

module.exports = Controller;