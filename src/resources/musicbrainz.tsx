const musicbrainz = (requestHandler:any) => {
    let request:any = requestHandler({
        mainPath: 'http://musicbrainz.org/ws/2' ,
        headers: {
            'User-Agent':'musicbrainz-records-app/1.0.0.0'
        } ,
        params:{ fmt:'json' }
    }); 
    return ({
        searchArtist: async (artistName:string) => {
            let response = await request.getByParameters('artist',{query:artistName});
            if( response.status === 200) return( await response.json() );
            else return ({artists:[]});
        }
    })
} 
module.exports = musicbrainz( require('../helpers/JsonRequestHandler') ); 