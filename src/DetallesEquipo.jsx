import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';
import Proyecto from './Proyecto';
import Miembro from './Miembro';




export default class DetallesEquipo extends Component {

    idEquipo;
    componentDidMount() {
        if (document.getElementById("Proyectos").hasChildNodes()) {
            for (let node of document.getElementById("Proyectos").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();
            }
        }

        if (document.getElementById("MiembrosDiv").hasChildNodes()) {
            for (let node of document.getElementById("MiembrosDiv").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();
            }
        }
        let undefined = void (0);
        if (this.props.match.params.id != undefined) {
            this.idEquipo = this.props.match.params.id;
            this.TraerInfoEquipo();
            this.TraerProyectosDeEquipo();
            this.TraerMiembrosDeEquipo();
        }
    }

    componentDidUpdate() {

        if (document.getElementById("Proyectos").hasChildNodes()) {
            for (let node of document.getElementById("Proyectos").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();
            }
        }

        if (document.getElementById("MiembrosDiv").hasChildNodes()) {
            for (let node of document.getElementById("MiembrosDiv").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();
            }
        }

        let undefined = void (0);
        if (this.props.match.params.id != undefined) {
            this.idEquipo = this.props.match.params.id;
            this.TraerInfoEquipo();
            this.TraerProyectosDeEquipo();
            this.TraerMiembrosDeEquipo();
        }






    }


    EditarEquipo = () => {
        this.props.history.push("/EditarEquipo/" + this.idEquipo);
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
            document.getElementById("NombreEquipo").setAttribute("value", Equipo.nombre);
            if (document.getElementById("inputDescripcion").hasChildNodes()) {
                for (let node of document.getElementById("inputDescripcion").childNodes) {
                    node.remove();
                }
            }
            if (Equipo.descripcion != void (0)) {

                document.getElementById("inputDescripcion").appendChild(document.createTextNode(Equipo.descripcion));
            }

        }

        // console.log(Equipo)
    }



    TraerProyectosDeEquipo = async () => {


        if (document.getElementById("Proyectos").hasChildNodes()) {
            for (let node of document.getElementById("Proyectos").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();

            }
        }


        let IdEquipo = this.idEquipo;
        let proyectos = new Array();
        const res = await axios.get("http://localhost:4000/GetProyectosByTeam/" + IdEquipo);
        const data = await res.data;
        if (data.msg == "error") {
            alert("Error al traer los equipos");
        } else {
            proyectos = data;
            let divContenedor;
            let divProyectos = document.getElementById("Proyectos");
            let proyectoObj;
            proyectos.map((proyecto) => {
                divContenedor = document.createElement("div");
                divContenedor.className = "ProyectoE";
                divContenedor.setAttribute("id", proyecto._id);

                divProyectos.appendChild(divContenedor);

                proyectoObj = <Proyecto Info={proyecto} history={this.props.history} />

                ReactDOM.render(proyectoObj, divContenedor);



            });

        }


        //console.log(data);
    }

    TraerMiembrosDeEquipo = async () => {

        // console.log(document.getElementById("MiembrosDiv"));

        if (document.getElementById("MiembrosDiv").hasChildNodes()) {
            for (let node of document.getElementById("MiembrosDiv").childNodes) {
                ReactDOM.unmountComponentAtNode(node);
                node.remove();

            }
        }



        let idEquipo = this.idEquipo;
        const res = await axios.get("http://localhost:4000/GetMiembrosByTeam/" + idEquipo);
        const data = await res.data;

        if (data.msg == "error") {
            alert("No se pudieron traer los miembros");
        } else {
            let miembrosDiv = document.getElementById("MiembrosDiv");
            let contenedor;
            let miembroObj;
            data.map((miembro) => {
                contenedor = document.createElement("div");
                contenedor.setAttribute("id", miembro._id);

                miembrosDiv.appendChild(contenedor);
                miembroObj = <Miembro Info={miembro} history={this.props.history} />
                ReactDOM.render(miembroObj, contenedor);
            })
        }

    }

    EliminarProyecto=async()=>{
        let idEquipo= this.idEquipo
        let ListaProyectosEliminar=[];
        //traemos los proyectos a eliminar asociados a ese equipo
        const res= await axios.get("http://localhost:4000/GetProyectosByTeam/"+idEquipo);
        const data= await res.data;
        if(data.msg=="error"){
            alert("No se pudo eliminar el equipo");
        }else{
            //Borramos los proyectos asignados al equipo con sus respectivas Tareas;
            ListaProyectosEliminar = data;
            for(let project of ListaProyectosEliminar){
                //console.log(team);
                let idProyecto= project._id;
                const resp= await axios.delete("http://localhost:4000/DeleteProyecto/"+idProyecto);
            }
            //Ahora eliminamos el Equipo
            const resp= await axios.delete("http://localhost:4000/DeleteEquipo/"+ idEquipo);
            const result= resp.data;
            if(result.msg=="error"){
                alert("Error al eliminar el Equipo")
            }else if (result.msg=="Ok"){
                this.props.history.push("/principal");
            }
    
        }
    }

    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar history={this.props.history}/>

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
                                    <button className="btn btn-danger" onClick={this.EliminarProyecto}>Eliminar</button>

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

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <h3><label htmlFor="" className="small mb-1">Miembros</label></h3>
                                    <div id="MiembrosDiv">

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


