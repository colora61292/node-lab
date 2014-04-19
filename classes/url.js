var config = global.config;

var Url = function(){
};

Url.prototype.getUrlByPathInfo = function(pathInfo){
    for(var url in config.route){
        if(pathInfo == config.route[url]){
            return url;
        }
    }
    return '';
};

module.exports = Url;
