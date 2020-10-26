import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Barra from './bar';
import Topbar from './topbar';
import TareasProximas from './TareasProximas';







export default class Principal extends Component {



    constructor(props) {
        super(props);

    }

    state = {
        show: true,
        component: 1
    }



    GetClass = () => {
        return this.state.show ? "sb-sidenav accordion sb-sidenav-dark" : "sb-sidenav accordion sb-sidenav-dark d-none";
    }
    getComponent = () => {
        return this.state.component;
    }
    ChangeState = () => {
        var state = !this.state.show;
        this.setState({ show: state });
        //alert(this.GetClass());
    }

    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar/>

                <div id="layoutSidenav">

                    
                    <Barra estado={Topbar} />



                    <div id="layoutSidenav_content">
                        <TareasProximas/>
                    </div>

                </div>
            </div>
        )
    }
}


