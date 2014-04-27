var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.pageTitle = '內容類別管理 - 新增';
    this.formActionUrl = require('kw').url.getUrlByPathInfo('cms/user/form-add.createForm');
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.addForm = function(options, callback){

        /*party:party,
        formName:formName,
        order:order,
        parentFormId:parentFormId,
        parentItemId:parentItemId,
        permission:permission,
        itemPrototype:itemPrototype*/

    var convertPermission = function(oldPermission, newPermission){
        if(oldPermission == 'create'){
            newPermission.create = true;
        }
        if(oldPermission == 'update'){
            newPermission.update = true;
        }
        if(oldPermission == 'read'){
            newPermission.read = true;
        }
        if(oldPermission == 'delete'){
            newPermission.delete = true;
        }
        return newPermission;
    };

    var newPermission = {
        create: false,
        update: false,
        read: false,
        delete: false
    };

    var cms = require('classes/cms');

    if(Array.isArray(options.permission)){
        for(var i=0; i<options.permission.length; i++){
            newPermission = convertPermission(options.permission[i],newPermission);
        }
    }else{
        newPermission = convertPermission(options.permission,newPermission);
    }

    options.permission = newPermission;

    options.itemPrototype = JSON.parse(require('kw').util.replaceTextAreaLineBreak(options.itemPrototype));

    options.parentItem.formId = ((require('kw').util.checkMongodbObjectId(options.parentItem.formId))?require('classes/mongoose').Types.ObjectId(options.parentItem.formId):null);

    options.parentItem.itemId = ((require('kw').util.checkMongodbObjectId(options.parentItem.itemId))?require('classes/mongoose').Types.ObjectId(options.parentItem.itemId):null);

    cms.makeForm(options, function(err){
       callback(err);
    });

};

module.exports = Model;