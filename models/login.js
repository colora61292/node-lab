var mongoose = require( 'mongoose' ) || '';

module.exports = {
    init: function(connectionString){

        var Schema = mongoose.Schema;

        var User = new Schema({
            login : String,
            password : String,
            party : String
        });

        mongoose.model('User', User);

        var Form = new Schema({
            name : String,
            party : String,
            prototype : Schema.Types.Mixed,
            elements : [Schema.Types.Mixed]
        });
        mongoose.model('Form', Form);

        mongoose.connect( connectionString )

    }
};