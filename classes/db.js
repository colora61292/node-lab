var mongoose = require( 'mongoose' ) || '';
var config = require( '../classes/config' ) || '';

module.exports = {
    init: function(){

        var schema   = mongoose.Schema;

        var user = new schema({
            user_id    : String,
            login    : String,
            password : String,
            name : String,
            update_date : Date
        });

        mongoose.model('user', user);

        var div = new schema({
            name    : String,
            owner : String,
            html : String
        });

        mongoose.model('div', div);

        mongoose.connect( config.database.connection_string )

    }
};