import React, { Component } from 'react'
import MisTareas from './MisTareas';

export default class Content extends Component {

    


    getComponent=()=>{
      //  alert(this.props.Component);
        switch (this.props.Component) {
            case 1:
                return <h1>Home</h1>;
                break;
        
            case 2:
                return <MisTareas/>
                break;
        }
    }

    

    render() {
        return (
            <div>
                {this.getComponent()}
            </div>
            
        )
    }
}
