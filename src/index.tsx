import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {useState,useEffect} from 'react';
import musicbrainzResource from './resources/musicbrainz';
import App from './App';
import ArtistOverview from './components/ArtistOverview';
import fetchArtistEffect from './helpers/effects/fetchArtist';

function Index(){
    const [musicbrainzID,setMusicbrainzID] = useState(null);
    async function loadArtist(){
        let response=await musicbrainzResource.searchArtist('Radiohead');
        let body = await response.json();
        setMusicbrainzID(body.artists[0].id);
    }
    useEffect(() => {
        loadArtist();
    },[]);
    return(
    // <div>TestAre
    //     {musicbrainzID !== null ? 
    //         <ArtistOverview musicbrainzID={musicbrainzID} effect={fetchArtistEffect}/>:null
    //     }
    //     </div>
        <App/>
    )
}

ReactDOM.render( <Index/> , document.getElementById('root') );