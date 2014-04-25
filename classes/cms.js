var kw = require('kw');

var cms = {
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
    makeForm: function(id, userId, name, order, permission, itemPrototype, callback){

        var mongoose = require('mongoose');
        var Form = mongoose.model('Form');

        (new Form({
            _id: id,
            userId : userId,
            name : name,
            order : order,
            permission : permission,
            itemPrototype : itemPrototype
        })).save(function(err, doc, count){
                //console.log(err);
                var itemSchema = {};
                for(var key in doc.itemPrototype){
                    if(doc.itemPrototype.hasOwnProperty(key)){
                        itemSchema[key] = doc.itemPrototype[key].dataType;
                    }
                }
                mongoose.model('Item_'+doc._id, new mongoose.Schema(itemSchema));
                callback(err);
            });

    }
};

module.exports = cms;