import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';




export default class DetallesEquipo extends Component {

    idEquipo;
    componentDidMount() {
        let undefined = void (0);
        if (this.props.match.params.id != undefined) {
            this.idEquipo = this.props.match.params.id;
            this.TraerInfoEquipo();
        }
    }

    componentDidUpdate(){
        let undefined = void (0);
        if (this.props.match.params.id != undefined) {
            this.idEquipo = this.props.match.params.id;
            this.TraerInfoEquipo();
        }
    }


    EditarEquipo=()=>{
        this.props.history.push("/EditarEquipo/"+this.idEquipo);
    }

    TraerInfoEquipo = async () => {
        let idEquipo = this.idEquipo;
        let Equipo;
        const resp = await axios.get("http://localhost:4000/GetEquipoById/" + idEquipo);
        const result = await resp.data;
        if (result.msg == "error") {
            //No se pudo traer el equipos
        } else {
            Equipo = result;
            document.getElementById("NombreEquipo").setAttribute("value",Equipo.nombre);
            if(document.getElementById("inputDescripcion").hasChildNodes()){
                for(let node of document.getElementById("inputDescripcion").childNodes){
                    node.remove();
                }
            }
            if(Equipo.descripcion!=void(0)){
                
                document.getElementById("inputDescripcion").appendChild(document.createTextNode(Equipo.descripcion));
            }

        }
        console.log(Equipo)
    }

    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">




                        <div className="container">
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-users"></i></span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="NombreEquipo" aria-describedby="basic-addon1" id="NombreEquipo" readOnly />
                                    <button className="btn btn-primary" onClick={this.EditarEquipo}>Editar</button>
                                    <button className="btn btn-danger" >Eliminar</button>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <h3>
                                        <label htmlFor="InputDescripcion" className="small mb-1">Descripción</label></h3>
                                    <textarea id="inputDescripcion" className="form-control py-4"></textarea>
                                </div>
                                <div className="col-9">
                                    <h3> <label htmlFor="InputDescripcion" className="small mb-1">Proyectos</label></h3>
                                    <div id="Proyectos" className="d-flex">
                                        <div className="ProyectoE"><h6> <font color="red"><i className="fas fa-archive"></i></font><br />proyecto</h6></div>
                                        <div className="ProyectoE"><h6> <font color="red"><i className="fas fa-archive"></i></font><br />proyecto</h6></div>
                                        <div className="ProyectoE"><h6> <font color="red"><i className="fas fa-archive"></i></font><br />proyecto</h6></div>
                                        <div className="ProyectoE"><h6> <font color="red"><i className="fas fa-archive"></i></font><br />proyecto</h6></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <h3><label htmlFor="" className="small mb-1">Miembros</label></h3>
                                    <div id="MiembrosDiv">
                                        <div>
                                            <a >Edgar Roberto Sotelo Arceo</a>
                                            <small id="emailHelp" class="form-text text-muted">al221220@edu.uaa.mx</small>
                                        </div>
                                        <div>
                                            <a >Edgar Roberto Sotelo Arceo</a>
                                            <small id="emailHelp" class="form-text text-muted">al221220@edu.uaa.mx</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


