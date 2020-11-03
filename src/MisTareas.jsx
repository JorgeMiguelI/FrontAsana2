import React, { Component } from 'react'
import TareasProximas from './TareasProximas'
import TareasRecientes from './TareasRecientes'
import Barra from './bar'
import Topbar from './topbar'
import { Link } from 'react-router-dom'

export default class MisTareas extends Component {
    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra />



                    <div id="layoutSidenav_content">
                        <div className="container" style={{ marginTop: ".5" }}>
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-8"><Link to="/NuevaTarea"><button type="button" className="btn btn-primary"><i className="fas fa-plus"></i>Agregar Tarea</button></Link> </div>

                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="accordion" id="accordionExample" style={{ width: "80%" }}>
                                        <TareasRecientes />
                                        <TareasProximas />

                                    </div>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
