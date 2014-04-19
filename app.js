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
var RedisStore = require('connect-redis')(express);
var app = express();

/**
 * kw init
 */
kw.application.initApp(app);
global.env = kw.application.env();
global.config = kw.application.config();
global.redisClient = kw.application.makeRedisClient();
global.messages = kw.application.makeMessages();

//load express app
//load classes and configs
//var env = kw.env;
//var config = kw.config;

//load redis
//var redis = require("redis");
//var redisClient = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});
//var redisClient = kw.application.makeRedisClient();

//load redis job Q
//var kue = require('kue');
//kue.redis.createClient = function() {
//    var client = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});
//    //client.auth('password');
//    return client;
//};
//var jobs = kue.createQueue();

//load redis session

//functions
/*var makeController = function(Controller, action){
    return function(req, res){
        var controller = new Controller(req, res);
        controller.beforeAction();
        controller.actions[action].handle.apply(controller,[controller]);
        controller.afterAction();
        controller = null;
    };
};

var readController = function(controllerRoot, relativeDir){
    var dir = controllerRoot + relativeDir;
    fs.readdirSync(dir).forEach(function(name){
        if (fs.statSync(dir+name).isDirectory()){
            readController(dir,name+'/');
        }else{
            name = name.replace('.js','');
            var Controller = require(dir+name);
            console.log(dir+name);
            Controller.prototype.Model = require(dir.replace('controllers','models')+name);
            Controller.prototype.pathInfo = relativeDir+name;
            Controller.prototype.cacheClient = redisClient;
            for(var action in Controller.prototype.actions){
                if (Controller.prototype.actions.hasOwnProperty(action)) {
                    var page = Controller.prototype.actions[action];
                    if(typeof page.method != 'undefined' &&
                        typeof page.handle != 'undefined'
                        ){
                        for(var url in config.route){
                            if (config.route.hasOwnProperty(url)) {
                                if(config.route[url] == dir+name+'.'+action){
                                    app[page.method](url, makeController(Controller, action));
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};*/

// all environments
app.set('port', process.env.PORT || 30000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('12345678'));
app.use(express.session({ store: new RedisStore({
    client: kw.application.makeRedisClient()
}), secret: 'keyboard cat' }))
//app.use(express.session({ cookie: { maxAge: 60000 }}));
//app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == env) {
    redisClient.FLUSHDB();
    app.use(express.errorHandler());
}


//init db, controllers, config, messages, server
//readController('controllers/','');
//global.__base = __dirname;
//global.config = config;
//global.messages = {};
//
//fs.readdirSync(__dirname+'messages/').forEach(function(name){
//    global.messages[name] = require(__dirname+'messages/'+name);
//});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});