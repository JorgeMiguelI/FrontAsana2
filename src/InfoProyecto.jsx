import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';







export default class InfoProyecto extends Component {

    InfoProyectoData;
    componentDidMount(){
        if(this.props.info!=""){
            this.InfoProyectoData=JSON.parse(this.props.info);
            document.getElementById("inputNombre").setAttribute("value",this.InfoProyectoData.InfoProyecto.nombre);
            document.getElementById("inputLider").setAttribute("value",this.InfoProyectoData.InfoLider.nombre);
            if(document.getElementById("inputDescripcion").hasChildNodes()){
                for(let node of document.getElementById("inputDescripcion").childNodes){
                    node.remove();
                }
            }
            document.getElementById("inputDescripcion").appendChild(document.createTextNode(this.InfoProyectoData.InfoProyecto.descripcion));
        }
    }
    Cerrar=()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById("DetallesTarea"));
    }

    render() {
        return (
            <div className="card shadow-lg border-0 rounded-lg mt-5" >
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Detalles de proyecto</h3><button className="btn btn-ligth" onClick={this.Cerrar}>Cerrar</button><button className="btn btn-danger" id="BtnEliminarTarea" >Eliminar</button></div>
                <div className="card-body">


                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="" name="nombreT" />


                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputLider">Lider:    </label>
                                <input className="form-control py-4" id="inputLider" type="text" placeholder="" name="nombreT" />


                            </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="col-md-12" >
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputEquipo">Equipo:    </label>
                                <input className="form-control py-4" id="inputEquipo" type="text" placeholder="" name="nombreT" />


                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="inputDescripcion">Descripción</label>
                                <textarea className="form-control py-4" id="inputDescripcion">

                                </textarea>


                            </div>
                        </div>
                    </div>
                    

















                    <div className="form-group mt-4 mb-0">
                        {localStorage.getItem("Rol") != "C" ? <button className="btn btn-primary btn-block">Editar</button> : <div></div>}
                    </div>
                </div>
            </div >
        )
    }
}


