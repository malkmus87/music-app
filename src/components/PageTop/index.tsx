import * as React from 'react';
import {FunctionComponent,useState} from 'react';
import SearchInput from '../SearchInput/index';
import musicbrainzResource from '../../resources/musicbrainz';

const PageTop:FunctionComponent = () => {
    const [artists,setArtists] = useState([]);
    async function loadArtists(){
            let response=await musicbrainzResource.searchArtist('Radiohead');
            let body = await response.json();
            // setMusicbrainzID(body.artists[0].id);
        
    }
    return(
        <div>
            <SearchInput>
            </SearchInput>
        </div>
    )
} 

export default PageTop; 