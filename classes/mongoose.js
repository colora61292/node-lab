var config = require('kw').application.config();

//var cms = require('classes/cms');

/*
 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 ObjectId
 Array
 * */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*var User = new Schema({
 login : String,
 password : String,
 party : String
 });*/

mongoose.model('User', new Schema({
    login : String,
    password : String,
    party : String
}));

/*var Form = new Schema({
 userId : { type: Schema.Types.ObjectId, ref: 'User' },
 name : String,
 itemPrototype : Schema.Types.Mixed
 });*/

mongoose.model('Form', new Schema({
    //_id: String,
    party : String,
    formName : String,
    parentItem: {formId:{type: Schema.Types.ObjectId, ref: 'Form'},itemId: Schema.Types.ObjectId},
    order : Number,
    permission : Schema.Types.Mixed,
    itemPrototype : [Schema.Types.Mixed]
}));

mongoose.connect(config.database.connectionString);

//TODO init data for dev
var User = mongoose.model('User');

User.remove({}, function(err) {
    console.log('User collection removed')
});

var user = new User({
    _id: mongoose.Types.ObjectId(0),
    login: 'admin',
    password: '12345678',
    party: 'shanghai'
});
user.save(function(err, doc, count){

    //cms.dropAllData();

    //cms.onServerStart();

//id, userId, name, order, parentFormId, parentItemId, permission, itemPrototype, callback
    /*cms.makeForm({
        _id: mongoose.Types.ObjectId('303030303030303030303030'),
        party: 'shanghai',
        formName: 'Content Seed',
        order: 0,
        parentItem: {formId: null, itemId: null},
        permission: {create: true, update: true, read: true, delete: true},
        itemPrototype: {
            itemName: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
            //html: {order:3,display:false,hidden:false,readOnly:false,name:'Content',inputType:'html',dataType:'String',defaultValue:''},
            hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
            active: {order:4,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
        }},function(err){});*/

    /*cms.makeForm({
        _id: mongoose.Types.ObjectId('303030303030303030303031'),
        party: 'shanghai',
        formName: 'Normal Product',
        order: 1,
        parentItem: {formId:null,itemId:null},
        permission: {create: true, update: true, read: true, delete: true},
        itemPrototype: {
            name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
            hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
            active: {order:3,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
        }},function(err){});*/

    /*cms.makeForm({
        _id: mongoose.Types.ObjectId('303030303030303030303031'),
        party: 'shanghai',
        formName: 'Level 1 main menu',
        order: 1,
        parentItem: {formId: null, itemId: null},
        permission: {create: true, update: true, read: true, delete: true},
        itemPrototype: {
            name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
            hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
            active: {order:3,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
        }},function(err){});*/

});



//var FormModel = mongoose.model('Form');
//
//(new FormModel({
//    user : 0,
//    name : 'Normal HTML',
//    itemPrototype : {
//        name: {display:true,name:'Title',inputType:'text'},
//        html: {display:false,name:'Content',inputType:'html'}
//    }/*,
//    itemList : {
//        'id123':{name: 'Page 1',html: 'Content 1', active: 1},
//        'id234':{name: 'Page 2',html: 'Content 2', active: 1}
//    }*/
//})).save();
//
//(new FormModel({
//    user : 0,
//    name : 'Normal Product',
//    itemPrototype : {
//        name: {display:true,name:'Title',inputType:'text'}
//    }/*,
//    itemList : {
//        'id123':{name: 'Product 1', active: 1},
//        'id234':{name: 'Product 2', active: 1}
//    }*/
//})).save();

module.exports = mongoose;