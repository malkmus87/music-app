import * as React from 'react';
import {FunctionComponent,useEffect,useState} from 'react';

interface PropsType{
    musicbrainzID:string;
    effect:Function;
}

const ArtistOverview:FunctionComponent<PropsType> = ({musicbrainzID,effect}) => {
    const [albums,setAlbums] = useState<Array<any>>([]);
    useEffect(
        () => effect({musicbrainzID,setAlbums}),
        [musicbrainzID]
    );
    return (
        <div>
            {albums.map( (album:any, index:number) => 
                <div key={index}>
                    <img src={album.image[2]['#text']}></img>
                </div>
            )}
        </div>
    );
}
export default ArtistOverview;
