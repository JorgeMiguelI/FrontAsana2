import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import ReactDOM from 'react-dom';



import Barra from './bar';
import Topbar from './topbar';
import $ from 'jquery';
window.$ = $;

export default class NuevoProyecto extends Component {


    infoProyectoData;


    componentDidMount() {
        this.ajax1();
        if (localStorage.getItem("InfoP") != "") {
            this.infoProyectoData = JSON.parse(localStorage.getItem("InfoP"));
            document.getElementById("inputNombre").setAttribute("value", this.infoProyectoData.InfoProyecto.nombre);
            document.getElementById("inputDescripcion").appendChild(document.createTextNode(this.infoProyectoData.InfoProyecto.descripcion))
            document.getElementById("inputColor").setAttribute("value", this.infoProyectoData.InfoProyecto.color);

            if (document.getElementById("ProyectoL").hasChildNodes()) {
                for (let node of document.getElementById("ProyectoL").childNodes) {
                    node.remove();
                }
            }
            document.getElementById("ProyectoL").appendChild(document.createTextNode("Anteriror: " + this.infoProyectoData.InfoLider.nombre));
            if (document.getElementById("ProyectoE").hasChildNodes()) {
                for (let node of document.getElementById("ProyectoE").childNodes) {
                    node.remove();
                }
            }
            document.getElementById("ProyectoE").appendChild(document.createTextNode("Anteriror: " + this.infoProyectoData.InfoEquipo.nombre));



        }



    }


    llenarSelect2 = (respuesta) => {


        var select = document.getElementById("selectL");

        if (select.hasChildNodes()) {
            var i;
            for (i = 0; i < select.childElementCount; i++) {

                select.removeChild(select.childNodes[i]);
            }

        }

        var option;
        console.clear();
        console.log(respuesta);
        //var respuesta1=JSON.parse(respuesta);
        respuesta.map((item) => {
            option = document.createElement("option");
            option.setAttribute("value", item._id);
            option.appendChild(document.createTextNode(item.nombre));
            select.appendChild(option);

        });
        option = document.createElement("option");
        option.appendChild(document.createTextNode("Seleccione..."));
        option.setAttribute("value", 0);
        select.appendChild(option);

        select.value=0;

    }

    llenarSelect = (respuesta) => {
        var select = document.getElementById("selectE");
        var option;
        console.log(respuesta);
        //var respuesta1=JSON.parse(respuesta);
        respuesta.map((item) => {
            option = document.createElement("option");
            option.setAttribute("value", item._id);
            option.appendChild(document.createTextNode(item.nombre));
            select.appendChild(option);
        });
        option = document.createElement("option");
        option.appendChild(document.createTextNode("Seleccione..."));
        option.setAttribute("value", 0);
        select.appendChild(option);

        select.value=0;
        if (respuesta.length == 1) {
            this.ajax2();
        }

    }






    ajax1 = () => {







        var formData = new FormData();



        formData.append("IdEmpresa", localStorage.getItem("IdEmpresa"));
        formData.append("Operation", 1);

        $.ajax({
            context: this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/proyecto',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                this.llenarSelect(respuesta);


            }
        });


    }

    ajax2 = () => {
        var formData = new FormData();



        formData.append("IdEquipo", document.getElementById("selectE").value);
        formData.append("Operation", 2);

        $.ajax({
            context: this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/proyecto',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                this.llenarSelect2(respuesta);


            }
        });

    }


    Guardar = async () => {
        let info;
        if (document.getElementById("selectE").value == 0 || document.getElementById("selectL").value == 0) {
            info = {
                id: this.infoProyectoData.InfoProyecto._id,
                nombre: document.getElementById("inputNombre").value,
                descripcion: document.getElementById("inputDescripcion").value,
                color: document.getElementById("inputColor").value
            };
        } else {
            info = {
                id: this.infoProyectoData.InfoProyecto._id,
                lider: document.getElementById("selectL").value,
                equipo: document.getElementById("selectE").value,
                nombre: document.getElementById("inputNombre").value,
                descripcion: document.getElementById("inputDescripcion").value,
                color: document.getElementById("inputColor").value
            };
        }

        const res = await axios.put("http://localhost:4000/UpdateProyecto", {
            data: info
        });
        const result = await res.data;
        if (result.msg == "error") {
            //No se pudo actualizar
        } else {
            localStorage.removeItem("InfoP");
            this.props.history.push("/principal");
        }
    }

    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div id="cards" className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Editar proyecto</h3></div>
                            <div className="card-body">
                                <form id="Principal">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre del proyecto" name="nombre" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="slectE">Equipo</label>
                                                <select name="equipoP" id="selectE" className="form-control" onChange={() => {
                                                    this.ajax2();
                                                }}>
                                                    
                                                </select>
                                                <span className="blockquote-footer" id="ProyectoE"></span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="slectL">Lider de proyecto</label>
                                                <select name="liderP" id="selectL" className="form-control">
                                                    
                                                </select>
                                                <span className="blockquote-footer" id="ProyectoL"></span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form-row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputDescripcion">Descripción</label>
                                                <textarea className="form-control py-3" id="inputDescripcion" placeholder="Describa el proyecto" name="descripcion"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputColor">Color</label>
                                                <input className="form-control py-2" id="inputColor" type="color" name="color" />
                                            </div>
                                        </div>

                                    </div>



                                </form>
                                <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={this.Guardar}>Guardar</button></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
