import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import swal from 'sweetalert';
import axios from 'axios';
import { isElementOfType } from 'react-dom/test-utils';









export default class Topbar extends Component {


    state = {
        estado: "Visible"
    }

    componentDidMount() {
        this.TraerUsuario();
        this.TraerMisTareas();
    }

    TraerUsuario = async () => {
        let idUsuario = localStorage.getItem("ID");
        const resp = await axios.get("http://localhost:4000/GetColaborador/" + idUsuario);
        const data = await resp.data;
        if (data.msg == "error") {
            //no se pudo traer el usuario
        } else {

            localStorage.setItem("Rol", data.rol);
            if (data.rol == "C") {
                let menu = document.getElementsByClassName("menu-actividades");
                for (let op of menu) {
                    op.classList.add("d-none");
                }
            }
            let NombreUsuarioTag = document.getElementById("NombreUsuario");
            let CorreoUsuarioTag = document.getElementById("CorreoUsuario");
            if (NombreUsuarioTag.hasChildNodes()) {
                for (let node of NombreUsuarioTag.childNodes) {
                    node.remove();
                }
            }
            if (CorreoUsuarioTag.hasChildNodes()) {
                for (let node of CorreoUsuarioTag.childNodes) {
                    node.remove();
                }
            }

            NombreUsuarioTag.appendChild(document.createTextNode(data.nombre));
            CorreoUsuarioTag.appendChild(document.createTextNode(data.correo));

        }
    }








    getEstado() {
        return this.state.estado;
    }

    LogOut = () => {
        localStorage.clear();

    }

    TraerMisTareas = async () => {
        let idColaborador = localStorage.getItem("ID");
        const res = await axios.get("http://localhost:4000/GetMisTareas/" + idColaborador);
        const data = await res.data;
        if (data.msg == "Error") {
            alert("Error al querer traer las tareas");
        } else {
            if (data.length == 0) {

            } else {


                let retrasadas=0, AVencer = 0;
                let fecha_actual = new Date();

                data.map((item) => {
                    let fechaTarea = new Date(item.fecha_entrega);
                    let tiempo = fechaTarea.getTime() - fecha_actual.getTime();

                    let bander = item.estado == "A" ? true : false;
                    if (tiempo < -86400000 && bander) {
                        retrasadas++;
                    }
                    if (tiempo > 0 && tiempo < 259200000 && bander) {
                        AVencer++;
                    }

                });

                let notificacionRetrasadas = document.getElementById("NotidicacionR");
                let notificacionAVencer = document.getElementById("NotidicacionAV");

                if (notificacionRetrasadas.hasChildNodes()) {
                    for (let node of notificacionRetrasadas.childNodes) {
                        node.remove();
                    }
                }
                if (notificacionAVencer.hasChildNodes()) {
                    for (let node of notificacionAVencer.childNodes) {
                        node.remove();
                    }
                }

              //  console.log(retrasadas);
                let mensajeRetrasadas="Tienes "+retrasadas+" tareas retrasadas";
                let mensajeAvencer="Tienes "+AVencer+" tareas próximas a vencer";
                if(retrasadas!=0){
                    notificacionRetrasadas.appendChild(document.createTextNode(mensajeRetrasadas));
                }
                
                if(AVencer!=0){
                    notificacionAVencer.appendChild(document.createTextNode(mensajeAvencer));
                }
                

            }
        }
    }





    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/principal">Start Bootstrap</Link>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" ><i className="fas fa-bars"></i></button>

                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-plus-circle"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link className="dropdown-item menu-actividades" to="/NuevoProyecto">Nuevo Proyecto</Link>
                            <Link className="dropdown-item menu-actividades" to="/NuevoEquipo">Nuevo Equipo</Link>
                            <Link className="dropdown-item menu-actividades" to="/NuevaTarea">Nueva Tarea</Link>
                            <a className="dropdown-item" >Nuevo Mensaje</a>

                        </div>
                    </li>
                </ul> <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-bell"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link className="dropdown-item menu-actividades" to="/MisTareas" id="NotidicacionR"></Link>
                            <Link className="dropdown-item menu-actividades" to="/MisTareas" id="NotidicacionAV"></Link>



                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="userDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown1">
                            <a className="dropdown-item" id="NombreUsuario"></a>
                            <a className="dropdown-item" id="CorreoUsuario"></a>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/" onClick={this.LogOut}>Logout</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}
