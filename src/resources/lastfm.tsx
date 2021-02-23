const JsonRequest = require('../helpers/JsonRequestHandler.js');
const lastFMrequestHandler = JsonRequest({
    mainPath:'https://ws.audioscrobbler.com/2.0',
    params:{
        api_key:'b67605f66477999b651bbcc6ec08c0e2',
        format:'json'     
    }
});

module.exports = lastFMrequestHandler;