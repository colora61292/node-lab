//http://docs.mongodb.org/manual/reference/sql-comparison/
//http://dreamerslab.com/blog/tw/write-a-todo-list-with-express-and-mongodb/
//http://redis.io/commands
/**
 * Module dependencies.
 */

var config = require( './classes/config' );
var db = require( './classes/db' ) || '';

var express = require('express') || '';
var http = require('http') || '';
var path = require('path') || '';
var fs = require('fs');
//var flash = require('connect-flash');
var app = express();

var redis = require("redis"),
    redisClient = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});
var RedisStore = require('connect-redis')(express);

var kue = require('kue');

kue.redis.createClient = function() {
    var client = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});
    //client.auth('password');
    return client;
};

var jobs = kue.createQueue();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('12345678'));
/*app.use(express.session({ store: new RedisStore({
    client: redisClient
}), secret: 'keyboard cat' }))*/
app.use(express.session({ cookie: { maxAge: 60000 }}));
//app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    redisClient.FLUSHDB();
    app.use(express.errorHandler());
}

//functions
var makeController = function(Controller, action){
	return function(req, res){
		var controller = new Controller(req, res);
		controller.beforeAction();
		controller.actions[action].handle.apply(controller,[controller]);
		controller.afterAction();
		controller = null;
	};
}

//init db, controllers
db.init();
//global.urls = [];
fs.readdirSync('./controllers/').forEach(function(name){

    name = name.replace('.js','');
    //global.urls[name] = [];
    var Controller = require( './controllers/'+name );
    Controller.prototype.Model = require( './models/'+name );
    Controller.prototype.name = name;
    Controller.prototype.cacheClient = redisClient;
    for(var action in Controller.prototype.actions){
	    if (Controller.prototype.actions.hasOwnProperty(action)) {
			var page = Controller.prototype.actions[action];
			if(typeof page.method != 'undefined' &&
			   typeof page.handle != 'undefined'
				){
                for(var url in config.route){
                    if (config.route.hasOwnProperty(url)) {
                        if(config.route[url] == name+'.'+action){
                            app[page.method](url, makeController(Controller, action));
                        }
                    }
                }
				//global.urls[name][action] = page.url;
				/*for(var key in page.url){
					if (page.url.hasOwnProperty(key)) {
						app[page.method](page.url[key], makeController(Controller, action));
					}
				}*/
			}
		}
    }

});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});