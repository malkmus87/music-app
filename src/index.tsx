import * as ReactDOM from 'react-dom';
import * as React from 'react';
const lastFMrequestHandler = require( './resources/lastfm');


lastFMrequestHandler.getByParameters(``,{ method:'artist.getinfo', artist:'Cher' } );

function Index(){
    return(<div>TestAre</div>)
}

ReactDOM.render(<Index/>,document.getElementById('root'));