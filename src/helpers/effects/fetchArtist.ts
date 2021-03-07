import lastFMrequest from '../../resources/lastfm';

interface EffectProps{
    setAlbums:Function;
    musicbrainzID:string;
}
function fetchArtistEffect({setAlbums,musicbrainzID}: EffectProps){
    async function fetchArtistData(){
        let response = await lastFMrequest.getTopAlbumsForMbArtist(musicbrainzID);
        if(response.topalbums !== undefined) setAlbums( response.topalbums.album);
        else setAlbums([]);
    }
    fetchArtistData();
}
const validateArtistData:Function = () =>{
    
}

export default fetchArtistEffect;