import React, { Component } from 'react'
import Barra from './bar';
import Topbar from './topbar';
import $ from 'jquery';
window.$ = $;

export default class NuevoEquipo extends Component {

    miembros

    constructor() {
        super();

        this.miembros = new Array();
        
        this.miembros.push({
            Id:"255",
            rol:"M"
        });
        //console.log("Constructor NuevoEquipo");

    }
    componentDidMount() {
        this.ajax1();
    }




    viewMember = () => {
        console.clear();

       // console.log(this.miembros);
    }

    iniciarComponente = function (respuesta) {






    }

    ajax1 = () => {

        //traerá los miembros de la empresa
        console.clear();

        var formData = new FormData();
        formData.append("idE", localStorage.getItem("IdEmpresa"));
        formData.append("Operation", "1");
        var miembros = this.miembros;
        $.ajax({
            context: miembros,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/equipo',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                var addMember = (id, rol1) => {
                    let obj = {
                        Id: id,
                        rol: rol1
                    }
                    
                    let bandera=true;
                    for(let item of this){
                       // console.log(item);
                        if(item.Id==obj.Id){
                            
                            bandera=false;
                            break;
                        }


                    }


                   // console.log(bandera);
                    if (bandera) {
                        this.push(obj);
                       // console.log(this);
                        return false;
                    } else {
                        alert("Miembro ya en la lista");
                        return true;
                    }






                    return true;
                }

                var removeMember = (id) => {

                    console.clear();
                   //console.log(this);

                   // console.log(this.length);
                    var i;
                    for (i = 0; i < this.length; i++) {
                        //console.log(id + "==" + this[i].Id);
                        if (id == this[i].Id) {
                            this.splice(i, 1);
                        }
                    }


                }












                //console.log("Inciar Componentes");
               
                respuesta.map((item) => {
                  //  console.log("map");
                    //seleccionados
                    var bodyS = document.getElementById("bodyS");
                    var spanT;
                    var trS;
                    var tdN;
                    var tdB;
                    var buttonE;


                    //Todos
                    var tbodyME = document.getElementById("bodyT");
                    var trE = document.createElement("tr");
                    var tdNombre = document.createElement("td");
                    var tdCorreo = document.createElement("td");
                    var tdButton = document.createElement("td");
                    var button = document.createElement("button");

                    button.setAttribute("value", JSON.stringify(item));
                    button.className = "btn-primary btn-sm";
                    button.addEventListener("click", (e) => {
                      //  console.log(this);
                        var caller = e.target;
                        var data = JSON.parse(caller.value);
                        if (!addMember(data._id, data.rol)) {
                            //creamos elemento

                            trS = document.createElement("tr");

                            //Nombre
                            tdN = document.createElement("td");
                            spanT = document.createElement("span");
                            spanT.className = "form-control";
                            spanT = document.createTextNode(data.nombre);
                            tdN.appendChild(spanT);
                            trS.appendChild(tdN);

                            //boton Eliminar
                            buttonE = document.createElement("button");
                            buttonE.className = "btn btn-danger";
                            buttonE.setAttribute("value", JSON.stringify(data));
                            buttonE.appendChild(document.createTextNode("Eliminar"));
                            buttonE.addEventListener("click", (ev) => {
                                var caller1 = ev.target;
                                var data1 = JSON.parse(caller1.value);
                               // console.log(data1);
                                removeMember(data1._id);
                                var padre = caller1.parentElement;
                                var trP = padre.parentElement;
                                trP.remove();

                            });
                            tdB = document.createElement("td");
                            tdB.appendChild(buttonE);
                            trS.appendChild(tdB);

                            //tr
                            bodyS.appendChild(trS);



                        }

                    });

                    button.appendChild(document.createTextNode("Agregar"));
                    tdButton.appendChild(button);
                    tdNombre.appendChild(document.createTextNode(item.nombre));
                    tdCorreo.appendChild(document.createTextNode(item.correo));
                    trE.appendChild(tdNombre);
                    trE.appendChild(tdCorreo);
                    trE.appendChild(tdButton);

                    //console.log(document.getElementById("bodyS"));


                    tbodyME.appendChild(trE);

                });
            }
        });





    }
    ajax2 = () => {





      //  console.log("--------Registro--------");

        var formData = new FormData($("#Principal")[0]);

        this.miembros.splice(0, 1);
        var miembros=JSON.stringify(this.miembros);
        formData.append("miembros", miembros);
        formData.append("organizacion",localStorage.getItem("IdEmpresa"));
        formData.append("Operation", 2);

        $.ajax({
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/equipo',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
             //   console.log(respuesta);

                if (respuesta != 3) {

                    window.location.href = "/principal";


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

                <Topbar history={this.props.history}/>

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div className="card shadow-lg border-0 rounded-lg mt-5" id="cards">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Equipo</h3></div>
                            <div className="card-body">
                                <form id="Principal">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputNombre">Nombre</label>
                                                <input className="form-control py-4" id="inputNombre" type="text" placeholder="Nombre del equipo" name="nombre" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="inputDescripcion">Descripción</label>
                                                <textarea className="form-control py-4" id="inputDescripcion" placeholder="Describa el equipo" name="descripcion"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="estado" value="A" />
                                </form>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" >Miembros</label>
                                            <div className="table-wrapper-scroll-y my-custom-scrollbar">

                                                <table className="table table-bordered table-striped mb-0">
                                                    <thead>
                                                        <tr>

                                                            <th scope="col">Nombre</th>
                                                            <th scope="col">Correo</th>
                                                            <th scope="col">Seleccionar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="bodyT">

                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" >Miembros</label>
                                        <div className="table-wrapper-scroll-y my-custom-scrollbar">

                                            <table className="table table-bordered table-striped mb-0">
                                                <tbody id="bodyS">

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={() => { this.ajax2() }}>Crear equipo</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
