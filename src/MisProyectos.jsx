import React, { Component } from 'react';

import Barra from './bar';
import Topbar from './topbar';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default class MisTareas extends Component {

    componentDidMount() {
        console.clear();
        // console.log(this.props);
        this.TraerMisTareas();

    }

    






    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra />



                    <div id="layoutSidenav_content">
                        <div className="containerT" >
                            <div className="row" style={{ "padding": "1rem" }}>

                                <div className="col-sm-6"><Link to="/NuevaTarea"><button type="button" className="btn btn-primary"><i className="fas fa-plus"></i>Agregar Proyecto</button></Link> </div>

                            </div>
                            <div className="row" style={{ "padding": "1rem" }}>
                                <div className="col-md-7">
                                    <div className="accordion" id="accordionExample" style={{ width: "80%" }}>



                                    </div>
                                </div>
                                <div className="col-md-5" id="DetallesTarea">

                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
