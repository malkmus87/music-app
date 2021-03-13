import lastFMrequest from '../../resources/lastfm';

interface EffectProps{
    setAlbums:Function;
    musicbrainzID:string;
}
function fetchArtistEffect({setAlbums,musicbrainzID}: EffectProps){
    async function fetchArtistData(){
        let response = await lastFMrequest.getTopAlbumsForMbArtist(musicbrainzID);
        
        if(response.status === 200) setAlbums( (await response.json()).topalbums.album);
        else setAlbums([]);
    }
    fetchArtistData();
}
const validateArtistData:Function = () =>{
    
}

export default fetchArtistEffect;