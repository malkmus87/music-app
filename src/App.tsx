import * as React from 'react';
import {FunctionComponent} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PageTop from './components/PageTop/index';
const App:FunctionComponent<any> = () => {
    return(
        <div>
            <PageTop
                
            />
            <Router>
            
            </Router>
        </div>
        
    )
}
export default App;