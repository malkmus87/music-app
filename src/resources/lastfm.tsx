const lastFMrequestHandler = (JsonRequest:any) => JsonRequest({
    mainPath:'https://ws.audioscrobbler.com/2.0',
    params:{
        api_key:'b67605f66477999b651bbcc6ec08c0e2',
        format:'json'     
    }
});

module.exports = lastFMrequestHandler( require('../helpers/JsonRequestHandler.js' ) );