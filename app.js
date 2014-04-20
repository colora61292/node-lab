//http://docs.mongodb.org/manual/reference/sql-comparison/
//http://dreamerslab.com/blog/tw/write-a-todo-list-with-express-and-mongodb/
//http://redis.io/commands
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var kw = require('kw');
//var RedisStore = require('connect-redis')(express);
var app = express();

// all environments
app.set('port', process.env.PORT || 30000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "This is a secret"}));
//app.use(express.cookieParser('12345678'));
/*app.use(express.session({ store: new RedisStore({
 client: redisClient
 }), secret: 'keyboard cat' }))*/
//app.use(express.session({ cookie: { maxAge: 60000 }}));
//app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == require('classes/global').env) {
    require('classes/redis-client').FLUSHDB();
    app.use(express.errorHandler());
}

/**
 * kw init
 */
kw.application.initApp(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});