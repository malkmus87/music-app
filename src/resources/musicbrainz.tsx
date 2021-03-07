
function setupMusicBrainzRequest(){
    let JsonRequestHandler:Function = require('../helpers/JsonRequestHandler.js');
    let request = JsonRequestHandler({
        mainPath:'https://musicbrainz.org/ws/2',
        params:{ fmt:'json' },
        mode:'no-cors'
    });
    return ({
        ...request,
        searchArtist: ( artist : string ) => request.get('artist',{ query:artist }),
        getArtistByID: ( id:string ) => request.get(`artist/${id}`),
        getAlbumsForArtist: (artistID : string) => request.get('release-group',{ artist:artistID,limit:100,type:'album' }),

    });
};
export default setupMusicBrainzRequest();