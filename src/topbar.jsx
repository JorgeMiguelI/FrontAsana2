import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Topbar extends Component {


    state={
        estado:"Visible"
    }

    getEstado(){
        return this.state.estado;
    }





    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/principal">Start Bootstrap</Link>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" ><i className="fas fa-bars"></i></button>

                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..."  />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus-circle"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to="/NuevoProyecto">Nuevo Proyecto</Link>
                            <Link className="dropdown-item" to="/NuevoEquipo">Nuevo Equipo</Link>
                            <Link className="dropdown-item" to="/NuevaTarea">Nueva Tarea</Link>
                            <a className="dropdown-item" >Nuevo Mensaje</a>
                            
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown1">
                            <a className="dropdown-item">Settings</a>
                            <a className="dropdown-item" >Activity Log</a>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/">Logout</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}
