import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';

export default class Barra extends Component {

    componentDidMount() {
        this.getProyectos();
        if(localStorage.getItem("Rol")!="D"){
            document.getElementById("LinkColaboradores").classList.add("d-none");
            document.getElementById("LinkColaboradores1").classList.add("d-none");
        }
    }
   

    Detallesproyecto = (ruta) => {
       // console.log(ruta);
        this.props.history.push(ruta);

    }
    getProyectos = async () => {

        let proyectosDiv = document.getElementById("ProyectosDiv");
        let divP;
        let linkP;
        let myId = localStorage.getItem("ID");
        let proyectos = [];

        const resp = await axios.get("http://localhost:4000/GetEquipoColaborador/" + myId);
        let data = resp.data;
        //console.log(data);
        if (data.msg == "error") {
            //no se pudo traer tus proyectos
        } else {
            proyectos = data;
            if (proyectos.length != 0) {
                // console.log(proyectos);

                proyectos.map((item) => {
                    if (item != null) {
                        divP = document.createElement("div");
                        divP.setAttribute("id", item._id);


                        let nombre =  item.nombre;
                        let ruta = "/Detallesproyecto/" + item._id;
                        linkP = <a className="nav-link" onClick={() => { this.Detallesproyecto(ruta) }}><div className="sb-nav-link-icon"><font color={item.color}><i className="fas fa-archive"></i></font></div>
                            {nombre}</a>
                        // console.log(linkP);
                        // divP.appendChild(linkP);

                        proyectosDiv.appendChild(divP);
                        ReactDOM.render(linkP, divP);
                    }

                });



            }
            //console.log(proyectos)
        }







    }







    render() {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Principal</div>
                            <Link className="nav-link" to="/principal">
                                <div className="sb-nav-link-icon"><i className="fas fa-home"></i></div>
                                Home
                            </Link>
                            <Link className="nav-link" to="/MisTareas">
                                <div className="sb-nav-link-icon"><i className="far fa-check-circle"></i></div>
                                Mis Tareas
                            </Link>




                            <div className="sb-sidenav-menu-heading">Proyectos</div>
                            <div id="ProyectosDiv">
                                <div></div>

                            </div>

                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                    <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Pages
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Authentication
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="login.html">Login</a>
                                            <a className="nav-link" href="register.html">Register</a>
                                            <a className="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Error
                                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="401.html">401 Page</a>
                                            <a className="nav-link" href="404.html">404 Page</a>
                                            <a className="nav-link" href="500.html">500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                            <div className="sb-sidenav-menu-heading">Informes</div>
                            <div className="sb-sidenav-menu-heading">Equipos</div>
                            <a className="nav-link" href="charts.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                            <Link className="nav-link" to="/Bar">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </Link>
                            <div className="sb-sidenav-menu-heading" id="LinkColaboradores1">Empresa</div>
                            <Link className="nav-link" to="/InvitarC" id="LinkColaboradores">
                                <div className="sb-nav-link-icon"><i class="fas fa-address-book"></i></div>
                                Invitar colaborador
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                                     Start Bootstrap
                                </div>
                </nav>
            </div>
        )
    }
}
