var Model = function(model){
    Model.super_.apply(this);
    this.initByJSON(model);
    this.categoryList = [];
};

require('util').inherits(Model, require('classes/model'));

Model.prototype.loadList = function(party, callback){

    var this_ = this;
    var User = require('classes/mongoose').model('User');
    var Form = require('classes/mongoose').model('Form');

    User.findOne({ 'party': party }).exec(function (err, user) {

        Form.find({'user': user._id}).stream().on('data', function(doc){

            doc.url = require('kw').url.getUrlByPathInfo('cms/user/item-list.index', {formId: doc._id});
            this_.categoryList.push(doc);

        }).on('error', callback).on('close', callback);

        /*Form.find({ 'user': user._id }).exec(function (err, forms) {
         this_.categoryList = forms;
         callback(err);
         });*/

    });

};

module.exports = Model;