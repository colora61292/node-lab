var config = require('kw').application.config();

var cms = require('classes/cms');

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
    userId : { type: Schema.Types.ObjectId, ref: 'User' },
    name : String,
    itemPrototype : Schema.Types.Mixed
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

    cms.dropAllData();

    cms.makeForm('0', doc._id,'Normal HTML',0,{
        create: true,
        update: true,
        read: true,
        delete: true
    },{
        name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        html: {order:3,display:false,hidden:false,readOnly:false,name:'Content',inputType:'html',dataType:'String',defaultValue:''},
        hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
        active: {order:4,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
    },function(err){});

    cms.makeForm('1', doc._id,'Normal Product',1,{
        create: true,
        update: true,
        read: true,
        delete: true
    },{
        name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
        active: {order:3,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
    },function(err){});

    cms.makeForm('2', doc._id,'Level 1 Menu',2,{
        create: false,
        update: true,
        read: true,
        delete: true
    },{
        name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        url: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
        active: {order:3,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
    },function(err){});

    cms.makeForm('3', doc._id,'Level 2 Menu',3,{
        create: false,
        update: true,
        read: true,
        delete: true
    },{
        name: {order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        url: {order:1,display:true,hidden:false,readOnly:true,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
        hide: {order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
        active: {order:3,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
    },function(err){});
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