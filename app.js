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

//load classes and configs
var env = require('./configs/env');
var config = require( './configs/'+env );
var db = require( './classes/database' );

//load express app
var app = express();

//load redis
var redis = require("redis");
var redisClient = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});

//load redis job Q
var kue = require('kue');
kue.redis.createClient = function() {
    var client = redis.createClient(config.cache.port,config.cache.host,{auth_pass:config.cache.password});
    //client.auth('password');
    return client;
};
var jobs = kue.createQueue();

//load redis session
var RedisStore = require('connect-redis')(express);

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

var readController = function(controllerRoot, relativeDir){
    var dir = controllerRoot + relativeDir;
    fs.readdirSync(dir).forEach(function(name){
        if (fs.statSync(dir+name).isDirectory()){
            readController(dir,name+'/');
        }else{
            name = name.replace('.js','');
            var Controller = require(dir+name);
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
                                if(config.route[url] == name+'.'+action){
                                    app[page.method](url, makeController(Controller, action));
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};

// all environments
app.set('env',env);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('12345678'));
app.use(express.session({ store: new RedisStore({
    client: redisClient
}), secret: 'keyboard cat' }))
//app.use(express.session({ cookie: { maxAge: 60000 }}));
//app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    redisClient.FLUSHDB();
    app.use(express.errorHandler());
}

//init db, controllers
db.init(config.database.connectionString);
readController('./controllers/','');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});