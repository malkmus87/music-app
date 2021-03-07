import * as React from 'react';
class Wrapper extends React.Component{
    constructor(props:any){
        super(props);
    }
    componentDidCatch(){

    }
    render(){
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
export default Wrapper;
