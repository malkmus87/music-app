const JsonRequest = require('../helpers/JsonRequestHandler.js');

function setupLastFMrequest(){
    const lastFMrequest = JsonRequest({
        mainPath:'https://ws.audioscrobbler.com/2.0',
        params:{
            api_key:'b67605f66477999b651bbcc6ec08c0e2',
            format:'json'     
        },
        mode:'no-cors'
    });
    return ({
        ...lastFMrequest,
        searchArtist:( artist:string ) => lastFMrequest.get('',{ method:'artist.getinfo', artist:artist }),
        getTopAlbumsForMbArtist: (musicbrainzID:string) => lastFMrequest.get('',{method:'artist.gettopalbums',mbid:musicbrainzID,limit:100})
    });
}
export default setupLastFMrequest();
