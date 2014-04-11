module.exports = {
    /**
     *
     * @param controller
     * @param action
     * @param [params]
     * @returns {String}
     */
    getPathInfo : function(controller, action, params){
        var url = global.urls[controller][action][0];
        for(var param in params){
            var pattern = new RegExp(':'+param,'gi');
            url = url.replace(pattern,params[param]);
        }
        return url;
    },
    /**
     *
     * @param controller
     * @param action
     * @param [params]
     * @returns {Array}
     */
    getAllPathInfo : function(controller, action, params){
        var urls = global.urls[controller][action];
        for(var param in params){
            var pattern = new RegExp(':'+param,'gi');
            for(var url in urls){
                urls[url] = urls[url].replace(pattern,params[param]);
            }
        }
        return urls;
    }
};
