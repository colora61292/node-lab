var ckEditor = {
    callbackFileUrlScript: function(functionNum, fileUrl){
        if(!functionNum){
            functionNum = 2;
        }
        return '<script>window.parent.CKEDITOR.tools.callFunction('+functionNum+','+fileUrl+',\'\');</script>';
    }
};

module.exports = ckEditor;