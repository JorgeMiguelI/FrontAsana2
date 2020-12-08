import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';

export default class Barra extends Component {

    componentDidMount() {
        this.getProyectos();
        this.TraerEquipos();
        this.TraerUsuario();
        if (localStorage.getItem("Rol") != "D") {
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


                        let nombre = item.nombre;
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

    DetallesEquipo=(ruta)=>{
        this.props.history.push(ruta);
    }

    TraerEquipos = async () => {
        let equiposDiv=document.getElementById("EquiposDiv");
        let divE;
        let linkE;
        let ListaEquipos = [];
        let idEmpresa = localStorage.getItem("IdEmpresa");
        const resp = await axios.get("http://localhost:4000/GetEquiposByEmpresa/" + idEmpresa);
        const data = await resp.data;
        if (data.msg == "error") {
            //Error al traer los equipos
        } else {
            ListaEquipos = data;
            if(ListaEquipos.length!=0){
                ListaEquipos.map((item)=>{
                    if (item != null) {
                        divE = document.createElement("div");
                        divE.setAttribute("id", item._id);


                        let nombre = item.nombre;
                        let ruta = "/DetallesEquipo/" + item._id;
                        linkE = <a className="nav-link" onClick={()=>{
                            this.DetallesEquipo(ruta);
                        }}><div className="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                            {nombre}</a>
                        // console.log(linkP);
                        // divP.appendChild(linkP);

                        equiposDiv.appendChild(divE);
                        ReactDOM.render(linkE, divE);
                    }
                })
            }
        }
        //console.log(ListaEquipos);
    }

    TraerUsuario = async () => {
        let idUsuario = localStorage.getItem("ID");
        const resp = await axios.get("http://localhost:4000/GetColaborador/" + idUsuario);
        const data = await resp.data;
        if (data.msg == "error") {
            //no se pudo traer el usuario
        } else {

            let infoUser=data.usuario;
            if(document.getElementById("InfoUser").childNodes.length>1){
                document.getElementById("InfoUser").childNodes[1].remove();

            }   
            document.getElementById("InfoUser").appendChild(document.createTextNode(infoUser));

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
                            
                            <div className="sb-sidenav-menu-heading">Informes</div>
                            <div className="sb-sidenav-menu-heading">Equipos</div>
                            <div id="EquiposDiv">
                                <div></div>

                            </div>
                           
                            
                            <div className="sb-sidenav-menu-heading" id="LinkColaboradores1">Empresa</div>
                            <Link className="nav-link" to="/InvitarC" id="LinkColaboradores">
                                <div className="sb-nav-link-icon"><i class="fas fa-address-book"></i></div>
                                Invitar colaborador
                            </Link>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer" id="InfoUser">
                        <div className="small">Logged in as:</div>
                                     Start Bootstrap
                        </div>
                    </nav>
            </div>
        )
    }
}
