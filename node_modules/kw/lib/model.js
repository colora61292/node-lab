var Model = function(model){
    if(model){
        for(var key in model){
            this[key] = model[key];
        }
    }
};

Model.prototype.title = '';

module.exports = Model;
