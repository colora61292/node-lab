var kw = require('kw');

var global = {
    messages: kw.application.makeMessages(),
    config: kw.application.config(),
    env: kw.application.env()
};

module.exports = global;