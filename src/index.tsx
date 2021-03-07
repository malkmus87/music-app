import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {useState} from 'react';
import Wrapper from './components/Wrapper';
import SearchInput from './components/SearchInput/index';
import {MusicBrainzSearchResponse} from './customtypes/MusicBrainzSearchResponse';
const lastFMrequestHandler = require( './resources/lastfm');
const musicBrainzRequestHandler = require('./resources/musicbrainz');

// async function test(){
//     await lastFMrequestHandler.getByParameters(``,{ method:'artist.getinfo', artist:'Cher' } );
//     await musicBrainzRequestHandler.searchArtist('Nirvana');
// };
// test();
function Index(){
    const [artists,setArtists] = useState<Array<any>>([]);
    async function setResultList(key:string){
        let response:any = await musicBrainzRequestHandler.searchArtist(key);
        console.log(response);
        setArtists(response.artists);
        // if( response.status === 200) setArtists( (await response.json()).artists );  
    }
    return(
        <div>
            <Wrapper>
                <SearchInput onSubmit={setResultList}>
                {artists.slice(0,5).map((artist, index) => 
                <div key={index}>
                    {`${artist.name} , ${artist.disambiguation}`}
                </div>)}
                </SearchInput>
                
                <div>
                    <p>Test</p>
                    <label>Test</label>
                </div>             
            </Wrapper>
        </div>
    )
}

ReactDOM.render( <Index/> , document.getElementById('root') );