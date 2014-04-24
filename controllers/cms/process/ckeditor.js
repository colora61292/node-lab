var Controller = function(req, res){
    Controller.super_.apply(this,[req, res]);
    this.layout = 'cms-layout';
};

require('util').inherits(Controller, require('classes/controller'));

Controller.prototype.actions = {
    htmlEditorFileUpload: {
        method: 'post',
        handle: function() {
            var this_ = this;
            var model = new this.Model();
            var funcNum = this_.req.param('CKEditorFuncNum');
            var filePath = this_.req.files.upload.path;
            model.uploadFile(filePath,funcNum,function(err){
                this_.res.send(model.callbackFileUrlScript);
            });
        }
    }
};

module.exports = Controller;