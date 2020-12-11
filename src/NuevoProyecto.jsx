import React, { Component } from 'react';
import axios from 'axios';



import Barra from './bar';
import Topbar from './topbar';
import $ from 'jquery';
window.$ = $;

export default class NuevoProyecto extends Component {




    componentDidMount() {
        this.ajax1();
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

        if (document.getElementById("selectE").value != "null") {
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
    }

    ajax3 = () => {
        console.log("--------Guardado--------");

        var formData = new FormData($("#Principal")[0]);
        formData.append("Operation", 3);

        $.ajax({
            context:this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/proyecto',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: async function (respuesta) {
                console.log(respuesta);

                if (respuesta != 4) {
                    if (localStorage.getItem("Rol") != "D") {
                        let idResponzable = document.getElementById("selectL").value;

                        const resp = await axios.get("http://localhost:4000/UpdateRol/" + idResponzable);
                        const data = await resp.data;
                        if (data.msg == "error") {
                            console.log("Error de actulizar rol");
                        } else {

                            console.log(data);
                            
                        }

                    }

                    this.props.history.push("/principal");

                }
                else {

                }
                //console.log(JSON.parse(respuesta));


            }
        });




    }


    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar history={this.props.history} />

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div id="cards" className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear proyecto</h3></div>
                            <div className="card-body">
                                <form id="Principal">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre del proyecto" name="nombre" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputDate">Fecha de Entrega</label>
                                                <input className="form-control py-4" id="inputDate" type="date" name="fecha" />
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
                                                    <option value="null">Seleccione...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="slectL">Lider de proyecto</label>
                                                <select name="liderP" id="selectL" className="form-control">
                                                    <option value="null">Seleccione...</option>
                                                </select>
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
                                <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={() => {
                                    this.ajax3();
                                }}>Crear Proyecto</button></div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
