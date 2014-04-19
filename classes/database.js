var mongoose = require('mongoose');

module.exports = {
    init: function(connectionString){

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
            name : String,
            party : String,
            prototype : Schema.Types.Mixed,
            elements : [Schema.Types.Mixed]
        });*/

        mongoose.model('Form', new Schema({
            name : String,
            party : String,
            prototype : Schema.Types.Mixed,
            elements : [Schema.Types.Mixed]
        }));

        mongoose.connect(connectionString);

    }
};