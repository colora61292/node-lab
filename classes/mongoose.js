var config = require('kw').application.config();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/*var User = new Schema({
 login : String,
 password : String,
 party : String
 });*/

mongoose.model('User', new Schema({
    _id : Number,
    login : String,
    password : String,
    party : String
}));

/*var Form = new Schema({
 name : String,
 party : String,
 prototype : Schema.Types.Mixed,
 elements : [Schema.Types.Mixed]
 });*/

mongoose.model('Form', new Schema({
    _id : Number,
    user : { type: Number, ref: 'User' },
    name : String,
    itemPrototype : Schema.Types.Mixed,
    itemList : Schema.Types.Mixed
}));

mongoose.connect(config.database.connectionString);


//TODO init data for dev
var User = mongoose.model('User');
var user = new User({
    _id: 0,
    login: 'admin',
    password: '12345678',
    party: 'shanghai'
});
user.save();

var Form = mongoose.model('Form');

(new Form({
    _id: 0,
    user : 0,
    name : 'Normal HTML',
    itemPrototype : {
        name: {display:true,name:'Title',inputType:'text'},
        html: {display:false,name:'Content',inputType:'html'}
    },
    itemList : {
        'id123':{name: 'Page 1',html: 'Content 1'},
        'id234':{name: 'Page 2',html: 'Content 2'}
    }
})).save();

(new Form({
    _id: 1,
    user : 0,
    name : 'Normal Product',
    itemPrototype : {
        name: {display:true,name:'Title',inputType:'text'}
    },
    itemList : {
        'id123':{name: 'Product 1'},
        'id234':{name: 'Product 2'}
    }
})).save();

module.exports = mongoose;