var kw = require('kw');
var mongoose = require('classes/mongoose');

var cms = {
    onServerStart: function(){

        var Form = mongoose.model('Form');
        Form.find({}).exec(function(err, docs){

            if(docs && docs.length > 0){
                for(var i=0;i<docs.length; i++){
                    var itemSchema = {};
                    for(var j=0;j<docs[i].itemPrototype.length; j++){
                        itemSchema[docs[i].itemPrototype[j].id] = docs[i].itemPrototype[j].dataType;
                    }
                    mongoose.model('Item_'+docs[i]._id, new mongoose.Schema(itemSchema));
                }
            }else{
                cms.makeForm({
                    _id: mongoose.Types.ObjectId('303030303030303030303030'),
                    party: 'shanghai',
                    formName: 'Content Seed',
                    order: 0,
                    parentItem: {formId: null, itemId: null},
                    permission: {create: true, update: true, read: true, delete: true},
                    itemPrototype: [
                        {id:'itemName',order:1,display:true,hidden:false,readOnly:false,name:'Title',inputType:'text',dataType:'String',defaultValue:'No Title'},
                        //html: {order:3,display:false,hidden:false,readOnly:false,name:'Content',inputType:'html',dataType:'String',defaultValue:''},
                        {id:'hide',order:2,display:true,hidden:false,readOnly:false,name:'Hide',inputType:'checkbox',dataType:'Boolean',defaultValue:false},
                        {id:'active',order:4,display:false,hidden:true,readOnly:false,name:'Active',inputType:'checkbox',dataType:'Boolean',defaultValue:true}
                    ]},function(err){});
            }

        });

    },
    dropAllData: function(){
        var mongoose = require('mongoose');
        var Form = mongoose.model('Form');
        Form.remove({}, function(err) {
            console.log('Form collection removed')
        });
    },
    getItems: function(formId, conditions, callback){
        var Item = require('classes/mongoose').model('Item_'+formId);
        Item.find(conditions).exec(function(err, docs){

            callback(err, docs);

        });
    },
    makeForm: function(options, callback){

        //id, userId, name, order, parentFormId, parentItemId, permission, itemPrototype
        var Form = mongoose.model('Form');

        (new Form({
            _id: ((options._id)?options._id:mongoose.Types.ObjectId()),
            party : options.party,
            formName : options.formName,
            order : options.order,
            parentItem : options.parentItem,
            permission : options.permission,
            itemPrototype : options.itemPrototype
        })).save(function(err, doc, count){
                var itemSchema = {};
                for(var i=0; i<doc.itemPrototype.length; i++){
                    itemSchema[doc.itemPrototype[i].id] = doc.itemPrototype[i].dataType;
                }
                mongoose.model('Item_'+doc._id, new mongoose.Schema(itemSchema));
                callback(err);
            });

    }
};

module.exports = cms;