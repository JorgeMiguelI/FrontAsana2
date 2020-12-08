import React, { Component } from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom';
import $ from 'jquery';




import Barra from './bar';
import Topbar from './topbar';
window.$ = $;





export default class EditarEquipo extends Component {

    miembros
    idEquipo;

    componentDidMount() {
        let undefined = void (0);
        if (this.props.match.params.id != undefined) {
            this.idEquipo = this.props.match.params.id;
            this.miembros = new Array();
            this.miembros.push("3252343");
            this.TraerInfoEquipo();
            
        }
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
            document.getElementById("inputNombre").setAttribute("value", Equipo.nombre);
            if (document.getElementById("inputDescripcion").hasChildNodes()) {
                for (let node of document.getElementById("inputDescripcion").childNodes) {
                    node.remove();
                }
            }
            if (Equipo.descripcion != void (0)) {

                document.getElementById("inputDescripcion").appendChild(document.createTextNode(Equipo.descripcion));
            }

            this.miembros = JSON.parse(Equipo.miembros);


         
           












           // console.log(this.miembros);
        }
        this.ajax1();
    }



    addMember = (id, rol1) => {
        let obj = {
            Id: id,
            rol: rol1
        }

        let bandera = true;
        for (let item of this.miembros) {
            // console.log(item);
            if (item.Id == obj.Id) {

                bandera = false;
                break;
            }


        }


        // console.log(bandera);
        if (bandera) {
            this.miembros.push(obj);
            //console.log(this);
            return false;
        } else {
            alert("Miembro ya en la lista");
            return true;
        }






        return true;
    }

    removeMember = (id) => {

        console.clear();
        //console.log(this);

        //console.log(this.length);
        let i;
        for (i = 0; i < this.miembros.length; i++) {
            //console.log(id + "==" + this[i].Id);
            if (id == this.miembros[i].Id) {
                this.miembros.splice(i, 1);
            }
        }


    }


    buscarMiembro = (id) => {
       // console.log(this.miembros);
       for(let item of this.miembros){
           if(item.Id==id){
               return true;
           }
       }
       return false;
    }

    iniciarComponente = function (respuesta) {






    }

    ajax1 = () => {

        //traerá los miembros de la empresa
        console.clear();

        let formData = new FormData();
        formData.append("idE", localStorage.getItem("IdEmpresa"));
        formData.append("Operation", "1");
        let miembros = this.miembros;
        $.ajax({
            context: this,
            Origin: "http://localhost:3000",
            url: 'http://localhost:4000/equipo',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {



                











                //console.log("Inciar Componentes");

                respuesta.map((item) => {
                    //console.log("map");
                    //seleccionados
                    let bodyS = document.getElementById("bodyS");
                    let spanT;
                    let trS;
                    let tdN;
                    let tdB;
                    let buttonE;


                    //Todos
                    let tbodyME = document.getElementById("bodyT");
                    let trE = document.createElement("tr");
                    let tdNombre = document.createElement("td");
                    let tdCorreo = document.createElement("td");
                    let tdButton = document.createElement("td");
                    let button = document.createElement("button");

                    button.setAttribute("value", JSON.stringify(item));
                    button.className = "btn-primary btn-sm";
                    button.addEventListener("click", (e) => {
                        //console.log(this);
                        let caller = e.target;
                        let data = JSON.parse(caller.value);
                        if (!this.addMember(data._id, data.rol)) {
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
                                let caller1 = ev.target;
                                let data1 = JSON.parse(caller1.value);
                                //console.log(data1);
                                this.removeMember(data1._id);
                                let padre = caller1.parentElement;
                                let trP = padre.parentElement;
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




                    tbodyME.appendChild(trE);
                   // console.log(this.buscarMiembro(item._id));
                    if(this.buscarMiembro(item._id)){
                        //console.log(item._id);
                        trS = document.createElement("tr");

                        //Nombre
                        tdN = document.createElement("td");
                        spanT = document.createElement("span");
                        spanT.className = "form-control";
                        spanT = document.createTextNode(item.nombre);
                        tdN.appendChild(spanT);
                        trS.appendChild(tdN);

                        //boton Eliminar
                        buttonE = document.createElement("button");
                        buttonE.className = "btn btn-danger";
                        buttonE.setAttribute("value", JSON.stringify(item));
                        buttonE.appendChild(document.createTextNode("Eliminar"));
                        buttonE.addEventListener("click", (ev) => {
                            let caller1 = ev.target;
                            let data1 = JSON.parse(caller1.value);
                            //console.log(data1);
                            this.removeMember(data1._id);
                            let padre = caller1.parentElement;
                            let trP = padre.parentElement;
                            trP.remove();

                        });
                        tdB = document.createElement("td");
                        tdB.appendChild(buttonE);
                        trS.appendChild(tdB);

                        //tr
                        bodyS.appendChild(trS);

                    }

                    



                });
            }
        });





    }

    Guardar = async () => {
        let info= {
            id: this.idEquipo,
            miembros: [JSON.stringify(this.miembros)] ,
            nombre: document.getElementById("inputNombre").value,
            estado: "A",
            descripcion:document.getElementById("inputDescripcion").value
            
        };
        const res = await axios.put("http://localhost:4000/UpdateTeam", {
                data: info
            });
        const result= await res.data;
        if(result.msg=="error"){
            //No se pudo actualizar
        }else{
            this.props.history.push("/DetallesEquipo/"+this.idEquipo);
        }

    }







    render() {
        return (
            <div className="sb-nav-fixed">

                <Topbar history={this.props.history}/>

                <div id="layoutSidenav">


                    <Barra history={this.props.history} />



                    <div id="layoutSidenav_content">
                        <div className="card shadow-lg border-0 rounded-lg mt-5" id="cards">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Editar Equipo</h3></div>
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
                                <div className="form-group mt-4 mb-0"><button id="crearP" className="btn btn-block" onClick={this.Guardar}>Guardar</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
