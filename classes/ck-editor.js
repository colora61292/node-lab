var ckEditor = {
    callbackFileUrlScript: function(functionNum, fileUrl){
        return '<script>window.parent.CKEDITOR.tools.callFunction('+functionNum+',\''+fileUrl+'\',\'\');</script>';
    }
};

module.exports = ckEditor;